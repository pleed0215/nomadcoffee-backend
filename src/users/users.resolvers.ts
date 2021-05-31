import { PAGE_SIZE } from "../prisma";
import { Resolvers } from "../types";
import { loginOnlyProtector } from "./users.utils";

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
    isMe: ({ id }, _, { loggedInUser }) => loggedInUser.id === id,
    totalFollowers: ({ id }, _, { prisma }) =>
      prisma.user.count({ where: { followings: { some: { id } } } }),
    totalFollowings: ({ id }, _, { prisma }) =>
      prisma.user.count({ where: { followers: { some: { id } } } }),
    isFollowing: loginOnlyProtector(
      async ({ id }, _, { loggedInUser, prisma }) =>
        Boolean(
          await prisma.user.findFirst({
            where: { id: loggedInUser.id, followings: { some: { id } } },
          })
        )
    ),
    isFollowed: loginOnlyProtector(
      async ({ id }, _, { loggedInUser, prisma }) =>
        Boolean(
          await prisma.user.findFirst({
            where: { id: loggedInUser.id, followers: { some: { id } } },
          })
        )
    ),
  },

  Query: {
    seeUser: (_, { id }, { prisma }) =>
      prisma.user.findUnique({ where: { id } }),
    me: loginOnlyProtector((_, __, { loggedInUser }) => loggedInUser),
  },
};

export default resolvers;
