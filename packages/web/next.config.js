const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@reva-frontend/common'],
  webpack: (config, { dev }) => {
    if (dev) {
      // In development, alias to source files for hot reload
      const commonSrcPath = path.resolve(__dirname, '../common/src');
      config.resolve.alias = {
        ...config.resolve.alias,
        '@reva-frontend/common': commonSrcPath,
        '@reva-frontend/common/client': path.resolve(commonSrcPath, 'client'),
        '@reva-frontend/common/theme': path.resolve(commonSrcPath, 'theme'),
        '@reva-frontend/common/utils': path.resolve(commonSrcPath, 'utils'),
      };
    }
    return config;
  },
};

module.exports = nextConfig;
