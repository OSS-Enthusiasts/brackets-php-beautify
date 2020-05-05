'use strict';

/**
 *  File: php.js
 *  Author: Chif <nadchif@gmail.com>
 *  Code originally adapted from https://github.com/chuaple/php-formatter/blob/master/php.js
 */

define(function(require, exports) {
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
    // TODO: Implement using the configuration options from the customConfiguration Object when formatting code below

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
    let formattedCode = code
        .replace(/(['"])([\s\S]*?)(\1)/g, (_exp, q, content) => ((contents.push(content), `${q}quotestring${q}`)));

    if (customConfiguration != null) {
      if (customConfiguration.Remove_all_comments == true) {
        formattedCode = formattedCode
            .replace(/'[^']*'|((?:#|\/\/).*$)/gm, '')
            .replace(/^\s*\/\*\*?[^!][.\s\t\S\n\r]*?\*\//gm, '');
      }
      if (customConfiguration.Remove_empty_lines == true) {
        formattedCode = formattedCode
            .replace(/^\s*/gm, '');
      }
      if (customConfiguration.Space_inside_brackets == true) {
        formattedCode = formattedCode
            .replace(/(\() */g, '$1 ')
            .replace(/ *(\))/g, ' $1');
      }
      if (customConfiguration.Space_inside_blocks == true) {
        formattedCode = formattedCode
            .replace(/(\{) */g, '$1 ')
            .replace(/ *(\})/g, ' $1')
            .split(/\r?\n/).map(indentSnippets).join('\n');
      }
      if (customConfiguration.Space_around_operators == true) {
      // NEED HELP REGARDING THE REGEX
      }
    }
    return formattedCode
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
