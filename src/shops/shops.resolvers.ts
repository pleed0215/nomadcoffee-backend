import { PAGE_SIZE } from "../prisma";
import { loginOnlyProtector } from "../users/users.utils";
import { Resolvers, Resolver } from "./../types.d";

const seeCoffeeShop: Resolver = (_, { id }, { prisma }) =>
  prisma.coffeeShop.findFirst({
    where: { id },
    include: { categories: true },
  });

const seeCoffeeShops: Resolver = (_, { lastId }, { prisma }) =>
  prisma.coffeeShop.findMany({
    take: PAGE_SIZE,
    skip: lastId ? 1 : 0,
    cursor: { id: lastId },
    orderBy: { createdAt: "desc" },
    include: {
      categories: true,
    },
  });

const firstPhotoUrl: Resolver = async ({ id }, _, { prisma }) => {
  const photos = await prisma.coffeeShop
    .findFirst({ where: { id } })
    .photos({ take: 1 });
  if (photos.length !== 0) {
    return photos[0].url;
  } else {
    return null;
  }
};

const isMine: Resolver = async ({ user }, _, { prisma, loggedInUser }) =>
  user.id === loggedInUser.id;

const photos: Resolver = async ({ id }, { lastId }, { prisma }) =>
  prisma.coffeeShopPhoto.findMany({
    where: { shopId: id },
    take: PAGE_SIZE,
    skip: lastId ? 1 : 0,
    ...(lastId && { cursor: { id: lastId } }),
  });

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShop,
    seeCoffeeShops,
  },
  CoffeeShop: {
    firstPhotoUrl,
    photos,
    isMine: loginOnlyProtector(isMine),
  },
};

export default resolvers;
