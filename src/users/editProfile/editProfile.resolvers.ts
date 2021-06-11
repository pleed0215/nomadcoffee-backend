import { Resolver, Resolvers } from "./../../types.d";
import * as bcrypt from "bcrypt";

import { loginOnlyProtector } from "../users.utils";
import { uploadFile } from "../../shared/s3";

const resolvedFn: Resolver = async (
  _,
  { id, username, email, name, password, location, githubUsername },
  { loggedInUser, prisma }
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      rejectOnNotFound: true,
    });

    if (user.id !== loggedInUser?.id) {
      throw Error("Permission Error: Cannot Edit other's profile.");
    }

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    const data = {
      ...(username && { username }),
      ...(email && { email }),
      ...(password && { password: hashedPassword }),
      ...(name && { name }),
      ...(location && { location }),
      ...(githubUsername && { githubUsername }),
    };
    await prisma.user.update({
      where: { id },
      data,
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
};

const updateAvatar: Resolver = async (
  _,
  { file },
  { prisma, loggedInUser }
) => {
  try {
    const uploaded = await uploadFile(await file);
    if (uploaded.ok && loggedInUser) {
      await prisma.user.update({
        where: {
          id: loggedInUser?.id,
        },
        data: {
          avatarURL: uploaded.url,
        },
      });
      return {
        ok: true,
      };
    } else {
      throw new Error("Failed to upload to s3.");
    }
  } catch (e) {
    return {
      ok: false,
      error: e.message,
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    editProfile: loginOnlyProtector(resolvedFn),
    updateAvatar: loginOnlyProtector(updateAvatar),
  },
};

export default resolvers;
