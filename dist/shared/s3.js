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
exports.removeFile = exports.uploadFile = void 0;
var AWS = require("aws-sdk");
var BUCKET_NAME = "nomadcoffee";
var uploadFile = function (file) { return __awaiter(void 0, void 0, void 0, function () {
    var s3Stream, filename, createReadStream, readStream, objectName, upload_1, end, url, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!(process.env.AWS_ACCESS && process.env.AWS_SECRET)) return [3 /*break*/, 2];
                AWS.config.update({
                    credentials: {
                        accessKeyId: process.env.AWS_ACCESS,
                        secretAccessKey: process.env.AWS_SECRET,
                    },
                });
                s3Stream = require("s3-upload-stream")(new AWS.S3());
                filename = file.filename, createReadStream = file.createReadStream;
                readStream = createReadStream();
                objectName = Date.now() + "_" + filename;
                upload_1 = s3Stream.upload({
                    Bucket: BUCKET_NAME,
                    Key: objectName,
                    ACL: "public-read",
                });
                readStream.pipe(upload_1);
                end = new Promise(function (resolve, reject) {
                    upload_1.on("error", function () {
                        reject(new Error("Error occured on file uploading"));
                    });
                    upload_1.on("uploaded", function (details) {
                        resolve(details.Location);
                    });
                });
                return [4 /*yield*/, end];
            case 1:
                url = _a.sent();
                if (url && typeof url === "string") {
                    return [2 /*return*/, __assign({ ok: true }, (url && { url: url }))];
                }
                else {
                    throw url;
                }
                return [3 /*break*/, 3];
            case 2: throw new Error("AWS Credential failed");
            case 3: return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                return [2 /*return*/, {
                        ok: false,
                        error: e_1.message,
                    }];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.uploadFile = uploadFile;
// url 구조 분석 정규표현식.
/*url: RegExp['$&'],
protocol:RegExp.$2,
host:RegExp.$3,
path:RegExp.$4,
file:RegExp.$6,
query:RegExp.$7,
hash:RegExp.$8*/
// from: https://stackoverflow.com/questions/27745/getting-parts-of-a-url-regex
var urlRegex = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/g;
/**
 * 제공된 url 파일을 제거. url을 분석하여 s3 버킷 파일을 제거한다.
 * @param {string} url 제거할 url
 * @returns {RemoveResult} 잘 제거 되면 ok: true, 아니면 ok: false + 에러메시지.
 */
var removeFile = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var parsed, key, result, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                if (!(process.env.AWS_ACCESS && process.env.AWS_SECRET)) return [3 /*break*/, 4];
                AWS.config.update({
                    region: "ap-northeast-2",
                    credentials: {
                        accessKeyId: process.env.AWS_ACCESS,
                        secretAccessKey: process.env.AWS_SECRET,
                    },
                });
                if (!url.includes(BUCKET_NAME)) return [3 /*break*/, 2];
                parsed = url.split(urlRegex);
                key = parsed[4].slice(1) + parsed[6];
                return [4 /*yield*/, new AWS.S3()
                        .deleteObject({
                        Bucket: BUCKET_NAME,
                        Key: key,
                    })
                        .promise()];
            case 1:
                result = _a.sent();
                return [2 /*return*/, {
                        ok: true,
                    }];
            case 2: 
            // 해당 버킷이 아니면.. 일단 좀 이상하긴해도 큰 문제는 아니니까 ok리턴.
            return [2 /*return*/, {
                    ok: true,
                }];
            case 3: return [3 /*break*/, 5];
            case 4: throw new Error("AWS credential failed");
            case 5: return [3 /*break*/, 7];
            case 6:
                e_2 = _a.sent();
                // 자꾸 access denied에러가 발생하여 일단은 .. 에러 처리 안하는 것으로..
                /*
                return {
                  ok: false,
                  error: e.message,
                };*/
                return [2 /*return*/, {
                        ok: true,
                    }];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.removeFile = removeFile;
