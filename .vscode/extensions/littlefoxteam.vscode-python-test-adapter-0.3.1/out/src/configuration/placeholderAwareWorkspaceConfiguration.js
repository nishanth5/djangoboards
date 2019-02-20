"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class PlaceholderAwareWorkspaceConfiguration {
    constructor(configuration, workspaceFolder, logger) {
        this.configuration = configuration;
        this.workspaceFolder = workspaceFolder;
        this.logger = logger;
    }
    pythonPath() {
        return this.resolvePath(this.configuration.pythonPath());
    }
    getCwd() {
        return this.resolvePath(this.configuration.getCwd());
    }
    envFile() {
        return this.resolvePath(this.configuration.envFile());
    }
    getUnittestConfiguration() {
        const original = this.configuration.getUnittestConfiguration();
        return {
            isUnittestEnabled: original.isUnittestEnabled,
            unittestArguments: {
                pattern: this.resolvePlaceholders(original.unittestArguments.pattern),
                startDirectory: this.resolvePath(original.unittestArguments.startDirectory),
            },
        };
    }
    getPytestConfiguration() {
        const original = this.configuration.getPytestConfiguration();
        return {
            isPytestEnabled: original.isPytestEnabled,
            pytestArguments: original.pytestArguments.map(argument => this.resolvePlaceholders(argument)),
        };
    }
    resolvePlaceholders(rawValue) {
        const availableReplacements = new Map();
        availableReplacements.set('workspaceFolder', this.workspaceFolder.uri.fsPath);
        availableReplacements.set('workspaceRoot', this.workspaceFolder.uri.fsPath);
        availableReplacements.set('workspaceFolderBasename', path.basename(this.workspaceFolder.uri.fsPath));
        availableReplacements.set('workspaceRootFolderName', path.basename(this.workspaceFolder.uri.fsPath));
        availableReplacements.set('cwd', this.workspaceFolder.uri.fsPath);
        Object.keys(process.env)
            .filter(key => process.env[key])
            .forEach(key => {
            availableReplacements.set(`env:${key}`, process.env[key]);
        });
        const regexp = /\$\{(.*?)\}/g;
        return rawValue.replace(regexp, (match, name) => {
            const replacement = availableReplacements.get(name);
            if (replacement) {
                return replacement;
            }
            this.logger.log('warn', `Placeholder ${match} was not recognized and can not be replaced.`);
            return match;
        });
    }
    resolvePath(rawValue) {
        return this.normalizePath(this.resolvePlaceholders(rawValue));
    }
    normalizePath(value) {
        if (value.includes(path.posix.sep) || value.includes(path.win32.sep)) {
            const absolutePath = path.isAbsolute(value) ?
                path.resolve(value) :
                path.resolve(this.workspaceFolder.uri.fsPath, value);
            return path.normalize(absolutePath);
        }
        return value;
    }
}
exports.PlaceholderAwareWorkspaceConfiguration = PlaceholderAwareWorkspaceConfiguration;
//# sourceMappingURL=placeholderAwareWorkspaceConfiguration.js.map