"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const argparse_1 = require("argparse");
const vscode_1 = require("vscode");
class VscodeWorkspaceConfiguration {
    constructor(workspaceFolder) {
        this.workspaceFolder = workspaceFolder;
        this.argumentParser = this.configureUnittestArgumentParser();
        this.pythonConfiguration = this.getPythonConfiguration(workspaceFolder);
        this.testExplorerConfiguration = this.getTestExplorerConfiguration(workspaceFolder);
    }
    pythonPath() {
        return this.pythonConfiguration.get('pythonPath', 'python');
    }
    getCwd() {
        const unitTestCwd = this.pythonConfiguration.get('unitTest.cwd');
        return unitTestCwd ?
            unitTestCwd :
            this.workspaceFolder.uri.fsPath;
    }
    envFile() {
        return this.pythonConfiguration.get('envFile', '${workspaceFolder}/.env');
    }
    getUnittestConfiguration() {
        return {
            isUnittestEnabled: this.isUnitTestEnabled(),
            unittestArguments: this.getUnitTestArguments(),
        };
    }
    getPytestConfiguration() {
        return {
            isPytestEnabled: this.isPytestTestEnabled(),
            pytestArguments: this.getPyTestArguments(),
        };
    }
    isUnitTestEnabled() {
        const overriddenTestFramework = this.testExplorerConfiguration.get('testFramework', null);
        if (overriddenTestFramework) {
            return 'unittest' === overriddenTestFramework;
        }
        return this.pythonConfiguration.get('unitTest.unittestEnabled', false);
    }
    getUnitTestArguments() {
        const [known] = this.argumentParser.parseKnownArgs(this.pythonConfiguration.get('unitTest.unittestArgs', []));
        return known;
    }
    isPytestTestEnabled() {
        const overriddenTestFramework = this.testExplorerConfiguration.get('testFramework', null);
        if (overriddenTestFramework) {
            return 'pytest' === overriddenTestFramework;
        }
        return this.pythonConfiguration.get('unitTest.pyTestEnabled', false);
    }
    getPyTestArguments() {
        return this.pythonConfiguration.get('unitTest.pyTestArgs', []);
    }
    configureUnittestArgumentParser() {
        const argumentParser = new argparse_1.ArgumentParser();
        argumentParser.addArgument(['-p', '--pattern'], {
            dest: 'pattern',
            defaultValue: 'test*.py',
        });
        argumentParser.addArgument(['-s', '--start-directory'], {
            dest: 'startDirectory',
            defaultValue: '.',
        });
        return argumentParser;
    }
    getConfigurationByName(name, workspaceFolder) {
        return vscode_1.workspace.getConfiguration(name, workspaceFolder.uri);
    }
    getPythonConfiguration(workspaceFolder) {
        return this.getConfigurationByName('python', workspaceFolder);
    }
    getTestExplorerConfiguration(workspaceFolder) {
        return this.getConfigurationByName('pythonTestExplorer', workspaceFolder);
    }
}
exports.VscodeWorkspaceConfiguration = VscodeWorkspaceConfiguration;
//# sourceMappingURL=vscodeWorkspaceConfiguration.js.map