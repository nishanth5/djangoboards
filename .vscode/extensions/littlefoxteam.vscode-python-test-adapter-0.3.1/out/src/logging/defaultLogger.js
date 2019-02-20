"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultLogger {
    constructor(output, workspaceFolder, framework) {
        this.output = output;
        this.workspaceFolder = workspaceFolder;
        this.framework = framework;
    }
    log(level, message) {
        try {
            this.output.write(`${new Date().toISOString()} ` +
                `${level} ` +
                `at '${this.workspaceFolder.name}' ` +
                `[${this.framework} runner]: ` +
                `${message}`);
        }
        catch (_a) {
        }
    }
}
exports.DefaultLogger = DefaultLogger;
//# sourceMappingURL=defaultLogger.js.map