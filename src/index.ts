require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { prisma } from "./prisma";

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: null,
      prisma,
    };
  },
});

const PORT = +process.env.PORT || 4000;

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
