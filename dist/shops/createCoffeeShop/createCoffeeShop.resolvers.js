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
    var name = _a.name, categories = _a.categories, lat = _a.lat, lng = _a.lng, photos = _a.photos;
    var prisma = _b.prisma, loggedInUser = _b.loggedInUser;
    return __awaiter(void 0, void 0, void 0, function () {
        var _c, slugsInput_1, uploaded_1, _i, photos_1, photo, result, _d, created, e_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 8, , 9]);
                    _c = Boolean;
                    return [4 /*yield*/, prisma.coffeeShop.findFirst({
                            where: { userId: loggedInUser.id },
                        })];
                case 1:
                    /* TODO Step
                        [v] Processing slug
                            - 소문자여야함.
                            - trim하여 양 옆에 공백 제거 후, 문자 중간의 공백은 '-'으로 바꿈.
                            - 여러개의 공백이 중간에 있을 때에는 한개로 바꾼다.
                        [v] Setting up Upload
                            1) S3 setting
                            2) Graphql Upload setting
                        [v] Files Upload on S3
                            - 레코드 만들기에 실패하면 업로드한 파일은 삭제해야 함
                        [v] Create coffee shop records.
                          - 1) 슬러그 만들기.
                          - 2) 파일 업로드하기.
                          - 3) 레코드 만들기
                    */
                    // CoffeeShop - User 1:1 관계로 설정해 놓았음.
                    // 이미 CoffeShop 관계가 존재하면, throw error.
                    if (_c.apply(void 0, [_e.sent()])) {
                        throw new Error("Already Exist");
                    }
                    // Category가 적어도 한 개 있어야 함.
                    if (categories.length === 0) {
                        throw new Error("Input Error: Need cateogires to create coffee shop.");
                    }
                    slugsInput_1 = shops_utils_1.processSlugs(categories);
                    uploaded_1 = [];
                    if (!(photos && photos.length > 0)) return [3 /*break*/, 6];
                    _i = 0, photos_1 = photos;
                    _e.label = 2;
                case 2:
                    if (!(_i < photos_1.length)) return [3 /*break*/, 6];
                    photo = photos_1[_i];
                    _d = s3_1.uploadFile;
                    return [4 /*yield*/, photo];
                case 3: return [4 /*yield*/, _d.apply(void 0, [_e.sent()])];
                case 4:
                    result = _e.sent();
                    if (result.ok) {
                        if (result.url) {
                            uploaded_1.push(result.url);
                        }
                    }
                    else {
                        throw { e: new Error(result.error), uploaded: uploaded_1 };
                    }
                    _e.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        prisma.coffeeShop
                            .create({
                            data: __assign({ name: name,
                                lat: lat,
                                lng: lng, categories: {
                                    connectOrCreate: slugsInput_1,
                                }, user: {
                                    connect: {
                                        id: loggedInUser.id,
                                    },
                                } }, (uploaded_1.length > 0 && {
                                photos: {
                                    create: uploaded_1.map(function (url) { return ({ url: url }); }),
                                },
                            })),
                        })
                            .then(function (res) {
                            // create 정상적으로 되었다면 만들어진 record를 resolve
                            resolve(res);
                        })
                            .catch(function (e) {
                            // create가 정상적으로 안되었으면, {e, uploaded} 형태로 리턴해주어 throw 하도록..
                            reject({ e: e, uploaded: uploaded_1 });
                        });
                    })];
                case 7:
                    created = _e.sent();
                    // id가 들어있다는 의미는 create가 정상적으로 CoffeeShop 레코드를 받았다는 것..
                    // 아니면 에러를 포함하는 것이니.. 에러 처리.
                    if (created.hasOwnProperty("id")) {
                        return [2 /*return*/, {
                                ok: true,
                                id: created["id"],
                            }];
                    }
                    else {
                        // { e: Error, uploaded: string[]}
                        // 만들기에 실패한 경우에는 업로드한 파일들 롤백.
                        throw created;
                    }
                    return [3 /*break*/, 9];
                case 8:
                    e_1 = _e.sent();
                    // 작동 여부 확인 못함..
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
var resolvers = {
    Mutation: {
        createCoffeeShop: users_utils_1.loginOnlyProtector(createCoffeeShop),
    },
};
exports.default = resolvers;
