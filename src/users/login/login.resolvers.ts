import { Resolvers } from "./../../types.d";
import { SECRET_DEV } from "./../users.utils";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { email, password }, { prisma }) => {
      try {
        const user = await prisma.user.findUnique({
          where: { email },
          rejectOnNotFound: true,
        });

        const canAuth = await bcrypt.compare(password, user.password);
        if (canAuth) {
          const token = await jwt.sign(
            { id: user.id },
            process.env.NODE_ENV === "production"
              ? process.env.SECRET_KEY
              : SECRET_DEV
          );
          return {
            ok: true,
            token,
          };
        } else {
          throw Error("Invalid password. Check again please.");
        }
      } catch (e) {
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};

export default resolvers;
