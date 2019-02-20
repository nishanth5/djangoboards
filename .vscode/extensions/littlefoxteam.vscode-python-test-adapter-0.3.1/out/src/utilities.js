"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function empty(x) {
    return !x || !x.length;
}
exports.empty = empty;
function getTestOutputBySplittingString(output, stringToSplitWith) {
    const split = output.split(stringToSplitWith);
    return split && split.pop() || '';
}
exports.getTestOutputBySplittingString = getTestOutputBySplittingString;
function groupBy(values, key) {
    return values.reduce((accumulator, x) => {
        if (accumulator.has(key(x))) {
            accumulator.get(key(x)).push(x);
        }
        else {
            accumulator.set(key(x), [x]);
        }
        return accumulator;
    }, new Map());
}
exports.groupBy = groupBy;
function distinctBy(values, key) {
    const byKey = new Map();
    values.forEach(x => {
        byKey.set(key(x), x);
    });
    return Array.from(byKey.values());
}
exports.distinctBy = distinctBy;
function ensureDifferentLabels(values, idSeparator) {
    const notAllIdsEndsWithLabel = values.some(v => !v.id.endsWith(v.label));
    if (notAllIdsEndsWithLabel) {
        return;
    }
    const updatedLabels = mapUniqueLabelsById(values.map(v => (Object.assign({}, v, { prefix: '' }))), idSeparator);
    values.filter(v => updatedLabels.has(v.id))
        .filter(v => updatedLabels.get(v.id).prefix)
        .forEach(v => {
        v.label = `${v.label} (${updatedLabels.get(v.id).prefix})`;
    });
}
exports.ensureDifferentLabels = ensureDifferentLabels;
function mapUniqueLabelsById(values, idSeparator) {
    const uniqueLabelsById = new Map();
    const labelGroups = groupBy(values, v => prependPrefix(v.prefix, idSeparator, v.label));
    Array.from(labelGroups.entries())
        .filter(([_, group]) => group.length > 1)
        .map(([label, group]) => {
        const extendedPrefixGroup = group.map(v => {
            const idPrefix = v.id.substring(0, v.id.length - label.length - idSeparator.length);
            const labelPrefix = extractLastElement(idPrefix.split(idSeparator));
            return {
                id: v.id,
                prefix: v.prefix ? prependPrefix(labelPrefix, idSeparator, v.prefix) : labelPrefix,
                label: v.label,
            };
        });
        extendedPrefixGroup.forEach(v => uniqueLabelsById.set(v.id, v));
        mapUniqueLabelsById(extendedPrefixGroup, idSeparator).forEach((v, k) => uniqueLabelsById.set(k, v));
    });
    return uniqueLabelsById;
}
function prependPrefix(prefix, idSeparator, value) {
    return (prefix ? prefix + idSeparator : '') + value;
}
function extractLastElement(values) {
    if (empty(values)) {
        return undefined;
    }
    return values[values.length - 1];
}
//# sourceMappingURL=utilities.js.map