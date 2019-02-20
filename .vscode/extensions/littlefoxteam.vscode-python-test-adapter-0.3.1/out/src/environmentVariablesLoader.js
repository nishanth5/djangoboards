"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = require("dotenv");
const fs = require("fs");
const path = require("path");
class EnvironmentVariablesLoader {
    static load(envFilePath, logger) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!envFilePath) {
                logger.log('info', 'Environment variables file is not defined');
                return {};
            }
            const envPath = path.resolve(envFilePath);
            const envFileExists = yield new Promise((resolve, _) => {
                fs.exists(envPath, exist => {
                    resolve(exist);
                });
            });
            if (envFileExists) {
                logger.log('info', `Loading environment variables file ${envPath}`);
                return yield new Promise((resolve, _) => {
                    fs.readFile(envPath, (error, content) => {
                        if (error) {
                            logger.log('warn', `Could not read environment variables file ${envPath}`);
                            resolve({});
                        }
                        resolve(dotenv_1.parse(content));
                    });
                });
            }
            else {
                logger.log('info', `Environment variables file ${envPath} does not exist`);
                return {};
            }
        });
    }
}
exports.EnvironmentVariablesLoader = EnvironmentVariablesLoader;
//# sourceMappingURL=environmentVariablesLoader.js.map