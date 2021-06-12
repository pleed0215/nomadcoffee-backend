import { PAGE_SIZE } from "../prisma";
import { Resolvers, Resolver } from "../types";

// Category type의 shops. cursor based pagination.
const shops: Resolver = ({ id }, { lastId }, { prisma }) =>
  prisma.coffeeShop.findMany({
    take: PAGE_SIZE,
    skip: lastId ? 1 : 0,
    include: {
      photos: true,
      categories: true,
    },
    ...(lastId && { cursor: { id: lastId } }),
    where: { categories: { some: { id } } },
  });

// 입력된 slug와 일치하는 category를 리턴.
const seeCategory: Resolver = (_, { slug }, { prisma }) =>
  prisma.category.findFirst({ where: { slug } });

// Category type의 totalShops.
// Category 안에 몇 개의 coffee shop 레코드가 있는지 갯수를 알려줌.
const totalShops: Resolver = ({ id }, _, { prisma }) =>
  prisma.coffeeShop.count({ where: { categories: { some: { id } } } });

const seeCategories: Resolver = (_, { lastId }, { prisma }) =>
  prisma.category.findMany({
    take: PAGE_SIZE,
    skip: lastId ? 1 : 0,
    ...(lastId && { cursor: { id: lastId } }),
    orderBy: { name: "asc" },
  });

const searchCategoriesByTerm: Resolver = (_, { term }, { prisma }) =>
  prisma.category.findMany({
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

export const resolvers: Resolvers = {
  Category: {
    totalShops,
    shops,
  },
  Query: {
    seeCategory,
    seeCategories,
    searchCategoriesByTerm,
  },
};

export default resolvers;
