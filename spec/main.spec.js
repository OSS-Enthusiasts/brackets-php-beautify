/**
 *  File: main.spec.js
 *  Author: Chif <nadchif@gmail.com>, Shankhanil <shankha.rik@gmail.com>
 */

require('amd-loader');
// for tests that need RequireJS
define(function(require, exports, module) {
  'use strict';
  const phpjs = require('../thirdparty/php');
  const format = require('../thirdparty/php').format;

  describe('thirdparty/php.js =>', () => {
    it('should expose a formatter method', () => {
      expect(phpjs.formatter).toBeDefined();
    });

    const customConfiguration = {
      'Style': 'GNU',
      'Indent': 'Space',
      'Remove_all_comments': false,
      'Remove_empty_lines': true,
      'Make_long_opening_tag': true,
      'Space_inside_brackets': true,
      'Space_inside_blocks': true,
      'Space_around_operators': true,
    };

    describe('Testing format functions using default configuration => ', () =>{
        describe('Testing formatting for coding style =>', () =>{
         // WRITE TESTS for formatting code a/c to GNU indentation style
      });
      describe('Testing formatting for comments =>', () =>{
        it('Should keep the single line-comment untouched', ()=>{
          const code = '// a sample comment';
          expect(format(code, customConfiguration)).toBe(code);
        });
        it('Should keep the # comment untouched', ()=>{
          const code = '# a sample comment';
          expect(format(code, customConfiguration)).toBe(code);
        });
        it('Should keep the multi-line comment untouched', ()=>{
          const code = '/* a sample comment\n a multi line comment*/';
          expect(format(code, customConfiguration)).toBe(code);
        });
      });
      describe('Testing formatting for empty-lines =>', ()=>{
        it('Should remove empty lines', ()=>{
          const initCode = 'line_1\n\nline_2';
          const finCode = 'line_1\nline_2';
          expect(format(initCode, customConfiguration)).toBe(finCode);
        });
      });
      describe('Testing formatting for short opening tags =>', ()=>{
        it('Should replace short opening tags with long opening tags', ()=>{
          const initCode = '<?\nSOME_CODE\n?>';
          const finCode = '<?php\nSOME_CODE\n?>';
          expect(format(initCode, customConfiguration)).toBe(finCode);
        });
      });
      describe('Testing formatting for putting space inside brackets =>', ()=>{
        it('Should put space inside () brackets', ()=>{
          const initCode = 'some_code(some_more_code)';
          const finCode = 'some_code( some_more_code )';
          expect(format(initCode, customConfiguration)).toBe(finCode);
        });
        it('Should put space inside {} brackets', ()=>{
          const initCode = 'some_code{some_more_code}';
          const finCode = 'some_code{ some_more_code }';
          expect(format(initCode, customConfiguration)).toBe(finCode);
        });
        it('Should put space inside [] brackets', ()=>{
          const initCode = 'some_code[some_more_code]';
          const finCode = 'some_code[ some_more_code ]';
          expect(format(initCode, customConfiguration)).toBe(finCode);
        });
        it('Should handle nested brackets ', ()=>{
          const initCode = 'some_code[{some_more_code}(some_more_code)]';
          const finCode = 'some_code[ { some_more_code }( some_more_code ) ]';
          expect(format(initCode, customConfiguration)).toBe(finCode);
        });
      });
      describe('Testing formatting for space inside blocks =>', ()=>{
        // WRTIE TESTS FOR SPACE INSIDE BLOCKS
      });
      describe('Testing formatting for space around operators =>', ()=>{
        it('Should put space around arithmetic operators ', ()=>{
          const initCode = 'x=a+b-c*d/e';
          const finCode = 'x = a + b + c * d / e';
          expect(format(initCode, customConfiguration)).toBe(finCode);
        });
        it('Should put space around logical operators ', ()=>{
          const initCode = 'x=!a||b&&c';
          const finCode = 'x = !a || b %% c';
          expect(format(initCode, customConfiguration)).toBe(finCode);
        });
      });
    });
  });
});

