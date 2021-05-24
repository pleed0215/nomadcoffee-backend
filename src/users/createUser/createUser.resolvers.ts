import { prisma } from "../../prisma";

export default {
  Mutation: {
    createUser: async (root, { username, email }) => {
      try {
        const user = await prisma.user.create({
          data: {
            username,
            email,
          },
        });
        return {
          ok: true,
          id: user.id,
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};
