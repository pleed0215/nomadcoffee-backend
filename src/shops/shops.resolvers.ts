import { PAGE_SIZE } from "../prisma";
import { Resolvers, Resolver } from "./../types.d";

const seeCoffeeShop: Resolver = (_, { id }, { prisma }) =>
  prisma.coffeeShop.findFirst({ where: { id } });

const seeCoffeeShops: Resolver = (_, { lastId }, { prisma }) =>
  prisma.coffeeShop.findMany({
    take: PAGE_SIZE,
    skip: lastId ? 1 : 0,
    cursor: { id: lastId },
    orderBy: { createdAt: "desc" },
  });

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShop,
    seeCoffeeShops,
  },
};

export default resolvers;
