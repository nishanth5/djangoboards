"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const state_1 = require("./state");
const util_1 = require("../util");
class TestNode {
    constructor(collection, info, parent, oldNodesById) {
        this.collection = collection;
        this.info = info;
        this.parent = parent;
        this._log = "";
        this._decorations = [];
        this.neededUpdates = 'none';
        this.children = [];
        this.fileUri = util_1.normalizeFilename(info.file);
        const oldNode = oldNodesById ? oldNodesById.get(info.id) : undefined;
        if (oldNode && (oldNode.info.type === 'test')) {
            let currentState = oldNode.state.current;
            if (info.skipped) {
                currentState = 'always-skipped';
            }
            else if ((currentState === 'always-skipped') || (currentState === 'duplicate')) {
                currentState = 'pending';
            }
            let previousState = oldNode.state.previous;
            if (info.skipped) {
                previousState = 'always-skipped';
            }
            else if ((previousState === 'always-skipped') || (previousState === 'duplicate')) {
                previousState = 'pending';
            }
            this._state = {
                current: currentState,
                previous: previousState,
                autorun: oldNode.state.autorun
            };
            this._log = oldNode.log || "";
        }
        else {
            this._state = state_1.defaultState(info.skipped);
            this._log = "";
        }
    }
    get state() { return this._state; }
    get log() { return this._log; }
    get decorations() { return this._decorations; }
    setCurrentState(currentState, logMessage, decorations) {
        this.state.current = currentState;
        if ((currentState === 'passed') || (currentState === 'failed') ||
            (currentState === 'duplicate') || (currentState === 'errored') ||
            ((currentState === 'skipped') && (this.state.previous !== 'always-skipped'))) {
            this.state.previous = currentState;
        }
        if (currentState === 'scheduled') {
            this._log = "";
            this._decorations = [];
        }
        if (logMessage) {
            this._log += logMessage + "\n";
        }
        if (decorations) {
            this._decorations = this._decorations.concat(decorations);
        }
        this.neededUpdates = 'send';
        if (this.parent) {
            this.parent.neededUpdates = 'recalc';
        }
        this.collection.sendNodeChangedEvents();
        if (this.fileUri) {
            this.collection.explorer.decorator.updateDecorationsFor(this.fileUri);
        }
    }
    retireState() {
        if ((this.state.current === 'passed') || (this.state.current === 'failed') ||
            (this.state.current === 'skipped') || (this.state.current === 'errored')) {
            this._state.current = 'pending';
            this.neededUpdates = 'send';
            if (this.fileUri) {
                this.collection.explorer.decorator.updateDecorationsFor(this.fileUri);
            }
        }
    }
    resetState() {
        this._log = "";
        if ((this.state.current !== 'pending') && (this.state.current !== 'always-skipped') && (this.state.current !== 'duplicate')) {
            this._state.current = 'pending';
            this.neededUpdates = 'send';
        }
        if ((this.state.previous !== 'pending') && (this.state.previous !== 'always-skipped') && (this.state.previous !== 'duplicate')) {
            this._state.previous = 'pending';
            this.neededUpdates = 'send';
        }
        if (this._decorations.length > 0) {
            this._decorations = [];
            if (this.fileUri) {
                this.collection.explorer.decorator.updateDecorationsFor(this.fileUri);
            }
        }
    }
    setAutorun(autorun) {
        this._state.autorun = autorun;
        this.neededUpdates = 'send';
    }
    getTreeItem() {
        this.neededUpdates = 'none';
        const treeItem = new vscode.TreeItem(this.info.label, vscode.TreeItemCollapsibleState.None);
        treeItem.id = this.uniqueId;
        treeItem.iconPath = this.collection.explorer.iconPaths[state_1.stateIcon(this.state)];
        treeItem.contextValue = this.collection.adapter.debug ?
            (this.fileUri ? 'debuggableTestWithSource' : 'debuggableTest') :
            (this.fileUri ? 'testWithSource' : 'test');
        treeItem.command = {
            title: '',
            command: 'test-explorer.show-error',
            arguments: [this.log]
        };
        return treeItem;
    }
}
exports.TestNode = TestNode;
//# sourceMappingURL=testNode.js.map