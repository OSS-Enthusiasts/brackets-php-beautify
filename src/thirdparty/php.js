'use strict';

/**
 *  File: php.js
 *  Author: Chif <nadchif@gmail.com>
 *  Code originally adapted from https://github.com/chuaple/php-formatter/blob/master/php.js
 */

define(function(require, exports) {
  /* ------------------------------------------------------
    * CODE FOR getting formatting options from phpbeautifyrc.json

  const fs = require('fs');
  const rawdata = fs.readFileSync('phpbeautifyrc.json');
  const data = JSON.parse(rawdata);
  console.log(data);
    * ---------------------------------------------------------

    Suggested implementation:
    Let's use Brackets APIs as much as possible ;-)

    See more below:
   */

  const Dialogs = brackets.getModule('widgets/Dialogs');

  const getCustomConfigFile = () => {
    return new Promise((resolve, reject) => {
      try {
        const ProjectManager = brackets.getModule('project/ProjectManager');
        // Get the user's working project directory
        const projectDirectory = ProjectManager.getProjectRoot();
        projectDirectory.getContents((err, files) => {
          if (err) {
            reject(err);
          }
          const matchingFile = files.find((file) => {
            return (file.fullPath.toLowerCase().endsWith('/.phpbeautifyrc.json'));
          });
          if (!matchingFile) {
            console.warn('No .phpbeautifyrc.json file found in project directory. Default options will be used');
            reject(Error('No .phpbeautifyrc.json file found'));
          }
          matchingFile.read((err, rawdata) => {
            if (err) {
              reject(err);
            }
            try {
              const data = JSON.parse(rawdata);
              resolve(data);
            } catch (e) {
              // notify the user that the .phpbeautifyrc.json is corrupt or unreadable
              Dialogs.showModalDialog('',
                  'PHP Beautify Configuration Error',
                  `${matchingFile.fullPath} could not be parsed!`);
              reject(e);
            }
          });
        });
      } catch (e) {
        reject(e);
      }
    });
  };

  const format = (code, customConfiguration) => {
    // use custom configuration here. if there was none found, customConfiguration will still be null
    console.log('Using the following configuration', customConfiguration);

    let leval = 0;
    const indentSnippets = (code) => {
      code = code.trim();
      const comment = code.startsWith('/');
      if ('})]'.includes(code.charAt(0))) leval--;
      if (code) code = `${' '.repeat(leval * 4)}${code}`;
      if ('{(['.includes(code.charAt(code.length - 1)) && !comment) leval++;
      return code;
    };
    const contents = [];
    return code
        .replace(/(['"])([\s\S]*?)(\1)/g, (_exp, q, content) => ((contents.push(content), `${q}quotestring${q}`)))

        .replace(/ ?([\+\-\*\/\.\?!><]?={1,3})(?!\>) ?/g, ' $1 ') // `=` [>1]
        .replace(/ ?([\&\|]{2}) ?/g, ' $1 ') // `&&` `||` [>1]
        .replace(/ *(,) ?(?!\n)/g, '$1 ') // `,` [0, >1]
        .replace(/\n* *(\{)/g, ' $1') // before `{` [1]

        .replace(/(\() */g, '$1 ') // after  `(` [1]
        .replace(/ *(\))/g, ' $1') // before `)` [1]
        .replace(/\(\s*\)/g, '()') // `()`

        .replace(/(if|for|each)\s*\(/g, '$1 (') // after `if` `for` and `each`

        .replace(/([\{\}])(.)/g, '$1\n$2') // after `{` `}` [LF]
        .replace(/\}\s*(else|catch)/g, '} $1') // after  `else` except
        .replace(/(else|catch)\s*\{/g, '$1 {') // before `else` except

        .replace(/[；;](.)/g, ';\n$1') // after `;` [LF]
        .replace(/for \([\s\S]*?\)/g, (exp) => exp.replace(/;\s+/g, '; ')) // `for` except

        .split(/\r?\n/).map(indentSnippets).join('\n') // 设置缩进

        .replace(/([^\{])\n+( *(public |private )?(function |class ))/g, '$1\n\n$2') // 函数/类前添加空行
        .replace(/(\n{2,})/g, '\n\n') // 去除多余空行

        .replace(/(['"]).*?(\1)/g, (_exp, q, content) =>
          (((content = contents.shift()), q === '"' && content.match(/[\$\n']/g) ? `"${content}"` : `'${content}'`)));
  };

  const formatWithOptions = (code, document) => {
    getCustomConfigFile().
        then((customConfiguration) => {
          const formattedWithOptions = format(code, customConfiguration);
          document.setText(formattedWithOptions);
        })
        .catch((error) => {
          console.error(error);
          const formatted = format(code, null);
          document.setText(formatted);
        });
  };

  exports.formatter = (code, document) => {
    if (code.trim().substr(0, 6).toLocaleLowerCase().startsWith('\<?php')) {
      formatWithOptions(code, document);
    }
  };
});
