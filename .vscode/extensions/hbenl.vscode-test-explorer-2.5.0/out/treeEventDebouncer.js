"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TreeEventDebouncer {
    constructor(collections, treeDataChanged) {
        this.collections = collections;
        this.treeDataChanged = treeDataChanged;
    }
    sendNodeChangedEvents(immediately) {
        if (immediately) {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = undefined;
            }
            this.sendNodeChangedEventsNow();
        }
        else if (!this.timeout) {
            this.timeout = setTimeout(() => {
                this.timeout = undefined;
                this.sendNodeChangedEventsNow();
            }, 200);
        }
    }
    sendTreeChangedEvent() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = undefined;
        }
        this.treeDataChanged.fire();
    }
    sendNodeChangedEventsNow() {
        const changedNodes = [];
        for (const collection of this.collections) {
            if (collection.suite) {
                collection.recalcState();
                changedNodes.push(...this.collectChangedNodes(collection.suite));
            }
        }
        for (const node of changedNodes) {
            if (node.parent === undefined) {
                this.treeDataChanged.fire();
            }
            else {
                this.treeDataChanged.fire(node);
            }
        }
    }
    collectChangedNodes(node) {
        if (node.neededUpdates === 'send') {
            this.resetNeededUpdates(node);
            return [node];
        }
        else {
            const nodesToSend = [];
            for (const child of node.children) {
                nodesToSend.push(...this.collectChangedNodes(child));
            }
            return nodesToSend;
        }
    }
    resetNeededUpdates(node) {
        node.neededUpdates = 'none';
        for (const child of node.children) {
            this.resetNeededUpdates(child);
        }
    }
}
exports.TreeEventDebouncer = TreeEventDebouncer;
//# sourceMappingURL=treeEventDebouncer.js.map