"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const vscode = require("vscode");
const testCollection_1 = require("./tree/testCollection");
const iconPaths_1 = require("./iconPaths");
const treeEventDebouncer_1 = require("./treeEventDebouncer");
const decorator_1 = require("./decorator");
const util_1 = require("./util");
class TestExplorer {
    constructor(context) {
        this.treeDataChanged = new vscode.EventEmitter();
        this.codeLensesChanged = new vscode.EventEmitter();
        this.collections = [];
        this.loadingCount = 0;
        this.runningCount = 0;
        this.iconPaths = new iconPaths_1.IconPaths(context);
        this.decorator = new decorator_1.Decorator(context, this);
        this.treeEvents = new treeEventDebouncer_1.TreeEventDebouncer(this.collections, this.treeDataChanged);
        this.outputChannel = vscode.window.createOutputChannel("Test Explorer");
        context.subscriptions.push(this.outputChannel);
        this.onDidChangeTreeData = this.treeDataChanged.event;
        this.onDidChangeCodeLenses = this.codeLensesChanged.event;
    }
    registerTestAdapter(adapter) {
        this.collections.push(new testCollection_1.TestCollection(adapter, this));
    }
    unregisterTestAdapter(adapter) {
        var index = this.collections.findIndex((collection) => (collection.adapter === adapter));
        if (index >= 0) {
            this.collections[index].dispose();
            this.collections.splice(index, 1);
        }
    }
    getTreeItem(node) {
        return node.getTreeItem();
    }
    getChildren(node) {
        if (node) {
            return node.children;
        }
        else {
            const nonEmptyCollections = this.collections.filter((collection) => ((collection.suite !== undefined) || (collection.error !== undefined)));
            if (nonEmptyCollections.length === 0) {
                return [];
            }
            else if (nonEmptyCollections.length === 1) {
                const collection = nonEmptyCollections[0];
                if (collection.suite) {
                    return collection.suite.children;
                }
                else {
                    return [collection.error];
                }
            }
            else {
                return nonEmptyCollections.map(collection => (collection.suite || collection.error));
            }
        }
    }
    getParent(node) {
        return node.parent;
    }
    reload(node) {
        if (node) {
            node.collection.adapter.load();
        }
        else {
            for (const collection of this.collections) {
                collection.adapter.load();
            }
        }
    }
    run(nodes) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.lastTestRun = undefined;
            if (nodes) {
                const node = yield util_1.pickNode(nodes);
                if (node) {
                    this.lastTestRun = [node.collection, [node.info.id]];
                    node.collection.adapter.run([node.info.id]);
                }
            }
            else {
                for (const collection of this.collections) {
                    if (collection.suite) {
                        collection.adapter.run([collection.suite.info.id]);
                    }
                }
            }
        });
    }
    rerun() {
        if (this.lastTestRun) {
            const collection = this.lastTestRun[0];
            const testIds = this.lastTestRun[1];
            return collection.adapter.run(testIds);
        }
        return Promise.resolve();
    }
    debug(nodes) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.lastTestRun = undefined;
            const node = yield util_1.pickNode(nodes);
            if (node && node.collection.adapter.debug) {
                try {
                    this.lastTestRun = [node.collection, [node.info.id]];
                    yield node.collection.adapter.debug([node.info.id]);
                }
                catch (e) {
                    vscode.window.showErrorMessage(`Error while debugging test: ${e}`);
                    return;
                }
            }
        });
    }
    redebug() {
        if (this.lastTestRun) {
            const collection = this.lastTestRun[0];
            const testIds = this.lastTestRun[1];
            return collection.adapter.debug(testIds);
        }
        return Promise.resolve();
    }
    cancel() {
        this.collections.forEach(collection => collection.adapter.cancel());
    }
    showError(message) {
        if (message) {
            this.outputChannel.clear();
            this.outputChannel.append(message);
            this.outputChannel.show(true);
        }
        else {
            this.outputChannel.hide();
        }
    }
    showSource(node) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fileUri = node.fileUri;
            if (fileUri) {
                const document = yield vscode.workspace.openTextDocument(vscode.Uri.parse(fileUri));
                let line = node.info.line;
                if (line === undefined) {
                    line = util_1.findLineContaining(node.info.label, document.getText());
                    node.info.line = line;
                }
                const options = (line !== undefined) ? { selection: new vscode.Range(line, 0, line, 0) } : undefined;
                yield vscode.window.showTextDocument(document, options);
            }
        });
    }
    setAutorun(node) {
        if (node) {
            node.collection.setAutorun(node);
        }
        else {
            for (const collection of this.collections) {
                collection.setAutorun(collection.suite);
            }
        }
    }
    clearAutorun(node) {
        if (node) {
            node.collection.setAutorun(undefined);
        }
        else {
            for (const collection of this.collections) {
                collection.setAutorun(undefined);
            }
        }
    }
    retireState(node) {
        if (node) {
            node.collection.retireState(node);
        }
        else {
            for (const collection of this.collections) {
                collection.retireState();
            }
        }
    }
    resetState(node) {
        if (node) {
            node.collection.resetState(node);
        }
        else {
            for (const collection of this.collections) {
                collection.resetState();
            }
        }
    }
    provideCodeLenses(document, token) {
        const fileUri = document.uri.toString();
        const codeLenses = this.collections.map(collection => collection.getCodeLenses(fileUri));
        return [].concat(...codeLenses);
    }
    testLoadStarted() {
        this.loadingCount++;
        vscode.commands.executeCommand('setContext', 'testsLoading', true);
    }
    testLoadFinished() {
        this.loadingCount--;
        if (this.loadingCount === 0) {
            vscode.commands.executeCommand('setContext', 'testsLoading', false);
        }
    }
    testRunStarted() {
        this.runningCount++;
        vscode.commands.executeCommand('setContext', 'testsRunning', true);
    }
    testRunFinished() {
        this.runningCount--;
        if (this.runningCount === 0) {
            vscode.commands.executeCommand('setContext', 'testsRunning', false);
        }
    }
}
exports.TestExplorer = TestExplorer;
//# sourceMappingURL=testExplorer.js.map