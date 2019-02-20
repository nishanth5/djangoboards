'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs_1 = require("fs");
let pasteIndent = () => {
    let editor = vscode.window.activeTextEditor;
    if (editor === undefined)
        return;
    let baseIndent = editor.selection.active.character, tabSize = Number(editor.options.tabSize), insertSpaces = Boolean(editor.options.insertSpaces);
    vscode.env.clipboard.readText().then((s) => {
        let lines = s.split('\n');
        if (fs_1.linkSync.length <= 1)
            return;
        let blockIndent = 0;
        if (lines[0].endsWith(':')) {
            if (insertSpaces)
                blockIndent = tabSize;
            else
                blockIndent = 1;
        }
        let indents = [];
        let firstLineNotEmpty = -1, indentForFirstLineNotEmpty = -1;
        for (let i = 1; i < lines.length; ++i) {
            let alphaIndex = lines[i].search(/\S/);
            if (alphaIndex !== -1) {
                firstLineNotEmpty = i;
                indentForFirstLineNotEmpty = alphaIndex;
                break;
            }
        }
        for (let i = firstLineNotEmpty; i < lines.length; ++i) {
            let alphaIndex = lines[i].search(/\S/);
            if (alphaIndex !== -1) {
                lines[i] = lines[i].substr(alphaIndex);
                indents.push(alphaIndex - indentForFirstLineNotEmpty);
            }
            else
                indents.push(-1);
        }
        let blank = ' ';
        if (!insertSpaces)
            blank = '\t';
        indents.forEach((indent, i) => {
            let lineIndex = i + firstLineNotEmpty;
            if (indent !== -1)
                lines[lineIndex] = blank.repeat(baseIndent + blockIndent + indent) + lines[lineIndex];
        });
        vscode.env.clipboard.writeText(lines.join('\n')).then(() => {
            vscode.commands.executeCommand('editor.action.clipboardPasteAction');
        });
    });
};
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('pyPasteIndent.pasteIndent', pasteIndent));
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map