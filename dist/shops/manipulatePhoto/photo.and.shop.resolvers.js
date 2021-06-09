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
var s3_1 = require("../../shared/s3");
var users_utils_1 = require("../../users/users.utils");
var addPhotosToShop = function (_, _a, _b) {
    var id = _a.id, photos = _a.photos;
    var prisma = _b.prisma, loggedInUser = _b.loggedInUser;
    return __awaiter(void 0, void 0, void 0, function () {
        var shop, uploaded_1, _i, photos_1, photo, result, _c, updated, e_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, prisma.coffeeShop.findUnique({
                            where: { id: id },
                            rejectOnNotFound: true,
                        })];
                case 1:
                    shop = _d.sent();
                    if (shop.userId !== loggedInUser.id) {
                        throw new Error("Permission Error: Cannot edit not yours.");
                    }
                    if (!photos || photos.length === 0) {
                        throw new Error("Input Error: At least one photo needed.");
                    }
                    uploaded_1 = [];
                    if (!(photos && photos.length > 0)) return [3 /*break*/, 6];
                    _i = 0, photos_1 = photos;
                    _d.label = 2;
                case 2:
                    if (!(_i < photos_1.length)) return [3 /*break*/, 6];
                    photo = photos_1[_i];
                    _c = s3_1.uploadFile;
                    return [4 /*yield*/, photo];
                case 3: return [4 /*yield*/, _c.apply(void 0, [_d.sent()])];
                case 4:
                    result = _d.sent();
                    if (result.ok) {
                        if (result.url) {
                            uploaded_1.push(result.url);
                        }
                    }
                    else {
                        throw { e: new Error(result.error), uploaded: uploaded_1 };
                    }
                    _d.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        prisma.coffeeShop
                            .update({
                            where: { id: id },
                            data: __assign({}, (uploaded_1.length > 0 && {
                                photos: {
                                    create: uploaded_1.map(function (url) { return ({ url: url }); }),
                                },
                            })),
                        })
                            .then(function (res) {
                            resolve(res);
                        })
                            .catch(function (e) {
                            reject({ e: e, uploaded: uploaded_1 });
                        });
                    })];
                case 7:
                    updated = _d.sent();
                    if (updated.hasOwnProperty("id")) {
                        return [2 /*return*/, {
                                ok: true,
                            }];
                    }
                    else {
                        // { e: Error, uploaded: string[]}
                        // 만들기에 실패한 경우에는 업로드한 파일들 롤백.
                        throw updated;
                    }
                    return [3 /*break*/, 9];
                case 8:
                    e_1 = _d.sent();
                    // error handling -> 업로드된 사진이 있으면 삭제.
                    if (e_1.hasOwnProperty("uploaded")) {
                        // 업로드 파일 삭제.
                        if (e_1.uploaded && e_1.uploaded.length > 0) {
                            e_1.uploaded.forEach(function (photo) { return s3_1.removeFile(photo); });
                        }
                        return [2 /*return*/, {
                                ok: false,
                                error: e_1.e.message,
                            }];
                    }
                    else {
                        return [2 /*return*/, {
                                ok: false,
                                error: e_1.message,
                            }];
                    }
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
};
var removePhotoFromShop = function (_, _a, _b) {
    var id = _a.id, photoId = _a.photoId;
    var prisma = _b.prisma, loggedInUser = _b.loggedInUser;
    return __awaiter(void 0, void 0, void 0, function () {
        var photo, shop, result, e_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, prisma.coffeeShopPhoto.findUnique({
                            where: { id: photoId },
                            rejectOnNotFound: true,
                        })];
                case 1:
                    photo = _c.sent();
                    if (photo.shopId !== id) {
                        throw new Error("Permission Error: Cannot remove photo, because of photo not belongs to CoffeeShop:" + id);
                    }
                    return [4 /*yield*/, prisma.coffeeShop.findUnique({
                            where: { id: id },
                            rejectOnNotFound: true,
                        })];
                case 2:
                    shop = _c.sent();
                    if (shop.userId !== loggedInUser.id) {
                        throw new Error("Permission Error: Cannot edit not yours.");
                    }
                    return [4 /*yield*/, s3_1.removeFile(photo.url)];
                case 3:
                    result = _c.sent();
                    if (!result.ok) return [3 /*break*/, 5];
                    return [4 /*yield*/, prisma.coffeeShop.update({
                            where: { id: id },
                            data: { photos: { delete: { id: photoId } } },
                        })];
                case 4:
                    _c.sent();
                    return [2 /*return*/, {
                            ok: true,
                        }];
                case 5: throw new Error("Error: Cannot remove file from s3 bucket.");
                case 6: return [3 /*break*/, 8];
                case 7:
                    e_2 = _c.sent();
                    return [2 /*return*/, {
                            ok: false,
                            error: e_2.message,
                        }];
                case 8: return [2 /*return*/];
            }
        });
    });
};
var resolvers = {
    Mutation: {
        addPhotosToShop: users_utils_1.loginOnlyProtector(addPhotosToShop),
        removePhotoFromShop: users_utils_1.loginOnlyProtector(removePhotoFromShop),
    },
};
exports.default = resolvers;
