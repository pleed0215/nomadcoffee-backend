import { Resolver, Resolvers } from "../../types";
import { loginOnlyProtector } from "../../users/users.utils";
import { processSlugs } from "../shops.utils";

const addCategoriesToShop: Resolver = async (
  _,
  { id, categories },
  { prisma, loggedInUser }
) => {
  try {
    const shop = await prisma.coffeeShop.findUnique({
      where: { id },
      rejectOnNotFound: true,
    });
    if (shop.userId !== loggedInUser?.id) {
      throw new Error("Permission Error: Cannot edit not yours.");
    }
    if (categories.length === 0) {
      throw new Error("Input Error: Categories must be given.");
    }
    await prisma.coffeeShop.update({
      where: { id },
      data: {
        categories: {
          connectOrCreate: processSlugs(categories),
        },
      },
    });
    return {
      ok: true,
    };
  } catch (e) {
    return {
      ok: false,
      error: e.message,
    };
  }
};
const removeCategoryFromShop: Resolver = async (
  _,
  { id, slug },
  { prisma, loggedInUser }
) => {
  try {
    const shop = await prisma.coffeeShop.findUnique({
      where: { id },
      rejectOnNotFound: true,
    });
    if (shop.userId !== loggedInUser?.id) {
      throw new Error("Permission Error: Cannot edit not yours.");
    }
    const category = await prisma.category.findFirst({
      where: { slug, shops: { some: { id } } },
    });
    if (category) {
      await prisma.coffeeShop.update({
        where: { id },
        data: {
          categories: {
            disconnect: {
              slug,
            },
          },
        },
      });
      return {
        ok: true,
      };
    } else {
      throw new Error("Input Error: Slug you input is not on this shop.");
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
    addCategoriesToShop: loginOnlyProtector(addCategoriesToShop),
    removeCategoryFromShop: loginOnlyProtector(removeCategoryFromShop),
  },
};

export default resolvers;
