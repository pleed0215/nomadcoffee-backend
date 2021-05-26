import { getUser } from "./users/users.utils";
require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { prisma } from "./prisma";

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers["x-jwt"]),
      prisma,
    };
  },
});

const PORT = +process.env.PORT || 4000;

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
