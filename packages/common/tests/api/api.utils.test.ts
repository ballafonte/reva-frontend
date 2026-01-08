import {
  callApi,
  executeApiRequest,
  generateApiHeaders,
  getApiBaseUrl,
  parseApiResponse,
  resetApiBaseUrl,
  setApiBaseUrl,
} from '../../src/api/api.utils';
import * as authApi from '../../src/api/auth.api';

// Mock utils with authStore - mock the index file that api.utils.ts imports from
jest.mock('../../src/utils/index', () => {
  const actual = jest.requireActual('../../src/utils/index');
  return {
    ...actual,
    authStore: {
      getToken: jest.fn(),
      setToken: jest.fn(),
      clear: jest.fn(),
    },
  };
});

// Mock auth.api
jest.mock('../../src/api/auth.api', () => ({
  refreshToken: jest.fn(),
}));

describe('getApiBaseUrl', () => {
  beforeEach(() => {
    resetApiBaseUrl();
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
    delete process.env.REACT_APP_API_BASE_URL;
    delete process.env.API_BASE_URL;
  });

  it('should return default "/" when no env vars are set', () => {
    expect(getApiBaseUrl()).toBe('/');
  });

  it('should return custom URL when set', () => {
    setApiBaseUrl('https://api.example.com');
    expect(getApiBaseUrl()).toBe('https://api.example.com/');
  });

  it('should append trailing slash to custom URL', () => {
    setApiBaseUrl('https://api.example.com');
    expect(getApiBaseUrl()).toBe('https://api.example.com/');
  });

  it('should not duplicate trailing slash', () => {
    setApiBaseUrl('https://api.example.com/');
    expect(getApiBaseUrl()).toBe('https://api.example.com/');
  });

  it('should use NEXT_PUBLIC_API_BASE_URL from env', () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'https://nextjs-api.com';
    expect(getApiBaseUrl()).toBe('https://nextjs-api.com/');
  });

  it('should use REACT_APP_API_BASE_URL from env', () => {
    process.env.REACT_APP_API_BASE_URL = 'https://react-api.com';
    expect(getApiBaseUrl()).toBe('https://react-api.com/');
  });

  it('should prioritize custom URL over env vars', () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'https://env-api.com';
    setApiBaseUrl('https://custom-api.com');
    expect(getApiBaseUrl()).toBe('https://custom-api.com/');
  });
});

describe('setApiBaseUrl and resetApiBaseUrl', () => {
  beforeEach(() => {
    resetApiBaseUrl();
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
    delete process.env.REACT_APP_API_BASE_URL;
    delete process.env.API_BASE_URL;
  });

  it('should set custom API base URL', () => {
    setApiBaseUrl('https://test.com');
    expect(getApiBaseUrl()).toBe('https://test.com/');
  });

  it('should reset to default after resetApiBaseUrl', () => {
    setApiBaseUrl('https://test.com');
    resetApiBaseUrl();
    expect(getApiBaseUrl()).toBe('/');
  });
});

describe('generateApiHeaders', () => {
  it('should generate headers with defaults', () => {
    const headers = generateApiHeaders();
    expect(headers.get('Accept')).toBe('application/json');
    expect(headers.get('Content-Type')).toBe('application/json');
  });

  it('should merge with custom headers', () => {
    const customHeaders = { 'X-Custom': 'value' };
    const headers = generateApiHeaders(customHeaders);
    expect(headers.get('X-Custom')).toBe('value');
    // When custom headers are provided, they replace defaults, but mandatory headers remain
    expect(headers.get('Access-Control-Allow-Origin')).toBe('*');
  });

  it('should return headers with only mandatory when false is passed', () => {
    // When false is passed, the function still creates Headers with mandatory headers
    const headers = generateApiHeaders(false);
    expect(headers).toBeDefined();
    expect(headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(headers.get('Accept')).toBeNull();
  });

  it('should include mandatory headers', () => {
    const headers = generateApiHeaders();
    expect(headers.get('Access-Control-Allow-Origin')).toBe('*');
  });
});

describe('parseApiResponse', () => {
  it('should parse JSON response', async () => {
    const response = {
      text: jest.fn().mockResolvedValue('{"key": "value"}'),
    } as unknown as Response;

    const result = await parseApiResponse(response);
    expect(result).toEqual({ key: 'value' });
  });

  it('should return text when JSON parsing fails', async () => {
    const response = {
      text: jest.fn().mockResolvedValue('plain text'),
    } as unknown as Response;

    const result = await parseApiResponse(response);
    expect(result).toBe('plain text');
  });
});

// Get the mocked authStore
import { authStore } from '../../src/utils';

describe('executeApiRequest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (authStore.getToken as jest.Mock).mockReturnValue(null);
  });

  it('should execute GET request', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ data: 'test' }),
    } as unknown as Response;

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    await executeApiRequest('/test', { method: 'GET' });

    // The function may add ? to the URL even without query params
    const callArgs = (global.fetch as jest.Mock).mock.calls[0];
    expect(callArgs[0]).toMatch(/^\/test/);
    expect(callArgs[1]).toMatchObject({
      method: 'GET',
      credentials: 'include',
    });
  });

  it('should include query parameters', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
    } as Response;

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    await executeApiRequest('/test', {
      method: 'GET',
      query: { key: 'value', other: 'param' },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      '/test?key=value&other=param',
      expect.any(Object)
    );
  });

  it('should stringify JSON body', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
    } as Response;

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    await executeApiRequest('/test', {
      method: 'POST',
      body: { key: 'value' },
    });

    const callArgs = (global.fetch as jest.Mock).mock.calls[0];
    expect(callArgs[1].body).toBe('{"key":"value"}');
    expect(callArgs[1].headers.get('Content-Type')).toBe('application/json');
  });

  it('should not stringify FormData body', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
    } as Response;

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const formData = new FormData();
    formData.append('key', 'value');

    await executeApiRequest('/test', {
      method: 'POST',
      body: formData,
    });

    const callArgs = (global.fetch as jest.Mock).mock.calls[0];
    expect(callArgs[1].body).toBe(formData);
  });

  it('should include Authorization header when token exists', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
    } as Response;

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
    (authStore.getToken as jest.Mock).mockReturnValue('test-token');

    await executeApiRequest('/test', { method: 'GET' }, true);

    const callArgs = (global.fetch as jest.Mock).mock.calls[0];
    expect(callArgs[1].headers.get('Authorization')).toBe('Bearer test-token');
  });

  it('should not include Authorization header when includeAuth is false', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
    } as Response;

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
    (authStore.getToken as jest.Mock).mockReturnValue('test-token');

    await executeApiRequest('/test', { method: 'GET' }, false);

    const callArgs = (global.fetch as jest.Mock).mock.calls[0];
    expect(callArgs[1].headers.get('Authorization')).toBeNull();
  });
});

describe('callApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (authStore.getToken as jest.Mock).mockReturnValue(null);
  });

  it('should handle successful response', async () => {
    const mockData = { data: 'test' };
    const mockResponse = {
      ok: true,
      status: 200,
      text: jest.fn().mockResolvedValue(JSON.stringify(mockData)),
    } as unknown as Response;

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await callApi('/test', { method: 'GET' });

    expect(result).toEqual(mockData);
  });

  it('should handle 401 and refresh token', async () => {
    const mock401Response = {
      ok: false,
      status: 401,
    } as Response;

    const mockSuccessResponse = {
      ok: true,
      status: 200,
      text: jest.fn().mockResolvedValue('{"data": "success"}'),
    } as unknown as Response;

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce(mock401Response)
      .mockResolvedValueOnce(mockSuccessResponse);

    (authApi.refreshToken as jest.Mock).mockResolvedValue({
      accessToken: 'new-token',
    });
    (authStore.getToken as jest.Mock).mockReturnValue('new-token');

    const result = await callApi('/test', { method: 'GET' });

    expect(authApi.refreshToken).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(result).toEqual({ data: 'success' });
  });

  it('should not refresh token for refresh endpoint', async () => {
    const mock401Response = {
      ok: false,
      status: 401,
    } as Response;

    (global.fetch as jest.Mock).mockResolvedValue(mock401Response);

    await expect(
      callApi('/users/refresh-token', { method: 'POST' })
    ).rejects.toBeDefined();

    expect(authStore.clear).toHaveBeenCalled();
  });

  it('should handle error responses', async () => {
    const mockErrorResponse = {
      ok: false,
      status: 400,
      text: jest.fn().mockResolvedValue('{"error": "Bad Request"}'),
    } as unknown as Response;

    (global.fetch as jest.Mock).mockResolvedValue(mockErrorResponse);

    await expect(callApi('/test', { method: 'GET' })).rejects.toBeDefined();
  });

  it('should call success callback when provided', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      text: jest.fn().mockResolvedValue('{"data": "test"}'),
    } as unknown as Response;

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const successCb = jest.fn().mockResolvedValue({ custom: 'data' });

    const result = await callApi('/test', { method: 'GET' }, successCb);

    expect(successCb).toHaveBeenCalled();
    expect(result).toEqual({ custom: 'data' });
  });

  it('should call failure callback when provided', async () => {
    const mockErrorResponse = {
      ok: false,
      status: 500,
    } as Response;

    (global.fetch as jest.Mock).mockResolvedValue(mockErrorResponse);

    const failureCb = jest.fn().mockResolvedValue(new Error('Custom error'));

    await expect(
      callApi('/test', { method: 'GET' }, undefined, failureCb)
    ).rejects.toThrow('Custom error');

    expect(failureCb).toHaveBeenCalled();
  });
});
