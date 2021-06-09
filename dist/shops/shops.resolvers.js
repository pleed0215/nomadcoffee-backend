"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_1 = require("../prisma");
var seeCoffeeShop = function (_, _a, _b) {
    var id = _a.id;
    var prisma = _b.prisma;
    return prisma.coffeeShop.findFirst({ where: { id: id } });
};
var seeCoffeeShops = function (_, _a, _b) {
    var lastId = _a.lastId;
    var prisma = _b.prisma;
    return prisma.coffeeShop.findMany({
        take: prisma_1.PAGE_SIZE,
        skip: lastId ? 1 : 0,
        cursor: { id: lastId },
        orderBy: { createdAt: "desc" },
    });
};
var resolvers = {
    Query: {
        seeCoffeeShop: seeCoffeeShop,
        seeCoffeeShops: seeCoffeeShops,
    },
};
exports.default = resolvers;
