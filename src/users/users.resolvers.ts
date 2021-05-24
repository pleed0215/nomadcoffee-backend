import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Query: {
    seeUser: async (root, { id }, { prisma }) => {
      const user = await prisma.user.findUnique({ where: { id } });
      return user;
    },
  },
};

export default resolvers;
