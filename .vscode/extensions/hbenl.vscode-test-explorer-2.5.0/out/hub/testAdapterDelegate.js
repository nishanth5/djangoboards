"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class TestAdapterDelegate {
    constructor(adapter, controller) {
        this.adapter = adapter;
        this.controller = controller;
        this.testsEmitter = new vscode.EventEmitter();
        this.disposables = [];
        this.disposables.push(this.testsEmitter);
        if (adapter.debug) {
            this.debug = tests => adapter.debug(tests);
        }
    }
    get workspaceFolder() {
        return this.adapter.workspaceFolder;
    }
    load() {
        return this.adapter.load();
    }
    run(tests) {
        return this.adapter.run(tests);
    }
    cancel() {
        this.adapter.cancel();
    }
    get tests() {
        return this.testsEmitter.event;
    }
    get testStates() {
        return this.adapter.testStates;
    }
    get autorun() {
        return this.adapter.autorun;
    }
    dispose() {
        this.disposables.forEach(d => d.dispose());
        this.disposables.splice(0, this.disposables.length);
    }
}
exports.TestAdapterDelegate = TestAdapterDelegate;
//# sourceMappingURL=testAdapterDelegate.js.map