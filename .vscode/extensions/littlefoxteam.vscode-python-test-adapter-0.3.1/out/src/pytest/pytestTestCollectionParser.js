"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const utilities_1 = require("../utilities");
const DISCOVERED_TESTS_START_MARK = '==DISCOVERED TESTS BEGIN==';
const DISCOVERED_TESTS_END_MARK = '==DISCOVERED TESTS END==';
function parseTestSuites(content, cwd) {
    const from = content.indexOf(DISCOVERED_TESTS_START_MARK);
    const to = content.indexOf(DISCOVERED_TESTS_END_MARK);
    const discoveredTestsJson = content.substring(from + DISCOVERED_TESTS_START_MARK.length, to);
    const allTests = JSON.parse(discoveredTestsJson)
        .map(line => (Object.assign({}, line, { id: line.id.replace(/::\(\)/g, '') })))
        .filter(line => line.id)
        .map(line => splitModule(line, cwd))
        .filter(line => line)
        .map(line => line);
    return Array.from(utilities_1.groupBy(allTests, t => t.modulePath).entries())
        .map(([modulePath, tests]) => ({
        type: 'suite',
        id: modulePath,
        label: path.basename(modulePath),
        file: modulePath,
        children: toTestSuites(tests.map(t => ({
            idHead: t.modulePath,
            idTail: t.testPath,
            line: t.line,
            path: modulePath,
        }))),
    }));
}
exports.parseTestSuites = parseTestSuites;
function toTestSuites(tests) {
    if (utilities_1.empty(tests)) {
        return [];
    }
    const testsAndSuites = utilities_1.groupBy(tests, t => t.idTail.includes('::'));
    const firstLevelTests = toFirstLevelTests(testsAndSuites.get(false));
    const suites = toSuites(testsAndSuites.get(true));
    return firstLevelTests.concat(suites);
}
function toSuites(suites) {
    if (!suites) {
        return [];
    }
    return Array.from(utilities_1.groupBy(suites.map(test => splitTest(test)), group => group.idHead).entries())
        .map(([suite, suiteTests]) => ({
        type: 'suite',
        id: suite,
        label: suiteTests[0].name,
        file: suiteTests[0].path,
        children: toTestSuites(suiteTests),
    }));
}
function toFirstLevelTests(tests) {
    if (!tests) {
        return [];
    }
    return tests.map(test => ({
        id: `${test.idHead}::${test.idTail}`,
        label: test.idTail,
        type: 'test',
        file: test.path,
        line: test.line,
    }));
}
function splitTest(test) {
    const separatorIndex = test.idTail.indexOf('::');
    return {
        idHead: `${test.idHead}::${test.idTail.substring(0, separatorIndex)}`,
        idTail: test.idTail.substring(separatorIndex + 2),
        name: test.idTail.substring(0, separatorIndex),
        path: test.path,
        line: test.line,
    };
}
function splitModule(test, cwd) {
    const separatorIndex = test.id.indexOf('::');
    if (separatorIndex < 0) {
        return null;
    }
    return {
        modulePath: path.resolve(cwd, test.id.substring(0, separatorIndex)),
        testPath: test.id.substring(separatorIndex + 2),
        line: test.line,
    };
}
//# sourceMappingURL=pytestTestCollectionParser.js.map