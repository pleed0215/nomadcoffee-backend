import { CoffeeShop } from ".prisma/client";
import { removeFile, uploadFile, UploadResult } from "../../shared/s3";
import { Resolver, Resolvers } from "../../types";
import { loginOnlyProtector } from "../../users/users.utils";

const addPhotosToShop: Resolver = async (
  _,
  { id, photos },
  { prisma, loggedInUser }
) => {
  try {
    const shop = await prisma.coffeeShop.findUnique({
      where: { id },
      rejectOnNotFound: true,
    });
    if (shop.userId !== loggedInUser.id) {
      throw new Error("Permission Error: Cannot edit not yours.");
    }
    if (!photos || photos.length === 0) {
      throw new Error("Input Error: At least one photo needed.");
    }
    let uploaded: string[] = [];
    if (photos && photos.length > 0) {
      // forEach로 하면 에러 핸들링에 문제가 있어서 for문 사용.
      for (const photo of photos) {
        const result = await uploadFile(await photo);
        if (result.ok) {
          if (result.url) {
            uploaded.push(result.url);
          }
        } else {
          throw { e: new Error(result.error), uploaded };
        }
      }
    }
    const updated = await new Promise<
      CoffeeShop | { e: any; uploaded: string[] }
    >((resolve, reject) => {
      prisma.coffeeShop
        .update({
          where: { id },
          data: {
            ...(uploaded.length > 0 && {
              photos: {
                create: uploaded.map((url) => ({ url })),
              },
            }),
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject({ e, uploaded });
        });
    });

    if (updated.hasOwnProperty("id")) {
      return {
        ok: true,
      };
    } else {
      // { e: Error, uploaded: string[]}
      // 만들기에 실패한 경우에는 업로드한 파일들 롤백.
      throw updated;
    }
  } catch (e) {
    // error handling -> 업로드된 사진이 있으면 삭제.
    if (e.hasOwnProperty("uploaded")) {
      // 업로드 파일 삭제.
      if (e.uploaded && e.uploaded.length > 0) {
        e.uploaded.forEach((photo) => removeFile(photo));
      }
      return {
        ok: false,
        error: e.e.message,
      };
    } else {
      return {
        ok: false,
        error: e.message,
      };
    }
  }
};
const removePhotoFromShop: Resolver = async (
  _,
  { id, photoId },
  { prisma, loggedInUser }
) => {
  try {
    const photo = await prisma.coffeeShopPhoto.findUnique({
      where: { id: photoId },
      rejectOnNotFound: true,
    });
    if (photo.shopId !== id) {
      throw new Error(
        `Permission Error: Cannot remove photo, because of photo not belongs to CoffeeShop:${id}`
      );
    }
    const shop = await prisma.coffeeShop.findUnique({
      where: { id },
      rejectOnNotFound: true,
    });
    if (shop.userId !== loggedInUser.id) {
      throw new Error("Permission Error: Cannot edit not yours.");
    }
    const result = await removeFile(photo.url);
    if (result.ok) {
      await prisma.coffeeShop.update({
        where: { id },
        data: { photos: { delete: { id: photoId } } },
      });

      return {
        ok: true,
      };
    } else {
      throw new Error("Error: " + result.error);
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
    addPhotosToShop: loginOnlyProtector(addPhotosToShop),
    removePhotoFromShop: loginOnlyProtector(removePhotoFromShop),
  },
};

export default resolvers;
