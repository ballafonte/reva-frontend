/* eslint-env node */
var noClientImportInServer = require('./rules/no-client-import-in-server.js');

module.exports = {
  rules: {
    'no-client-import-in-server': noClientImportInServer,
  },
};
