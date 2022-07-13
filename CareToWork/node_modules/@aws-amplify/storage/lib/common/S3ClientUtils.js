"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@aws-amplify/core");
var client_s3_1 = require("@aws-sdk/client-s3");
var axios_http_handler_1 = require("../providers/axios-http-handler");
var StorageConstants_1 = require("./StorageConstants");
var logger = new core_1.Logger('S3ClientUtils');
// placeholder credentials in order to satisfy type requirement, always results in 403 when used
var INVALID_CRED = { accessKeyId: '', secretAccessKey: '' };
exports.getPrefix = function (config) {
    var credentials = config.credentials, level = config.level, customPrefix = config.customPrefix, identityId = config.identityId;
    var resolvedCustomPrefix = customPrefix || {};
    var resolvedIdentityId = identityId || credentials.identityId;
    var privatePath = (resolvedCustomPrefix.private !== undefined
        ? resolvedCustomPrefix.private
        : 'private/') +
        resolvedIdentityId +
        '/';
    var protectedPath = (resolvedCustomPrefix.protected !== undefined
        ? resolvedCustomPrefix.protected
        : 'protected/') +
        resolvedIdentityId +
        '/';
    var publicPath = resolvedCustomPrefix.public !== undefined
        ? resolvedCustomPrefix.public
        : 'public/';
    switch (level) {
        case 'private':
            return privatePath;
        case 'protected':
            return protectedPath;
        default:
            return publicPath;
    }
};
exports.createPrefixMiddleware = function (opt, key) { return function (next, _context) { return function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var credentials, cred, prefix, clonedInput, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, core_1.Credentials.get()];
            case 1:
                credentials = _a.sent();
                cred = core_1.Credentials.shear(credentials);
                prefix = exports.getPrefix(__assign(__assign({}, opt), { credentials: cred }));
                clonedInput = Object.assign({}, args.input);
                if (Object.prototype.hasOwnProperty.call(args.input, 'Key')) {
                    clonedInput.Key = prefix + key;
                    args.input = clonedInput;
                }
                else if (Object.prototype.hasOwnProperty.call(args.input, 'Prefix')) {
                    clonedInput.Prefix = prefix + key;
                    args.input = clonedInput;
                }
                result = next(args);
                return [2 /*return*/, result];
        }
    });
}); }; }; };
var isTimeSkewedError = function (err) {
    return err.ServerTime &&
        typeof err.Code === 'string' &&
        err.Code === 'RequestTimeTooSkewed';
};
// we want to take the S3Client config in parameter so we can modify it's systemClockOffset
exports.autoAdjustClockskewMiddleware = function (config) { return function (next, _context) { return function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1, serverDate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, next(args)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                err_1 = _a.sent();
                if (isTimeSkewedError(err_1)) {
                    serverDate = new Date(err_1.ServerTime);
                    config.systemClockOffset = serverDate.getTime() - Date.now();
                }
                throw err_1;
            case 3: return [2 /*return*/];
        }
    });
}); }; }; };
exports.autoAdjustClockskewMiddlewareOptions = {
    step: 'finalizeRequest',
    name: 'autoAdjustClockskewMiddleware',
};
exports.prefixMiddlewareOptions = {
    step: 'initialize',
    name: 'addPrefixMiddleware',
};
exports.credentialsProvider = function () { return __awaiter(void 0, void 0, void 0, function () {
    var credentials, cred, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, core_1.Credentials.get()];
            case 1:
                credentials = _a.sent();
                if (!credentials)
                    return [2 /*return*/, INVALID_CRED];
                cred = core_1.Credentials.shear(credentials);
                logger.debug('credentials provider get credentials', cred);
                return [2 /*return*/, cred];
            case 2:
                error_1 = _a.sent();
                logger.warn('credentials provider error', error_1);
                return [2 /*return*/, INVALID_CRED];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createS3Client = function (config, emitter) {
    var region = config.region, cancelTokenSource = config.cancelTokenSource, dangerouslyConnectToHttpEndpointForTesting = config.dangerouslyConnectToHttpEndpointForTesting, useAccelerateEndpoint = config.useAccelerateEndpoint;
    var localTestingConfig = {};
    if (dangerouslyConnectToHttpEndpointForTesting) {
        localTestingConfig = {
            endpoint: StorageConstants_1.localTestingStorageEndpoint,
            tls: false,
            bucketEndpoint: false,
            forcePathStyle: true,
        };
    }
    var s3client = new client_s3_1.S3Client(__assign(__assign({ region: region, 
        // Using provider instead of a static credentials, so that if an upload task was in progress, but credentials gets
        // changed or invalidated (e.g user signed out), the subsequent requests will fail.
        credentials: exports.credentialsProvider, customUserAgent: core_1.getAmplifyUserAgent() }, localTestingConfig), { requestHandler: new axios_http_handler_1.AxiosHttpHandler({}, emitter, cancelTokenSource), useAccelerateEndpoint: useAccelerateEndpoint }));
    s3client.middlewareStack.remove(StorageConstants_1.SET_CONTENT_LENGTH_HEADER);
    return s3client;
};
//# sourceMappingURL=S3ClientUtils.js.map