require('amd-loader');

// for tests that need RequireJS
define(function(require, exports, module) {
  'use strict';
  const phpjs = require('../thirdparty/php');

  describe('thirdparty/php.js', () => {
    it('should expose a formatter method', () => {
      expect(phpjs.formatter).toBeDefined();
    });
  });
});

