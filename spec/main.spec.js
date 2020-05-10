/**
 *  File: main.spec.js
 *  Author: Chif <nadchif@gmail.com>, Shankhanil <shankha.rik@gmail.com>
 */

require('amd-loader');
// for tests that need RequireJS
define(function(require, exports, module) {
  'use strict';
  const phpjs = require('../src/thirdparty/php');
  const format = require('../src/thirdparty/php').format;

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

    describe('Default configuration => ', () => {
      describe('GNU coding style =>', () =>{
        // WRITE TESTS for formatting code a/c to GNU indentation style
      });

      describe('Formatting comments =>', () =>{
        // 'Remove_all_comments': false,
        it('Should keep the single line-comment untouched', ()=>{
          const code = '// a sample comment';
          expect(format(code, customConfiguration)).toBe(code);
        });
        it('Should keep the # comment untouched', ()=>{
          const code = '# a sample comment';
          expect(format(code, customConfiguration)).toBe(code);
        });
        it('Should keep the multi-line comment untouched', ()=>{
          const code = '/* a sample comment\n a multi line comment\n----------\n*/';
          expect(format(code, customConfiguration)).toBe(code);
        });
      });

      describe('Empty-line handling =>', ()=>{
        // 'Remove_empty_lines': true,
        it('Should remove empty lines', ()=>{
          const initCode = 'line_1\n\nline_2';
          const finCode = 'line_1\nline_2';
          expect(format(initCode, customConfiguration)).toBe(finCode);
        });
      });
      describe('short opening tag handling =>', ()=>{
        // 'Make_long_opening_tag': true,
        it('Should replace short opening tags with long opening tags', ()=>{
          const initCode = '<?\nSOME_CODE\n?>';
          const finCode = '<?php\nSOME_CODE\n?>';
          expect(format(initCode, customConfiguration)).toBe(finCode);
        });
      });
      describe('Bracket handling =>', ()=>{
        // 'Space_inside_brackets': true,
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
      describe('Block handling =>', ()=>{
        // 'Space_inside_blocks': true,

        // WRTIE TESTS FOR SPACE INSIDE BLOCKS

      });
      describe('Operator Spacing =>', ()=>{
        // 'Space_around_operators': true,
        it('Should put space around arithmetic operators ', ()=>{
          const initCode = 'x=a+b-c*d/e';
          const finCode = 'x = a + b - c * d / e';
          expect(format(initCode, customConfiguration)).toBe(finCode);
        });
        it('Should put space around logical operators ', ()=>{
          const initCode = 'x=!a||b&&c; if(2===3){echo. "hello"}';
          const finCode = 'x = !a || b && c; if( 2 === 3 ){ echo. \'hello\' }';
          expect(format(initCode, customConfiguration)).toBe(finCode);
        });
      });
    });
  });
});

