"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var searchShopsByUserId = function (_, _a, _b) {
    var id = _a.id;
    var prisma = _b.prisma;
    return prisma.coffeeShop.findMany({ where: { user: { id: id } } });
};
var resolvers = {
    Query: {
        searchShopsByUserId: searchShopsByUserId,
    },
};
