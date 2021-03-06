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
var users_utils_1 = require("./../../users/users.utils");
var shops_utils_1 = require("../shops.utils");
var s3_1 = require("../../shared/s3");
/*...(uploaded.length > 0 && {
  photos: {
    create: uploaded.map((photo) => ({ url: photo.url })),
  },
}),*/
var createCoffeeShop = function (_, _a, _b) {
    var name = _a.name, categories = _a.categories, lat = _a.lat, lng = _a.lng, photos = _a.photos, address = _a.address;
    var prisma = _b.prisma, loggedInUser = _b.loggedInUser;
    return __awaiter(void 0, void 0, void 0, function () {
        var slugsInput_1, uploaded_1, _i, photos_1, photo, result, _c, created, e_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 7, , 8]);
                    /* TODO Step
                        [v] Processing slug
                            - ??????????????????.
                            - trim?????? ??? ?????? ?????? ?????? ???, ?????? ????????? ????????? '-'?????? ??????.
                            - ???????????? ????????? ????????? ?????? ????????? ????????? ?????????.
                        [v] Setting up Upload
                            1) S3 setting
                            2) Graphql Upload setting
                        [v] Files Upload on S3
                            - ????????? ???????????? ???????????? ???????????? ????????? ???????????? ???
                        [v] Create coffee shop records.
                          - 1) ????????? ?????????.
                          - 2) ?????? ???????????????.
                          - 3) ????????? ?????????
                    */
                    // CoffeeShop - User 1:1 ????????? ????????? ?????????.
                    // ?????? CoffeShop ????????? ????????????, throw error.
                    // ????????? ?????? 1:n ????????? ??????.. 2021.6.9
                    /*if (
                      Boolean(
                        await prisma.coffeeShop.findFirst({
                          where: { userId: loggedInUser?.id },
                        })
                      )
                    ) {
                      throw new Error("Already Exist");
                    }*/
                    // Category??? ????????? ??? ??? ????????? ???.
                    if (categories.length === 0) {
                        throw new Error("Input Error: Need cateogires to create coffee shop.");
                    }
                    slugsInput_1 = shops_utils_1.processSlugs(categories);
                    uploaded_1 = [];
                    if (!(photos && photos.length > 0)) return [3 /*break*/, 5];
                    _i = 0, photos_1 = photos;
                    _d.label = 1;
                case 1:
                    if (!(_i < photos_1.length)) return [3 /*break*/, 5];
                    photo = photos_1[_i];
                    _c = s3_1.uploadFile;
                    return [4 /*yield*/, photo];
                case 2: return [4 /*yield*/, _c.apply(void 0, [_d.sent()])];
                case 3:
                    result = _d.sent();
                    if (result.ok) {
                        if (result.url) {
                            uploaded_1.push(result.url);
                        }
                    }
                    else {
                        throw { e: new Error(result.error), uploaded: uploaded_1 };
                    }
                    _d.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        prisma.coffeeShop
                            .create({
                            data: __assign({ name: name,
                                lat: lat,
                                lng: lng,
                                address: address, categories: {
                                    connectOrCreate: slugsInput_1,
                                }, user: {
                                    connect: {
                                        id: loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.id,
                                    },
                                } }, (uploaded_1.length > 0 && {
                                photos: {
                                    create: uploaded_1.map(function (url) { return ({ url: url }); }),
                                },
                            })),
                        })
                            .then(function (res) {
                            // create ??????????????? ???????????? ???????????? record??? resolve
                            resolve(res);
                        })
                            .catch(function (e) {
                            // create??? ??????????????? ???????????????, {e, uploaded} ????????? ??????????????? throw ?????????..
                            reject({ e: e, uploaded: uploaded_1 });
                        });
                    })];
                case 6:
                    created = _d.sent();
                    // id??? ??????????????? ????????? create??? ??????????????? CoffeeShop ???????????? ???????????? ???..
                    // ????????? ????????? ???????????? ?????????.. ?????? ??????.
                    if (created.hasOwnProperty("id")) {
                        return [2 /*return*/, {
                                ok: true,
                                id: created["id"],
                            }];
                    }
                    else {
                        // { e: Error, uploaded: string[]}
                        // ???????????? ????????? ???????????? ???????????? ????????? ??????.
                        throw created;
                    }
                    return [3 /*break*/, 8];
                case 7:
                    e_1 = _d.sent();
                    // ?????? ?????? ?????? ??????..
                    if (e_1.hasOwnProperty("uploaded")) {
                        // ????????? ?????? ??????.
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
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
};
var resolvers = {
    Mutation: {
        createCoffeeShop: users_utils_1.loginOnlyProtector(createCoffeeShop),
    },
};
exports.default = resolvers;
