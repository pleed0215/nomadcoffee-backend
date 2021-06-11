import { Resolver, Resolvers } from "../../types";
import { loginOnlyProtector } from "../users.utils";

// 로그인 한자만 가능하도록. Mutation에는 loginOnlyResolve추가.
const toggleFollow: Resolver = async (
  _,
  { userId },
  { loggedInUser, prisma }
) => {
  try {
    // 자기자신과 follow relation 실행 안되도록..
    if (userId === loggedInUser?.id) {
      throw new Error("Cannot perform follow relation with self.");
    }
    // 이미 following / follower 관계인지 ...
    const alreadyFollowing = await prisma.user.findFirst({
      where: {
        id: userId,
        followers: {
          some: {
            id: loggedInUser?.id,
          },
        },
      },
    });

    // 이미 following
    if (alreadyFollowing) {
      await prisma.user.update({
        where: {
          id: loggedInUser?.id,
        },
        data: {
          followings: {
            disconnect: {
              id: userId,
            },
          },
        },
      });
      return {
        ok: true,
        followed: false,
        message: `Unfollowing User: ${userId}`,
      };
    } else {
      // following 관계가 아님.
      await prisma.user.update({
        where: {
          id: loggedInUser?.id,
        },
        data: {
          followings: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return {
        ok: true,
        followed: true,
        message: `Following User: ${userId}`,
      };
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
    toggleFollow: loginOnlyProtector(toggleFollow),
  },
};

export default resolvers;
