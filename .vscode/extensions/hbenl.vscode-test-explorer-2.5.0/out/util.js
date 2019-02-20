"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const vscode = require("vscode");
const RegExpEscape = require("escape-string-regexp");
function* allTests(treeNode) {
    if (treeNode.info.type === 'suite') {
        for (const child of treeNode.children) {
            yield* allTests(child);
        }
    }
    else {
        yield treeNode;
    }
}
exports.allTests = allTests;
function runTestsInFile(fileUri, testExplorer) {
    if (!fileUri && vscode.window.activeTextEditor) {
        fileUri = vscode.window.activeTextEditor.document.uri.toString();
    }
    if (fileUri) {
        for (const collection of testExplorer.collections) {
            if (collection.suite) {
                const found = findFileNode(fileUri, collection.suite);
                if (found) {
                    testExplorer.run([found]);
                    return;
                }
            }
        }
    }
}
exports.runTestsInFile = runTestsInFile;
function findFileNode(fileUri, searchNode) {
    if (searchNode.fileUri) {
        if (searchNode.fileUri === fileUri) {
            return searchNode;
        }
        else {
            return undefined;
        }
    }
    else {
        for (const childNode of searchNode.children) {
            const found = findFileNode(fileUri, childNode);
            if (found) {
                return found;
            }
        }
    }
    return undefined;
}
function runTestAtCursor(testExplorer) {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const nodes = findNodesLocatedAboveCursor(editor.document.uri.toString(), editor.selection.active.line, testExplorer);
        if (nodes.length > 0) {
            testExplorer.run(nodes);
        }
    }
}
exports.runTestAtCursor = runTestAtCursor;
function debugTestAtCursor(testExplorer) {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const nodes = findNodesLocatedAboveCursor(editor.document.uri.toString(), editor.selection.active.line, testExplorer);
        if (nodes.length > 0) {
            testExplorer.debug(nodes);
        }
    }
}
exports.debugTestAtCursor = debugTestAtCursor;
function findNodesLocatedAboveCursor(fileUri, cursorLine, testExplorer) {
    let currentLine = -1;
    let currentNodes = [];
    for (const collection of testExplorer.collections) {
        const locatedNodes = collection.getLocatedNodes(fileUri);
        if (locatedNodes) {
            for (const line of locatedNodes.keys()) {
                if ((line > cursorLine) || (line < currentLine))
                    continue;
                const lineNodes = locatedNodes.get(line);
                if (line === currentLine) {
                    currentNodes.push(...lineNodes);
                }
                else {
                    currentLine = line;
                    currentNodes = [...lineNodes];
                }
            }
        }
    }
    return currentNodes;
}
function findLineContaining(needle, haystack) {
    if (!haystack)
        return undefined;
    const index = haystack.search(RegExpEscape(needle));
    if (index < 0)
        return undefined;
    return haystack.substr(0, index).split('\n').length - 1;
}
exports.findLineContaining = findLineContaining;
function pickNode(nodes) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (nodes.length === 1) {
            return nodes[0];
        }
        else if (nodes.length > 1) {
            const labels = nodes.map(node => node.info.label);
            const pickedLabel = yield vscode.window.showQuickPick(labels);
            return nodes.find(node => (node.info.label === pickedLabel));
        }
        else {
            return undefined;
        }
    });
}
exports.pickNode = pickNode;
function createRunCodeLens(line, nodes) {
    const range = new vscode.Range(line, 0, line, 0);
    return new vscode.CodeLens(range, {
        title: 'Run',
        command: 'test-explorer.run',
        arguments: nodes
    });
}
exports.createRunCodeLens = createRunCodeLens;
function createDebugCodeLens(line, nodes) {
    const range = new vscode.Range(line, 0, line, 0);
    return new vscode.CodeLens(range, {
        title: 'Debug',
        command: 'test-explorer.debug',
        arguments: nodes
    });
}
exports.createDebugCodeLens = createDebugCodeLens;
function createLogCodeLens(line, nodes) {
    const range = new vscode.Range(line, 0, line, 0);
    let log = '';
    for (const node of nodes) {
        if (node.log) {
            log += node.log;
        }
    }
    return new vscode.CodeLens(range, {
        title: 'Show Log',
        command: 'test-explorer.show-error',
        arguments: [log]
    });
}
exports.createLogCodeLens = createLogCodeLens;
function createRevealCodeLens(line, nodes) {
    const range = new vscode.Range(line, 0, line, 0);
    return new vscode.CodeLens(range, {
        title: 'Show in Test Explorer',
        command: 'test-explorer.reveal',
        arguments: nodes
    });
}
exports.createRevealCodeLens = createRevealCodeLens;
const schemeMatcher = /^[a-z][a-z0-9+-.]+:/;
function normalizeFilename(file) {
    if (file === undefined)
        return undefined;
    if (schemeMatcher.test(file)) {
        return vscode.Uri.parse(file).toString();
    }
    else {
        return vscode.Uri.file(file).toString();
    }
}
exports.normalizeFilename = normalizeFilename;
//# sourceMappingURL=util.js.map