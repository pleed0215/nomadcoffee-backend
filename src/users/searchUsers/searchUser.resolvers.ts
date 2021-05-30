import { PAGE_SIZE } from "../../prisma";
import { Resolvers, Resolver } from "./../../types.d";
import { WhereUserInput } from "prisma";
const searchUsers: Resolver = async (_, { term, lastId }, { prisma }) => {
  try {
    const whereUserInput: WhereUserInput = {
      OR: [
        {
          username: {
            contains: term,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: term,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: term,
            mode: "insensitive",
          },
        },
      ],
    };
    const total = await prisma.user.count({
      where: whereUserInput,
    });
    const results = await prisma.user.findMany({
      where: whereUserInput,
      take: PAGE_SIZE,
      skip: lastId ? 1 : 0,
      ...(lastId && { cursor: { id: lastId } }),
    });
    return {
      total,
      results,
    };
  } catch (e) {
    throw new Error(e);
  }
};

const resolvers: Resolvers = {
  Query: {
    searchUsers,
  },
};

export default resolvers;
