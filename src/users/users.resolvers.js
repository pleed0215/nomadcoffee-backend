import { prisma } from "../prisma";

export default {
  Query: {
    seeUser: async (root, { id }) => {
      const user = await prisma.user.findUnique({ where: { id } });
      return user;
    },
  },
};
