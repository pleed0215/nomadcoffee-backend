"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var searchShopsByUserId = function (_, _a, _b) {
    var id = _a.id;
    var prisma = _b.prisma;
    return prisma.coffeeShop.findMany({
        where: { user: { id: id } },
        include: { categories: true },
    });
};
var searchShopsByTerm = function (_, _a, _b) {
    var term = _a.term;
    var prisma = _b.prisma;
    return prisma.coffeeShop.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: term,
                        mode: "insensitive",
                    },
                },
                {
                    address: {
                        contains: term,
                        mode: "insensitive",
                    },
                },
                {
                    categories: {
                        some: {
                            name: {
                                contains: term,
                                mode: "insensitive",
                            },
                        },
                    },
                },
            ],
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            categories: true,
        },
    });
};
var resolvers = {
    Query: {
        searchShopsByUserId: searchShopsByUserId,
        searchShopsByTerm: searchShopsByTerm,
    },
};
exports.default = resolvers;
