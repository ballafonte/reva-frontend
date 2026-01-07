/**
 * ESLint rule to prevent importing from '@reva-frontend/common/client'
 * in files that don't have 'use client' directive (Server Components)
 */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Prevent importing client-only exports in Server Components',
      category: 'Possible Errors',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      noClientImportInServer:
        "Cannot import from '@reva-frontend/common/client' in a Server Component. Add 'use client' directive at the top of the file or use '@reva-frontend/common' instead.",
    },
  },

  create(context) {
    let hasUseClientDirective = false;

    return {
      Program(node) {
        // Check if 'use client' directive exists
        const firstStatement = node.body[0];

        if (
          firstStatement &&
          firstStatement.type === 'ExpressionStatement' &&
          firstStatement.expression &&
          firstStatement.expression.type === 'Literal' &&
          firstStatement.expression.value === 'use client'
        ) {
          hasUseClientDirective = true;
        }
      },

      ImportDeclaration(node) {
        // Check if this is importing from the client-only package
        if (
          node.source &&
          node.source.value === '@reva-frontend/common/client'
        ) {
          // If there's no 'use client' directive, report an error
          if (!hasUseClientDirective) {
            context.report({
              node: node.source,
              messageId: 'noClientImportInServer',
            });
          }
        }
      },
    };
  },
};
