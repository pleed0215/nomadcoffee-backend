import { loginOnlyProtector } from "./../../users/users.utils";
import { Resolvers, Resolver } from "./../../types.d";

const deleteCoffeeShop: Resolver = async (
  _,
  { id },
  { prisma, loggedInUser }
) => {
  try {
    const shop = await prisma.coffeeShop.findUnique({
      where: { id },
      rejectOnNotFound: true,
    });
    if (shop) {
      if (shop.userId !== loggedInUser.id) {
        throw new Error("Permission Error: You cannot delete not yours.");
      }
      await prisma.coffeeShopPhoto.deleteMany({
        where: {
          shop: {
            id,
          },
        },
      });
      await prisma.coffeeShop.delete({
        where: {
          id,
        },
      });
      return {
        ok: true,
      };
    } else {
      throw new Error("Fetching Shop error");
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
    deleteCoffeeShop: loginOnlyProtector(deleteCoffeeShop),
  },
};
export default resolvers;
