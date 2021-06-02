require("dotenv").config();
import * as http from "http";
import * as express from "express";
import * as logger from "morgan";
import * as cors from "cors";

import { ApolloServer } from "apollo-server-express";

import { schema } from "./schema";
import { prisma } from "./prisma";

import { getUser } from "./users/users.utils";

const app = express();
const httpServer = http.createServer(app);
const PORT = +process.env.PORT || 4000;

const main = async () => {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers["x-jwt"]),
        prisma,
      };
    },
    //playground: process.env.NODE_ENV !== "production",
    playground: true,
    introspection: true,
  });
  app.use(logger("tiny"));
  app.use("/static", express.static("/uploads"));
  app.use(cors());
  server.applyMiddleware({ app });

  httpServer.listen({ port: PORT, url: "/graphql" }, () => {
    console.log(`🚀 Server ready at ${PORT}`);
  });
};

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => await prisma.$disconnect());
