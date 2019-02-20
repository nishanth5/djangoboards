"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const state_1 = require("./state");
const testNode_1 = require("./testNode");
const util_1 = require("../util");
class TestSuiteNode {
    constructor(collection, info, parent, oldNodesById) {
        this.collection = collection;
        this.info = info;
        this.parent = parent;
        this.neededUpdates = 'none';
        this.log = undefined;
        this.fileUri = util_1.normalizeFilename(info.file);
        this._children = info.children.map(childInfo => {
            if (childInfo.type === 'test') {
                return new testNode_1.TestNode(collection, childInfo, this, oldNodesById);
            }
            else {
                return new TestSuiteNode(collection, childInfo, this, oldNodesById);
            }
        });
        this._state = state_1.parentNodeState(this._children);
    }
    get state() { return this._state; }
    get children() { return this._children; }
    recalcState() {
        for (const child of this.children) {
            if (child instanceof TestSuiteNode) {
                child.recalcState();
            }
        }
        if (this.neededUpdates === 'recalc') {
            const newCurrentNodeState = state_1.parentCurrentNodeState(this.children);
            const newPreviousNodeState = state_1.parentPreviousNodeState(this.children);
            const newAutorunFlag = state_1.parentAutorunFlag(this.children);
            if ((this.state.current !== newCurrentNodeState) ||
                (this.state.previous !== newPreviousNodeState) ||
                (this.state.autorun !== newAutorunFlag)) {
                this.state.current = newCurrentNodeState;
                this.state.previous = newPreviousNodeState;
                this.state.autorun = newAutorunFlag;
                this.neededUpdates = 'send';
                if (this.parent) {
                    this.parent.neededUpdates = 'recalc';
                }
                if (this.fileUri) {
                    this.collection.explorer.decorator.updateDecorationsFor(this.fileUri);
                }
            }
            else {
                this.neededUpdates = 'none';
            }
        }
    }
    retireState() {
        for (const child of this._children) {
            child.retireState();
        }
        this.neededUpdates = 'recalc';
    }
    resetState() {
        for (const child of this._children) {
            child.resetState();
        }
        this.neededUpdates = 'recalc';
    }
    setAutorun(autorun) {
        for (const child of this._children) {
            child.setAutorun(autorun);
        }
        this.neededUpdates = 'recalc';
    }
    getTreeItem() {
        if (this.neededUpdates === 'recalc') {
            this.recalcState();
        }
        this.neededUpdates = 'none';
        let label = this.info.label;
        if ((this.parent === undefined) && this.collection.adapter.workspaceFolder &&
            vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 1)) {
            label = `${this.collection.adapter.workspaceFolder.name} - ${label}`;
        }
        const treeItem = new vscode.TreeItem(label, vscode.TreeItemCollapsibleState.Collapsed);
        treeItem.id = this.uniqueId;
        treeItem.iconPath = this.collection.explorer.iconPaths[state_1.stateIcon(this.state)];
        treeItem.contextValue = this.parent ? (this.fileUri ? 'suiteWithSource' : 'suite') : 'collection';
        return treeItem;
    }
}
exports.TestSuiteNode = TestSuiteNode;
//# sourceMappingURL=testSuiteNode.js.map