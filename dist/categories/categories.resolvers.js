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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var prisma_1 = require("../prisma");
// Category type의 shops. cursor based pagination.
var shops = function (_a, _b, _c) {
    var id = _a.id;
    var lastId = _b.lastId;
    var prisma = _c.prisma;
    return prisma.coffeeShop.findMany(__assign(__assign({ take: prisma_1.PAGE_SIZE, skip: lastId ? 1 : 0, include: {
            photos: true,
        } }, (lastId && { cursor: { id: lastId } })), { where: { categories: { some: { id: id } } } }));
};
// 입력된 slug와 일치하는 category를 리턴.
var seeCategory = function (_, _a, _b) {
    var slug = _a.slug, lastId = _a.lastId;
    var prisma = _b.prisma;
    return prisma.category.findFirst({ where: { slug: slug } }).shops(__assign({ orderBy: {
            createdAt: "desc",
        }, include: {
            photos: true,
            categories: true,
        }, take: prisma_1.PAGE_SIZE, skip: lastId ? 1 : 0 }, (lastId && { cursor: { id: lastId } })));
};
// Category type의 totalShops.
// Category 안에 몇 개의 coffee shop 레코드가 있는지 갯수를 알려줌.
var totalShops = function (_a, _, _b) {
    var id = _a.id;
    var prisma = _b.prisma;
    return prisma.coffeeShop.count({ where: { categories: { some: { id: id } } } });
};
var seeCategories = function (_, _a, _b) {
    var lastId = _a.lastId;
    var prisma = _b.prisma;
    return prisma.category.findMany(__assign(__assign({ take: prisma_1.PAGE_SIZE, skip: lastId ? 1 : 0 }, (lastId && { cursor: { id: lastId } })), { orderBy: { name: "asc" } }));
};
var searchCategoriesByTerm = function (_, _a, _b) {
    var term = _a.term;
    var prisma = _b.prisma;
    return prisma.category.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: term,
                        mode: "insensitive",
                    },
                },
                {
                    slug: {
                        contains: term,
                        mode: "insensitive",
                    },
                },
            ],
        },
    });
};
exports.resolvers = {
    Category: {
        totalShops: totalShops,
        shops: shops,
    },
    Query: {
        seeCategory: seeCategory,
        seeCategories: seeCategories,
        searchCategoriesByTerm: searchCategoriesByTerm,
    },
};
exports.default = exports.resolvers;
