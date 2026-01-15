# Security Posture and Considerations

## Overview

This frontend monorepo application is designed to handle **HIPAA-sensitive data** and must adhere to strict security practices for healthcare data protection. All security decisions prioritize compliance with HIPAA, SOC 2, and HITRUST standards.

## Monorepo Structure

This monorepo consists of:

- **`packages/common`** - Shared TypeScript types, API endpoints, react-query queries/mutations, and business logic
- **`packages/web`** - Next.js React application

Security practices apply across both packages, with authentication and API utilities centralized in the `common` package.

## Authentication and Authorization

### User Authentication Flow

1. **Sign Up**: Users register with email and password
   - Password is sent to backend API (never stored on frontend)
   - Backend handles password hashing (BCrypt)
   - New users are created with `PENDING` status
   - User must activate account before signing in

2. **Sign In**: Validates credentials via API and receives tokens
   - Only `ACTIVE` users can sign in (backend enforces this)
   - Returns access token in JSON response body
   - Access token is stored in **memory only** (see [Token Storage](#jwt-token-security))
   - Refresh token is set by backend in HttpOnly cookie (handled automatically by browser)
   - Sets `sessionStorage` flag to track authentication state

3. **Token Refresh**: Automatically exchanges refresh token for new access token
   - Triggered automatically on 401 responses via API interceptor
   - Refresh token is sent automatically by browser via HttpOnly cookie
   - Uses single-flight pattern to prevent concurrent refresh requests
   - New access token is stored in memory
   - On refresh failure, clears auth state and sets inactivity sign-out flag

4. **Sign Out**: Clears local state and invalidates refresh token
   - Calls backend API to invalidate refresh token and clear cookie
   - Clears access token from memory
   - Removes `sessionStorage` flags
   - Always clears local state even if API call fails

### User Status Management

The frontend does not manage user status directly. User status is managed by the backend, and the frontend receives appropriate HTTP status codes:

- `403 Forbidden` for non-active accounts
- `401 Unauthorized` for invalid credentials or expired tokens
- `404 Not Found` for non-existent users

## JWT Token Security

### Access Tokens

**Lifetime**: 10 minutes (configured on backend)

**Storage**: **Memory only** - NEVER stored in localStorage, sessionStorage, or cookies

- Stored in JavaScript module-level variable (`authStore` in `packages/common/src/utils/auth/authStore.ts`)
- Sent manually in `Authorization: Bearer <token>` header for each API request
- Short lifetime limits exposure if leaked
- Automatically cleared when:
  - User signs out
  - Refresh token expires
  - Application unmounts (memory cleared)

**Claims** (decoded from token):

- `sub`: User ID (subject)
- `email`: User email address
- `isSuperAdmin`: Boolean indicating platform admin privileges
- `jti`: Unique token identifier (UUID)
- `iat`: Issued at timestamp
- `exp`: Expiration timestamp

**Security Rationale**: Short-lived tokens minimize the window of opportunity if compromised. Since JWTs are stateless and hard to revoke, short expiry is critical for healthcare data applications. Storing in memory prevents XSS attacks from stealing tokens.

### Refresh Tokens

**Lifetime**: 12 hours (configured on backend)

**Storage**: **HttpOnly Cookie** - Automatically managed by browser

- Set by backend with: `HttpOnly; Secure; SameSite=Strict; Path=/`
- Automatically sent by browser to same-origin requests
- **Cannot be read by JavaScript** (XSS protection)
- Never accessed or manipulated by frontend code
- Cleared when:
  - User signs out (backend sets `Max-Age=0`)
  - Browser session ends (if session cookie)
  - Token expires (backend invalidates)

**Security Rationale**: HttpOnly cookies prevent JavaScript access, protecting against XSS attacks. `SameSite=Strict` prevents CSRF attacks. The frontend never directly handles refresh tokens - they're managed entirely by the browser and backend.

### Token Refresh Flow

The frontend implements automatic token refresh via the API interceptor (`packages/common/src/api/api.utils.ts`):

1. API request receives `401 Unauthorized`
2. Check if request is already a refresh/sign-in (prevent infinite loop)
3. Use single-flight pattern: if refresh already in progress, wait for it
4. Call `/users/refresh-token` endpoint (cookie sent automatically)
5. Store new access token in memory
6. Retry original request with new token
7. If refresh fails, clear auth state and set inactivity flag

**Session Tracking**: The frontend uses `sessionStorage.getItem('wasAuthenticated')` to determine if a refresh attempt should be made on page load. This flag is:

- Set when user successfully signs in
- Cleared when user signs out
- Automatically cleared when browser closes (sessionStorage behavior)

## API Communication Security

### Request Headers

All API requests include:

- `Authorization: Bearer <access-token>` - When authenticated
- `Content-Type: application/json` - For JSON payloads
- Standard headers from `API_MANDATORY_HEADERS` and `API_DEFAULT_HEADERS`

### Credentials Handling

All API requests use `credentials: 'include'` to ensure cookies (including refresh token) are sent:

```typescript
fetch(endpoint, {
  credentials: 'include', // Always include credentials for cookie handling
  // ...
});
```

### API Base URL Configuration

The API base URL is configured via environment variables (in order of precedence):

1. `NEXT_PUBLIC_API_BASE_URL` (Next.js public env var)
2. `REACT_APP_API_BASE_URL` (fallback for React apps)
3. `API_BASE_URL` (generic fallback)
4. Defaults to `/` (relative path)

**Security Note**: In production, always use HTTPS for API base URLs.

### Error Handling

The frontend properly handles authentication errors:

- **401 Unauthorized**: Triggers automatic token refresh or signs out user
- **403 Forbidden**: User doesn't have permission (account not active, etc.)
- **409 Conflict**: Resource conflict (e.g., email already exists)
- **404 Not Found**: Resource doesn't exist

Errors are handled gracefully without exposing sensitive backend details to the client.

## Cookie Security

The frontend does not directly set cookies. All cookies are managed by the backend. However, the frontend must ensure:

- **Never** store access tokens in cookies (stored in memory only)
- **Never** try to read refresh tokens from cookies (they're HttpOnly)
- All API requests include `credentials: 'include'` to send cookies
- Cookie security flags are enforced by backend:
  - `HttpOnly`: Prevents JavaScript access (XSS protection)
  - `Secure`: Only sent over HTTPS (required in production)
  - `SameSite=Strict`: Prevents CSRF attacks, only sent in same-site requests
  - `Path=/`: Available across the entire application

## CORS Configuration

Cross-Origin Resource Sharing (CORS) is configured at the API Gateway/backend level.

**Important**: The frontend must ensure:

- All API requests go through the configured API base URL
- No direct cross-origin requests bypass CORS (backend enforces this)
- In production, frontend should be served from an allowed origin

**Development Origins** (configured on backend):

- `http://localhost:3000`
- `http://localhost:5173`
- `http://localhost:8080`
- `http://127.0.0.1:3000`

**Production Origin** (configured on backend):

- `https://revassurance.com`

## XSS (Cross-Site Scripting) Protection

### Token Storage

- Access tokens stored in memory only (never in DOM storage)
- Refresh tokens in HttpOnly cookies (cannot be accessed by JavaScript)
- Prevents XSS attacks from stealing authentication credentials

### Content Security

- Never render user-provided content without sanitization
- Use React's built-in XSS protection (automatic escaping)
- For rich text content, use a sanitization library
- Validate and sanitize all user inputs before API submission

### Dependencies

- Keep all dependencies up to date (run `yarn audit` regularly)
- Review security advisories for dependencies
- Use `yarn audit fix` to apply security patches

## CSRF (Cross-Site Request Forgery) Protection

CSRF protection is primarily handled by:

1. **SameSite Cookie Attribute**: Refresh tokens use `SameSite=Strict`, preventing cookies from being sent in cross-site requests
2. **CORS Configuration**: Backend enforces CORS to prevent unauthorized origins
3. **Authorization Headers**: Access tokens are sent in headers, not cookies (reduces CSRF surface area)

The frontend should:

- Never disable CORS
- Always use `credentials: 'include'` for authenticated requests
- Trust backend's SameSite cookie enforcement

## Environment Variables

### Public Environment Variables (NEXT*PUBLIC*\*)

These are exposed to the browser and should **never** contain secrets:

- `NEXT_PUBLIC_API_BASE_URL` - API base URL (public, can be HTTPS URL)
- `NEXT_PUBLIC_SITE_NAME` - Site display name
- `NEXT_PUBLIC_ENABLE_CONSOLE` - Debug flag (development only)

### Security Requirements

- **Never** commit `.env` files to version control (already in `.gitignore`)
- **Never** store secrets in `NEXT_PUBLIC_*` variables (they're exposed to client)
- Use server-side environment variables for secrets (if needed in Next.js API routes)
- In production, use secure secret management (e.g., environment variables in hosting platform)

### Configuration

Environment variables are loaded by Next.js automatically. For local development, use:

- `.env.local` - Local overrides (gitignored)
- `.env.development.local` - Development-specific (gitignored)
- `.env.production.local` - Production-specific (gitignored)

## Session Management

### Session State Tracking

The frontend uses `sessionStorage` for minimal session state:

- `wasAuthenticated` - Flag indicating user was authenticated (cleared on logout/close)
- `inactivitySignOut` - Flag indicating inactivity sign-out (shows modal on sign-in page)

**Important**: `sessionStorage` is **not** used for:

- Storing tokens (tokens in memory only)
- Storing sensitive data
- Persistent authentication (rely on HttpOnly cookie)

### Session Lifecycle

1. **Page Load**: Check `wasAuthenticated` flag
   - If `true`, attempt token refresh
   - If refresh succeeds, user is authenticated
   - If refresh fails, clear state and redirect to sign-in

2. **Active Session**:
   - Access token in memory
   - Refresh token in HttpOnly cookie (managed by browser)
   - Automatic refresh on 401 responses

3. **Sign Out**:
   - Call backend sign-out endpoint
   - Clear access token from memory
   - Clear `sessionStorage` flags
   - Backend clears refresh token cookie

4. **Inactivity**:
   - Backend invalidates refresh token after inactivity timeout
   - Next API request gets 401, refresh fails
   - Frontend sets `inactivitySignOut` flag
   - User redirected to sign-in with modal notification

## Platform Admin Privileges

Platform admin status is included in the JWT access token claims as `isSuperAdmin`. The frontend:

- Reads this from the decoded token (if needed)
- Relies on backend to enforce authorization
- Should never trust frontend-only checks for sensitive operations
- Always verify permissions via API responses (backend is source of truth)

**Security Note**: Frontend role checks are for UX only (hiding UI). Backend always enforces authorization.

## Security Best Practices for Developers

### DO:

✅ Store access tokens in memory only (`authStore`)  
✅ Use HttpOnly cookies for refresh tokens (managed by backend)  
✅ Include `credentials: 'include'` in all API requests  
✅ Handle 401 responses with automatic token refresh  
✅ Clear auth state on sign-out (even if API call fails)  
✅ Use `sessionStorage` only for non-sensitive flags  
✅ Sanitize user inputs before rendering  
✅ Keep dependencies up to date (`yarn audit`)  
✅ Use HTTPS in production  
✅ Trust backend for all authorization decisions  
✅ Use environment variables for configuration (never secrets in `NEXT_PUBLIC_*`)

### DON'T:

❌ Store access tokens in localStorage or sessionStorage  
❌ Store refresh tokens in JavaScript-accessible storage  
❌ Try to read or manipulate HttpOnly cookies  
❌ Expose sensitive data in `NEXT_PUBLIC_*` environment variables  
❌ Commit `.env` files to version control  
❌ Trust frontend-only authorization checks  
❌ Render unsanitized user content  
❌ Make API requests without `credentials: 'include'`  
❌ Disable CORS or security headers  
❌ Store passwords or other secrets in client-side code

## HIPAA Compliance Considerations

This frontend application handles Protected Health Information (PHI) and must:

1. **Access Control**: Only authenticated and authorized users can access PHI
   - Implemented via JWT token validation (backend)
   - Frontend enforces UX-level access (backend enforces actual access)
   - Automatic token refresh maintains continuous authentication

2. **Audit Logging**: All access to PHI should be logged
   - Frontend should log client-side events (for debugging/monitoring)
   - Backend handles comprehensive audit logging
   - TODO: Implement comprehensive frontend audit logging

3. **Encryption**: PHI must be encrypted in transit and at rest
   - In transit: HTTPS (TLS) required for all API communication
   - Frontend must use HTTPS API endpoints in production
   - At rest: Handled by backend (database encryption)

4. **Token Management**: Short-lived tokens limit exposure windows
   - 10-minute access tokens meet HIPAA audit expectations
   - Memory-only storage prevents XSS token theft
   - Automatic refresh maintains user experience while preserving security

5. **Session Management**: Sessions must be properly invalidated and monitored
   - Sign out clears all local state
   - Backend invalidates refresh tokens
   - Inactivity timeouts enforced by backend
   - Frontend handles inactivity gracefully (modal, redirect)

6. **Error Handling**: Do not expose sensitive information in errors
   - Frontend shows user-friendly messages
   - Detailed errors logged server-side only
   - Never expose PHI or system details in client-side errors

## Monorepo Security Considerations

### Shared Code Security

- `packages/common` contains authentication logic used by all applications
- Changes to auth utilities affect entire monorepo
- Thoroughly test auth changes across all packages
- Keep shared security utilities in sync

### Dependency Management

- Use Yarn workspaces for consistent dependency versions
- Run `yarn audit` at monorepo root to check all packages
- Update dependencies in root `package.json` or package-specific `package.json`
- Test security updates across all packages

### Build Security

- TypeScript provides compile-time safety
- Run `yarn type-check` to verify types across monorepo
- Lint with `yarn lint` to catch security anti-patterns
- Build process should not expose source maps in production

## Next.js Specific Security

### Production Build

- Use `yarn build` for production builds
- Ensure source maps are not exposed in production
- Verify `reactStrictMode: true` in `next.config.js` (enabled)
- Use Next.js security headers (configure in `next.config.js` if needed)

### Server-Side Rendering (SSR)

- If using SSR, never expose secrets in server components
- Use server-only environment variables (without `NEXT_PUBLIC_` prefix)
- Validate all inputs server-side
- Sanitize data before sending to client

### Client Components

- Mark components with sensitive logic as `'use client'` appropriately
- Avoid exposing business logic unnecessarily to client bundle
- Keep authentication logic in shared package for consistency

## Security Audit Checklist

When making changes to authentication or authorization:

- [ ] Are access tokens stored in memory only (not localStorage/sessionStorage)?
- [ ] Are refresh tokens handled via HttpOnly cookies (not JavaScript)?
- [ ] Are all API requests using `credentials: 'include'`?
- [ ] Is automatic token refresh implemented for 401 responses?
- [ ] Is auth state cleared on sign-out (even if API fails)?
- [ ] Are environment variables using `NEXT_PUBLIC_*` for public config only?
- [ ] Are `.env` files excluded from version control?
- [ ] Is HTTPS enforced for API communication in production?
- [ ] Are user inputs sanitized before rendering?
- [ ] Are dependencies up to date (run `yarn audit`)?
- [ ] Are sensitive operations authorized by backend (not frontend-only)?
- [ ] Is error handling preventing exposure of sensitive information?

## Future Security Enhancements

Potential security improvements to consider:

- Rate limiting for authentication endpoints (frontend can help with UX)
- MFA (Multi-Factor Authentication) implementation
- Comprehensive frontend audit logging
- Content Security Policy (CSP) headers
- Subresource Integrity (SRI) for external scripts
- Automated dependency security scanning in CI/CD
- Security headers configuration in Next.js config
- Token expiration warning/notification UX
- Session management UI (view/revoke active sessions)
