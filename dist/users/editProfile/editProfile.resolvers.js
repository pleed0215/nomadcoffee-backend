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
var bcrypt = require("bcrypt");
var users_utils_1 = require("../users.utils");
var s3_1 = require("../../shared/s3");
var resolvedFn = function (_, _a, _b) {
    var id = _a.id, username = _a.username, email = _a.email, name = _a.name, password = _a.password, location = _a.location, githubUsername = _a.githubUsername;
    var loggedInUser = _b.loggedInUser, prisma = _b.prisma;
    return __awaiter(void 0, void 0, void 0, function () {
        var user, hashedPassword, data, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, prisma.user.findUnique({
                            where: { id: id },
                            rejectOnNotFound: true,
                        })];
                case 1:
                    user = _c.sent();
                    if (user.id !== (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.id)) {
                        throw Error("Permission Error: Cannot Edit other's profile.");
                    }
                    hashedPassword = void 0;
                    if (!password) return [3 /*break*/, 3];
                    return [4 /*yield*/, bcrypt.hash(password, 10)];
                case 2:
                    hashedPassword = _c.sent();
                    _c.label = 3;
                case 3:
                    data = __assign(__assign(__assign(__assign(__assign(__assign({}, (username && { username: username })), (email && { email: email })), (password && { password: hashedPassword })), (name && { name: name })), (location && { location: location })), (githubUsername && { githubUsername: githubUsername }));
                    return [4 /*yield*/, prisma.user.update({
                            where: { id: id },
                            data: data,
                        })];
                case 4:
                    _c.sent();
                    return [2 /*return*/, {
                            ok: true,
                            id: user.id,
                        }];
                case 5:
                    e_1 = _c.sent();
                    return [2 /*return*/, {
                            ok: false,
                            error: e_1.message,
                        }];
                case 6: return [2 /*return*/];
            }
        });
    });
};
var updateAvatar = function (_, _a, _b) {
    var file = _a.file;
    var prisma = _b.prisma, loggedInUser = _b.loggedInUser;
    return __awaiter(void 0, void 0, void 0, function () {
        var uploaded, _c, e_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 6, , 7]);
                    _c = s3_1.uploadFile;
                    return [4 /*yield*/, file];
                case 1: return [4 /*yield*/, _c.apply(void 0, [_d.sent()])];
                case 2:
                    uploaded = _d.sent();
                    if (!(uploaded.ok && loggedInUser)) return [3 /*break*/, 4];
                    return [4 /*yield*/, prisma.user.update({
                            where: {
                                id: loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.id,
                            },
                            data: {
                                avatarURL: uploaded.url,
                            },
                        })];
                case 3:
                    _d.sent();
                    return [2 /*return*/, {
                            ok: true,
                            url: uploaded.url,
                        }];
                case 4: throw new Error("Failed to upload to s3.");
                case 5: return [3 /*break*/, 7];
                case 6:
                    e_2 = _d.sent();
                    return [2 /*return*/, {
                            ok: false,
                            error: e_2.message,
                        }];
                case 7: return [2 /*return*/];
            }
        });
    });
};
var resolvers = {
    Mutation: {
        editProfile: users_utils_1.loginOnlyProtector(resolvedFn),
        updateAvatar: users_utils_1.loginOnlyProtector(updateAvatar),
    },
};
exports.default = resolvers;
