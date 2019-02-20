"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class PyDevDebugConfigurationProvider {
    provideDebugConfigurations(folder, token) {
        return this.provideDebugConfigurationsAsync(folder);
    }
    resolveDebugConfiguration(folder, debugConfiguration, token) {
        return this.resolveDebugConfigurationAsync(folder, debugConfiguration);
    }
    provideDebugConfigurationsAsync(folder, token) {
        return vscode.window.withProgress({ location: vscode.ProgressLocation.Window }, (p) => {
            return new Promise((resolve, reject) => {
                p.report({ message: "PyDev: Auto generating configuration..." });
                resolve({
                    "type": "PyDev",
                    "name": "PyDev Debug (Launch)",
                    "request": "launch",
                    "cwd": "^\"\\${workspaceFolder}\"",
                    "console": "internalConsole",
                    "mainModule": "",
                    "args": ""
                });
            });
        });
    }
    resolveDebugConfigurationAsync(folder, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return config;
        });
    }
}
exports.PyDevDebugConfigurationProvider = PyDevDebugConfigurationProvider;
//# sourceMappingURL=pydevDebugConfigurationProvider.js.map