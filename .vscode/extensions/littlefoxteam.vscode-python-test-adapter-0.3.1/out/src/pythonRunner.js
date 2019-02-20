"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const child_process_1 = require("child_process");
const iconv = require("iconv-lite");
const os_1 = require("os");
class PythonProcessExecution {
    constructor(args, configuration) {
        this.pythonProcess = child_process_1.spawn(configuration.pythonPath, args, {
            cwd: configuration.cwd,
            env: Object.assign({}, process.env, configuration.environment, { PYTHONUNBUFFERED: '1' }),
        });
        this.pid = this.pythonProcess.pid;
    }
    complete() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const stdoutBuffer = [];
                const stderrBuffer = [];
                this.pythonProcess.stdout.on('data', chunk => stdoutBuffer.push(chunk));
                this.pythonProcess.stderr.on('data', chunk => stderrBuffer.push(chunk));
                this.pythonProcess.once('close', exitCode => {
                    if (exitCode !== 0 && !this.pythonProcess.killed) {
                        reject(`Process exited with code ${exitCode}: ${decode(stderrBuffer)}`);
                    }
                    const output = decode(stdoutBuffer);
                    if (!output) {
                        if (stdoutBuffer.length > 0) {
                            reject('Can not decode output from the process');
                        }
                        else if (stderrBuffer.length > 0 && !this.pythonProcess.killed) {
                            reject(`Process returned an error:${os_1.EOL}${decode(stderrBuffer)}`);
                        }
                    }
                    resolve({ exitCode, output });
                });
                this.pythonProcess.once('error', error => {
                    reject(`Error occurred during process execution: ${error}`);
                });
            });
        });
    }
    cancel() {
        this.pythonProcess.kill('SIGINT');
    }
}
function run(args, configuration) {
    return new PythonProcessExecution(args, configuration);
}
function runScript(configuration) {
    return run(['-c', configuration.script].concat(configuration.args || []), configuration);
}
exports.runScript = runScript;
function decode(buffers) {
    return iconv.decode(Buffer.concat(buffers), 'utf8');
}
//# sourceMappingURL=pythonRunner.js.map