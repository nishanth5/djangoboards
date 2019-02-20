"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const testHub_1 = require("./hub/testHub");
const testExplorer_1 = require("./testExplorer");
const util_1 = require("./util");
function activate(context) {
    const hub = new testHub_1.TestHub();
    const testExplorer = new testExplorer_1.TestExplorer(context);
    hub.registerTestController(testExplorer);
    const treeView = vscode.window.createTreeView('test-explorer', { treeDataProvider: testExplorer });
    context.subscriptions.push(treeView);
    const documentSelector = { pattern: '**/*' };
    context.subscriptions.push(vscode.languages.registerCodeLensProvider(documentSelector, testExplorer));
    const registerCommand = (command, callback) => {
        context.subscriptions.push(vscode.commands.registerCommand(command, callback));
    };
    registerCommand('test-explorer.reload', () => testExplorer.reload());
    registerCommand('test-explorer.reload-collection', (node) => testExplorer.reload(node));
    registerCommand('test-explorer.reloading', () => { });
    registerCommand('test-explorer.run-all', () => testExplorer.run());
    registerCommand('test-explorer.run', (...nodes) => testExplorer.run(nodes));
    registerCommand('test-explorer.rerun', () => testExplorer.rerun());
    registerCommand('test-explorer.run-file', (file) => util_1.runTestsInFile(file, testExplorer));
    registerCommand('test-explorer.run-test-at-cursor', () => util_1.runTestAtCursor(testExplorer));
    registerCommand('test-explorer.cancel', () => testExplorer.cancel());
    registerCommand('test-explorer.debug', (...nodes) => testExplorer.debug(nodes));
    registerCommand('test-explorer.redebug', () => testExplorer.redebug());
    registerCommand('test-explorer.debug-test-at-cursor', () => util_1.debugTestAtCursor(testExplorer));
    registerCommand('test-explorer.show-error', (message) => testExplorer.showError(message));
    registerCommand('test-explorer.show-source', (node) => testExplorer.showSource(node));
    registerCommand('test-explorer.enable-autorun', (node) => testExplorer.setAutorun(node));
    registerCommand('test-explorer.disable-autorun', (node) => testExplorer.clearAutorun(node));
    registerCommand('test-explorer.retire', (node) => testExplorer.retireState(node));
    registerCommand('test-explorer.reset', (node) => testExplorer.resetState(node));
    registerCommand('test-explorer.reveal', (node) => treeView.reveal(node));
    return {
        registerAdapter: adapter => hub.registerAdapter(adapter),
        unregisterAdapter: adapter => hub.unregisterAdapter(adapter),
        registerTestAdapter: adapter => hub.registerTestAdapter(adapter),
        unregisterTestAdapter: adapter => hub.unregisterTestAdapter(adapter),
        registerTestController: controller => hub.registerTestController(controller),
        unregisterTestController: controller => hub.unregisterTestController(controller)
    };
}
exports.activate = activate;
//# sourceMappingURL=main.js.map