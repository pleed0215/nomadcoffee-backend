import { Resolver, Resolvers } from "../../types";

const searchShopsByUserId: Resolver = (_, { id }, { prisma }) =>
  prisma.coffeeShop.findMany({
    where: { user: { id } },
    include: { categories: true },
  });

const searchShopsByTerm: Resolver = (_, { term }, { prisma }) =>
  prisma.coffeeShop.findMany({
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

const resolvers: Resolvers = {
  Query: {
    searchShopsByUserId,
    searchShopsByTerm,
  },
};

export default resolvers;
