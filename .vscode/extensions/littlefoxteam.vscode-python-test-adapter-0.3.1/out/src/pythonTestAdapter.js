"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const vscode_1 = require("vscode");
class PythonTestAdapter {
    constructor(workspaceFolder, testRunner, configurationFactory, logger) {
        this.workspaceFolder = workspaceFolder;
        this.testRunner = testRunner;
        this.configurationFactory = configurationFactory;
        this.logger = logger;
        this.disposables = [];
        this.testsEmitter = new vscode_1.EventEmitter();
        this.testStatesEmitter = new vscode_1.EventEmitter();
        this.autorunEmitter = new vscode_1.EventEmitter();
        this.testsById = new Map();
        this.disposables = [
            this.testsEmitter,
            this.testStatesEmitter,
            this.autorunEmitter
        ];
    }
    get tests() { return this.testsEmitter.event; }
    get testStates() {
        return this.testStatesEmitter.event;
    }
    get autorun() {
        return this.autorunEmitter.event;
    }
    load() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                this.testsEmitter.fire({ type: 'started' });
                this.testsById.clear();
                const config = this.configurationFactory.get(this.workspaceFolder);
                const tests = yield this.testRunner.load(config);
                this.saveToMap(tests);
                this.sortTests(tests);
                this.testsEmitter.fire({ type: 'finished', suite: tests });
            }
            catch (error) {
                this.logger.log('crit', `Test loading failed: ${error}`);
                this.testsEmitter.fire({ type: 'finished', suite: undefined, errorMessage: error.stack });
            }
        });
    }
    run(tests) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                this.testStatesEmitter.fire({ type: 'started', tests });
                const config = this.configurationFactory.get(this.workspaceFolder);
                const testRuns = tests.map(test => {
                    return this.testRunner.run(config, test)
                        .then(states => states.forEach(state => this.testStatesEmitter.fire(state)))
                        .catch(reason => {
                        this.logger.log('crit', `Execution of the test "${test}" failed: ${reason}`);
                        this.setTestStatesRecursive(test, 'failed', reason);
                    });
                });
                yield Promise.all(testRuns);
            }
            finally {
                this.testStatesEmitter.fire({ type: 'finished' });
            }
        });
    }
    debug(tests) {
        const config = this.configurationFactory.get(this.workspaceFolder);
        const debugConfiguration = this.testRunner.debugConfiguration(config, tests[0]);
        return new Promise(() => {
            vscode_1.debug.startDebugging(this.workspaceFolder, Object.assign({
                name: `Debug ${tests[0]}`,
                type: 'python',
                request: 'launch',
                console: 'none',
            }, debugConfiguration)).then(() => { });
        });
    }
    cancel() {
        this.testRunner.cancel();
    }
    dispose() {
        for (const disposable of this.disposables) {
            disposable.dispose();
        }
        this.disposables = [];
    }
    sortTests(test) {
        if (!test) {
            return;
        }
        test.children.sort((x, y) => x.label.localeCompare(y.label, undefined, { sensitivity: 'base', numeric: true }));
        test.children.filter(t => t)
            .filter(t => t.type === 'suite')
            .map(t => t)
            .forEach(t => this.sortTests(t));
    }
    saveToMap(test) {
        if (!test) {
            return;
        }
        this.testsById.set(test.id, test);
        if (test.type === 'suite') {
            test.children.forEach(child => this.saveToMap(child));
        }
    }
    setTestStatesRecursive(test, state, message) {
        const info = this.testsById.get(test);
        if (!info) {
            this.logger.log('warn', `Test information for "${test}" not found`);
            return;
        }
        if (info.type === 'suite') {
            info.children.forEach(child => this.setTestStatesRecursive(child.id, state, message));
        }
        else {
            this.testStatesEmitter.fire({
                type: 'test',
                test: info.id,
                state,
                message,
            });
        }
    }
}
exports.PythonTestAdapter = PythonTestAdapter;
//# sourceMappingURL=pythonTestAdapter.js.map