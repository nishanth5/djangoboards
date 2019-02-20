"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = require("fs");
const os_1 = require("os");
const path = require("path");
const xml2js = require("xml2js");
const utilities_1 = require("../utilities");
function parseTestStates(outputXmlFile, cwd) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fs.readFile(outputXmlFile, 'utf8', (readError, data) => {
                if (readError) {
                    return reject(`Can not read test results: ${readError}`);
                }
                xml2js.parseString(data, (parseError, parserResult) => {
                    if (parseError) {
                        return reject(parseError);
                    }
                    try {
                        const results = parseTestResults(parserResult, cwd);
                        resolve(results);
                    }
                    catch (exception) {
                        reject(`Can not parse test results: ${exception}`);
                    }
                });
            });
        });
    });
}
exports.parseTestStates = parseTestStates;
function parseTestResults(parserResult, cwd) {
    if (!parserResult) {
        return [];
    }
    const testSuiteResult = parserResult.testsuite;
    if (!Array.isArray(testSuiteResult.testcase)) {
        return [];
    }
    return testSuiteResult.testcase.map(testcase => mapToTestState(testcase, cwd)).filter(x => x);
}
function mapToTestState(testcase, cwd) {
    const testId = buildTestName(cwd, testcase.$);
    if (!testId) {
        return undefined;
    }
    const [state, message] = getTestState(testcase);
    const decorations = state !== 'passed' ? [{
            line: testcase.$.line,
            message,
        }] : null;
    return {
        state,
        test: testId,
        type: 'test',
        message,
        decorations,
    };
}
function getTestState(testcase) {
    const output = utilities_1.empty(testcase['system-out']) ? '' : testcase['system-out'].join(os_1.EOL) + os_1.EOL;
    if (testcase.error) {
        return ['failed', output + extractErrorMessage(testcase.error)];
    }
    if (testcase.failure) {
        return ['failed', output + extractErrorMessage(testcase.failure)];
    }
    if (testcase.skipped) {
        return ['skipped', output + extractErrorMessage(testcase.skipped)];
    }
    return ['passed', output];
}
function extractErrorMessage(errors) {
    if (!errors || !errors.length) {
        return '';
    }
    return errors.map(e => e.$.message + os_1.EOL + e._).join(os_1.EOL);
}
function buildTestName(cwd, test) {
    if (!test || !test.file || !test.classname || !test.name) {
        return undefined;
    }
    const pathParts = test.file.split(path.sep);
    const classParts = test.classname.split('.').filter(p => p !== '()');
    if (classParts.length < pathParts.length) {
        return undefined;
    }
    const module = path.resolve(cwd, test.file);
    if (classParts.length === pathParts.length) {
        return `${module}::${test.name}`;
    }
    const index = firstNotEqualIndex(pathParts, classParts);
    if (index === pathParts.length - 1) {
        return `${module}::${classParts.slice(index + 1).join('::')}::${test.name}`;
    }
    return undefined;
}
function firstNotEqualIndex(a, b) {
    const length = Math.min(a.length, b.length);
    for (let index = 0; index < length; ++index) {
        if (a[index] !== b[index]) {
            return index;
        }
    }
    return a.length === b.length ? -1 : length;
}
//# sourceMappingURL=pytestJunitTestStatesParser.js.map