import { Resolver, Resolvers } from "../../types";

const searchShopsByUserId: Resolver = (_, { id }, { prisma }) =>
  prisma.coffeeShop.findMany({ where: { user: { id } }, include: { categories: true} });

const resolvers: Resolvers = {
  Query: {
    searchShopsByUserId,
  },
};

export default resolvers;
