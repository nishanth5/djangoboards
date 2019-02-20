"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const js_base64_1 = require("js-base64");
const path = require("path");
const utilities_1 = require("../utilities");
const unittestScripts_1 = require("./unittestScripts");
function parseTestSuites(output, cwd) {
    const allTests = utilities_1.getTestOutputBySplittingString(output, '==DISCOVERED TESTS==')
        .split(/\r?\n/g)
        .map(line => line.trim())
        .filter(line => line)
        .map(line => splitTestId(line))
        .filter(line => line)
        .map(line => line);
    return Array.from(utilities_1.groupBy(allTests, t => t.suitId).entries())
        .map(([suitId, tests]) => ({
        type: 'suite',
        id: suitId,
        label: suitId.substring(suitId.lastIndexOf('.') + 1),
        file: filePathBySuitId(cwd, suitId),
        children: tests.map(test => ({
            id: test.testId,
            label: test.testLabel,
            type: 'test',
        })),
    }));
}
exports.parseTestSuites = parseTestSuites;
function parseTestStates(output) {
    const testEvents = output
        .split(/\r?\n/g)
        .map(line => line.trim())
        .map(line => tryParseTestState(line))
        .filter(line => line)
        .map(line => line);
    return utilities_1.distinctBy(testEvents, e => e.test);
}
exports.parseTestStates = parseTestStates;
function tryParseTestState(line) {
    if (!line) {
        return undefined;
    }
    if (!line.startsWith(unittestScripts_1.TEST_RESULT_PREFIX)) {
        return undefined;
    }
    const [, result, testId, base64Message = ''] = line.split(':');
    if (result == null || testId == null) {
        return undefined;
    }
    const state = toState(result.trim());
    if (!state) {
        return undefined;
    }
    return {
        type: 'test',
        test: testId.trim(),
        state,
        message: base64Message ? js_base64_1.Base64.decode(base64Message.trim()) : undefined,
    };
}
function toState(value) {
    switch (value) {
        case 'running':
        case 'passed':
        case 'failed':
        case 'skipped':
            return value;
        default:
            return undefined;
    }
}
function splitTestId(testId) {
    const separatorIndex = testId.lastIndexOf('.');
    if (separatorIndex < 0) {
        return null;
    }
    return {
        suitId: testId.substring(0, separatorIndex),
        testId,
        testLabel: testId.substring(separatorIndex + 1),
    };
}
function filePathBySuitId(cwd, suitId) {
    const separatorIndex = suitId.lastIndexOf('.');
    if (separatorIndex < 0) {
        return undefined;
    }
    return path.resolve(cwd, suitId.substring(0, separatorIndex).split('.').join('/') + '.py');
}
//# sourceMappingURL=unittestSuitParser.js.map