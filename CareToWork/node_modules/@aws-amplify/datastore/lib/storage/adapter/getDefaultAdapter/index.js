"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@aws-amplify/core");
var IndexedDBAdapter_1 = __importDefault(require("../IndexedDBAdapter"));
var AsyncStorageAdapter_1 = __importDefault(require("../AsyncStorageAdapter"));
var getDefaultAdapter = function () {
    var isBrowser = core_1.browserOrNode().isBrowser;
    if ((isBrowser && window.indexedDB) || (core_1.isWebWorker() && self.indexedDB)) {
        return IndexedDBAdapter_1.default;
    }
    return AsyncStorageAdapter_1.default;
};
exports.default = getDefaultAdapter;
//# sourceMappingURL=index.js.map