/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { ConsoleLogger as Logger, Parser } from '@aws-amplify/core';
import { AWSS3Provider } from './providers';
import axios from 'axios';
import { AWSS3UploadTask } from './providers/AWSS3UploadTask';
var logger = new Logger('StorageClass');
var DEFAULT_PROVIDER = 'AWSS3';
/**
 * Provide storage methods to use AWS S3
 */
var Storage = /** @class */ (function () {
    /**
     * Initialize Storage
     * @param {Object} config - Configuration object for storage
     */
    function Storage() {
        this._config = {};
        this._pluggables = [];
        this._cancelTokenSourceMap = new WeakMap();
        logger.debug('Storage Options', this._config);
        this.get = this.get.bind(this);
        this.put = this.put.bind(this);
        this.remove = this.remove.bind(this);
        this.list = this.list.bind(this);
    }
    Storage.prototype.getModuleName = function () {
        return 'Storage';
    };
    /**
     * add plugin into Storage category
     * @param {Object} pluggable - an instance of the plugin
     */
    Storage.prototype.addPluggable = function (pluggable) {
        if (pluggable && pluggable.getCategory() === 'Storage') {
            this._pluggables.push(pluggable);
            var config = {};
            config = pluggable.configure(this._config[pluggable.getProviderName()]);
            return config;
        }
    };
    /**
     * Get the plugin object
     * @param providerName - the name of the plugin
     */
    Storage.prototype.getPluggable = function (providerName) {
        var pluggable = this._pluggables.find(function (pluggable) { return pluggable.getProviderName() === providerName; });
        if (pluggable === undefined) {
            logger.debug('No plugin found with providerName', providerName);
            return null;
        }
        else
            return pluggable;
    };
    /**
     * Remove the plugin object
     * @param providerName - the name of the plugin
     */
    Storage.prototype.removePluggable = function (providerName) {
        this._pluggables = this._pluggables.filter(function (pluggable) { return pluggable.getProviderName() !== providerName; });
        return;
    };
    /**
     * Configure Storage
     * @param {Object} config - Configuration object for storage
     * @return {Object} - Current configuration
     */
    Storage.prototype.configure = function (config) {
        var _this = this;
        logger.debug('configure Storage');
        if (!config)
            return this._config;
        var amplifyConfig = Parser.parseMobilehubConfig(config);
        var storageKeysFromConfig = Object.keys(amplifyConfig.Storage);
        var storageArrayKeys = [
            'bucket',
            'region',
            'level',
            'track',
            'customPrefix',
            'serverSideEncryption',
            'SSECustomerAlgorithm',
            'SSECustomerKey',
            'SSECustomerKeyMD5',
            'SSEKMSKeyId',
        ];
        var isInStorageArrayKeys = function (k) {
            return storageArrayKeys.some(function (x) { return x === k; });
        };
        var checkConfigKeysFromArray = function (k) {
            return k.find(function (k) { return isInStorageArrayKeys(k); });
        };
        if (storageKeysFromConfig &&
            checkConfigKeysFromArray(storageKeysFromConfig) &&
            !amplifyConfig.Storage[DEFAULT_PROVIDER]) {
            amplifyConfig.Storage[DEFAULT_PROVIDER] = {};
        }
        Object.entries(amplifyConfig.Storage).map(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            if (key && isInStorageArrayKeys(key) && value !== undefined) {
                amplifyConfig.Storage[DEFAULT_PROVIDER][key] = value;
                delete amplifyConfig.Storage[key];
            }
        });
        // only update new values for each provider
        Object.keys(amplifyConfig.Storage).forEach(function (providerName) {
            if (typeof amplifyConfig.Storage[providerName] !== 'string') {
                _this._config[providerName] = __assign(__assign({}, _this._config[providerName]), amplifyConfig.Storage[providerName]);
            }
        });
        this._pluggables.forEach(function (pluggable) {
            pluggable.configure(_this._config[pluggable.getProviderName()]);
        });
        if (this._pluggables.length === 0) {
            this.addPluggable(new AWSS3Provider());
        }
        return this._config;
    };
    Storage.prototype.getCancellableTokenSource = function () {
        return axios.CancelToken.source();
    };
    Storage.prototype.updateRequestToBeCancellable = function (request, cancelTokenSource) {
        this._cancelTokenSourceMap.set(request, cancelTokenSource);
    };
    Storage.prototype.isUploadTask = function (x) {
        return (typeof x !== 'undefined' &&
            typeof x['pause'] === 'function' &&
            typeof x['resume'] === 'function');
    };
    Storage.prototype.cancel = function (request, message) {
        if (request instanceof AWSS3UploadTask) {
            return request._cancel();
        }
        var cancelTokenSource = this._cancelTokenSourceMap.get(request);
        if (cancelTokenSource) {
            cancelTokenSource.cancel(message);
        }
        else {
            logger.debug('The request does not map to any cancel token');
        }
    };
    Storage.prototype.copy = function (src, dest, config) {
        var provider = (config === null || config === void 0 ? void 0 : config.provider) || DEFAULT_PROVIDER;
        var prov = this._pluggables.find(function (pluggable) { return pluggable.getProviderName() === provider; });
        if (prov === undefined) {
            logger.debug('No plugin found with providerName', provider);
            return Promise.reject('No plugin found in Storage for the provider');
        }
        var cancelTokenSource = this.getCancellableTokenSource();
        if (typeof prov.copy !== 'function') {
            return Promise.reject(".copy is not implemented on provider " + prov.getProviderName());
        }
        var responsePromise = prov.copy(src, dest, __assign(__assign({}, config), { cancelTokenSource: cancelTokenSource }));
        this.updateRequestToBeCancellable(responsePromise, cancelTokenSource);
        return responsePromise;
    };
    Storage.prototype.get = function (key, config) {
        var provider = (config === null || config === void 0 ? void 0 : config.provider) || DEFAULT_PROVIDER;
        var prov = this._pluggables.find(function (pluggable) { return pluggable.getProviderName() === provider; });
        if (prov === undefined) {
            logger.debug('No plugin found with providerName', provider);
            return Promise.reject('No plugin found in Storage for the provider');
        }
        var cancelTokenSource = this.getCancellableTokenSource();
        var responsePromise = prov.get(key, __assign(__assign({}, config), { cancelTokenSource: cancelTokenSource }));
        this.updateRequestToBeCancellable(responsePromise, cancelTokenSource);
        return responsePromise;
    };
    Storage.prototype.isCancelError = function (error) {
        return axios.isCancel(error);
    };
    Storage.prototype.put = function (key, object, config) {
        var provider = (config === null || config === void 0 ? void 0 : config.provider) || DEFAULT_PROVIDER;
        var prov = this._pluggables.find(function (pluggable) { return pluggable.getProviderName() === provider; });
        if (prov === undefined) {
            logger.debug('No plugin found with providerName', provider);
            return Promise.reject('No plugin found in Storage for the provider');
        }
        var cancelTokenSource = this.getCancellableTokenSource();
        var response = prov.put(key, object, __assign(__assign({}, config), { cancelTokenSource: cancelTokenSource }));
        if (!this.isUploadTask(response)) {
            this.updateRequestToBeCancellable(response, cancelTokenSource);
        }
        return response;
    };
    Storage.prototype.remove = function (key, config) {
        var provider = (config === null || config === void 0 ? void 0 : config.provider) || DEFAULT_PROVIDER;
        var prov = this._pluggables.find(function (pluggable) { return pluggable.getProviderName() === provider; });
        if (prov === undefined) {
            logger.debug('No plugin found with providerName', provider);
            return Promise.reject('No plugin found in Storage for the provider');
        }
        return prov.remove(key, config);
    };
    Storage.prototype.list = function (path, config) {
        var provider = (config === null || config === void 0 ? void 0 : config.provider) || DEFAULT_PROVIDER;
        var prov = this._pluggables.find(function (pluggable) { return pluggable.getProviderName() === provider; });
        if (prov === undefined) {
            logger.debug('No plugin found with providerName', provider);
            return Promise.reject('No plugin found in Storage for the provider');
        }
        return prov.list(path, config);
    };
    return Storage;
}());
export { Storage };
/**
 * @deprecated use named import
 */
export default Storage;
//# sourceMappingURL=Storage.js.map