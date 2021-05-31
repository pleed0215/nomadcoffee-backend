import { PAGE_SIZE } from "../prisma";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  User: {
    followers: ({ id }, { page }, { prisma }) =>
      prisma.user.findFirst({ where: { id } }).followers({
        take: PAGE_SIZE,
        skip: page ? (page - 1) * PAGE_SIZE : 0,
        //...(lastId && { cursor: { id: lastId } }),
        orderBy: { id: "asc" },
      }),
    followings: ({ id }, { page }, { prisma }) =>
      prisma.user.findFirst({ where: { id } }).followings({
        take: PAGE_SIZE,
        skip: page ? (page - 1) * PAGE_SIZE : 0,
        //...(lastId && { cursor: { id: lastId } }),
        orderBy: { id: "asc" },
      }),
  },

  Query: {
    seeUser: (_, { id }, { prisma }) =>
      prisma.user.findUnique({ where: { id } }),
  },
};

export default resolvers;
