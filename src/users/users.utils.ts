import { Context, Resolver } from "./../types.d";
import * as jwt from "jsonwebtoken";
import { prisma } from "../prisma";

export const SECRET_DEV = "8afd3f57-5bb7-459a-94fa-c8b588a28f72";

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }
    // typescript jwt.verify type error 관련..
    // https://stackoverflow.com/questions/50735675/typescript-jwt-verify-cannot-access-data
    type TokenType = {
      id: string;
    };
    const key =
      process.env.NODE_ENV === "production"
        ? process.env.SECRET_KEY!
        : SECRET_DEV;
    const decoded = jwt.verify(token, key) as TokenType;

    if (typeof decoded === "object" && decoded.hasOwnProperty("id")) {
      const user = await prisma.user.findUnique({
        where: { id: +decoded["id"] },
      });
      return user;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

type ProtectedResolver = (resolvedFn: Resolver) => Resolver;
export const loginOnlyProtector: ProtectedResolver = (
  ourResolver: Resolver
) => {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      const isQuery = info.operation.operation === "query";

      if (isQuery) {
        return null;
      } else {
        return {
          ok: false,
          error: "Permission Error",
        };
      }
    }
    return ourResolver(root, args, context, info);
  };
};
