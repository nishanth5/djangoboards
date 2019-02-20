"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class ErrorNode {
    constructor(collection, errorMessage) {
        this.collection = collection;
        this.errorMessage = errorMessage;
    }
    getTreeItem() {
        const treeItem = new vscode.TreeItem('Error while loading tests - click to show', vscode.TreeItemCollapsibleState.None);
        treeItem.id = 'error';
        treeItem.contextValue = 'error';
        treeItem.command = {
            title: '',
            command: 'test-explorer.show-error',
            arguments: [this.errorMessage]
        };
        return treeItem;
    }
    get children() { return []; }
}
exports.ErrorNode = ErrorNode;
//# sourceMappingURL=errorNode.js.map