// eslint-disable-next-line max-len
/* jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
// eslint-disable-next-line no-unused-vars
/* global define, $, brackets, window */

/**
 *  File: Main.js
 *  Author: Chif <nadchif@gmail.com>
 *  Description:  Simple install-and-use code formatter (beautifier) PHP in Brackets. No extra configuration need, no PHP required
 */

define(function(require, exports, module) {
  'use strict';

  const phpFormatter = require('lib/php').formatter;

  const CommandManager = brackets.getModule('command/CommandManager');
  const EditorManager = brackets.getModule('editor/EditorManager');
  const Menus = brackets.getModule('command/Menus');

  const formatCode = function formatCode() {
    const editor = EditorManager.getFocusedEditor();
    if (editor) {
      const unformatted = editor.document.getText();
      const formatted = phpFormatter(unformatted);
      editor.document.setText(formatted);
    }
  };

  CommandManager.register('Format Document (PHP-Beautify)', 'abfwep', formatCode);

  Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuItem('abfwep', null, Menus.LAST);
});
