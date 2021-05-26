import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Query: {
    seeProfile: async (_, { id }, { prisma }) => {
      const user = await prisma.user.findUnique({ where: { id } });
      return user;
    },
  },
};

export default resolvers;
