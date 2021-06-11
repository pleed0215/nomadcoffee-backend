"use strict";
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
var prisma_1 = require("../prisma");
var users_utils_1 = require("./users.utils");
var resolvers = {
    User: {
        followers: function (_a, _b, _c) {
            var id = _a.id;
            var page = _b.page;
            var prisma = _c.prisma;
            return prisma.user.findFirst({ where: { id: id } }).followers({
                take: prisma_1.PAGE_SIZE,
                skip: page ? (page - 1) * prisma_1.PAGE_SIZE : 0,
                //...(lastId && { cursor: { id: lastId } }),
                orderBy: { id: "asc" },
            });
        },
        followings: function (_a, _b, _c) {
            var id = _a.id;
            var page = _b.page;
            var prisma = _c.prisma;
            return prisma.user.findFirst({ where: { id: id } }).followings({
                take: prisma_1.PAGE_SIZE,
                skip: page ? (page - 1) * prisma_1.PAGE_SIZE : 0,
                //...(lastId && { cursor: { id: lastId } }),
                orderBy: { id: "asc" },
            });
        },
        isMe: users_utils_1.loginOnlyProtector(function (_a, _, _b) {
            var id = _a.id;
            var loggedInUser = _b.loggedInUser;
            return (loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.id) === id;
        }),
        totalFollowers: function (_a, _, _b) {
            var id = _a.id;
            var prisma = _b.prisma;
            return prisma.user.count({ where: { followings: { some: { id: id } } } });
        },
        totalFollowings: function (_a, _, _b) {
            var id = _a.id;
            var prisma = _b.prisma;
            return prisma.user.count({ where: { followers: { some: { id: id } } } });
        },
        isFollowing: users_utils_1.loginOnlyProtector(function (_a, _, _b) {
            var id = _a.id;
            var loggedInUser = _b.loggedInUser, prisma = _b.prisma;
            return __awaiter(void 0, void 0, void 0, function () {
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _c = Boolean;
                            return [4 /*yield*/, prisma.user.findFirst({
                                    where: { id: loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.id, followings: { some: { id: id } } },
                                })];
                        case 1: return [2 /*return*/, _c.apply(void 0, [_d.sent()])];
                    }
                });
            });
        }),
        isFollowed: users_utils_1.loginOnlyProtector(function (_a, _, _b) {
            var id = _a.id;
            var loggedInUser = _b.loggedInUser, prisma = _b.prisma;
            return __awaiter(void 0, void 0, void 0, function () {
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _c = Boolean;
                            return [4 /*yield*/, prisma.user.findFirst({
                                    where: { id: loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.id, followers: { some: { id: id } } },
                                })];
                        case 1: return [2 /*return*/, _c.apply(void 0, [_d.sent()])];
                    }
                });
            });
        }),
    },
    Query: {
        seeUser: function (_, _a, _b) {
            var id = _a.id;
            var prisma = _b.prisma;
            return prisma.user.findUnique({ where: { id: id } });
        },
        me: users_utils_1.loginOnlyProtector(function (_, __, _a) {
            var loggedInUser = _a.loggedInUser;
            return loggedInUser;
        }),
    },
};
exports.default = resolvers;
