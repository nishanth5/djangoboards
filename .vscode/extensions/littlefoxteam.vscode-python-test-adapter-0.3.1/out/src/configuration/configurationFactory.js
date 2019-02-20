"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const placeholderAwareWorkspaceConfiguration_1 = require("./placeholderAwareWorkspaceConfiguration");
const vscodeWorkspaceConfiguration_1 = require("./vscodeWorkspaceConfiguration");
class DefaultConfigurationFactory {
    constructor(logger) {
        this.logger = logger;
    }
    get(workspaceFolder) {
        this.logger.log('info', `Reading configuration for workspace ${workspaceFolder.name}`);
        return new placeholderAwareWorkspaceConfiguration_1.PlaceholderAwareWorkspaceConfiguration(new vscodeWorkspaceConfiguration_1.VscodeWorkspaceConfiguration(workspaceFolder), workspaceFolder, this.logger);
    }
}
exports.DefaultConfigurationFactory = DefaultConfigurationFactory;
//# sourceMappingURL=configurationFactory.js.map