const path = require('path');
const webpack = require('webpack');

/** @type {import('storybook').StorybookConfig} */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  webpackFinal: async (config) => {
    // Add support for TypeScript path aliases
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
        '@common': path.resolve(__dirname, '../../common/dist/src'),
      };
    }

    // Replace Next.js modules with mocks for Storybook
    // This prevents "app router must be mounted" errors
    const mockNavigationPath = path.resolve(
      __dirname,
      '../src/components/common/__mocks__/next-navigation.ts'
    );
    const mockLinkPath = path.resolve(
      __dirname,
      '../src/components/common/__mocks__/next-link.tsx'
    );

    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^next\/navigation$/,
        mockNavigationPath
      ),
      new webpack.NormalModuleReplacementPlugin(/^next\/link$/, mockLinkPath)
    );

    // Add support for font files in CSS
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });

    return config;
  },
};

module.exports = config;
