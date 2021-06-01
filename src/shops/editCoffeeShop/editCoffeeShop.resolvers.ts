import { CoffeeShop } from ".prisma/client";
import { removeFile, uploadFile, UploadResult } from "../../shared/s3";
import { Resolvers, Resolver } from "../../types";
import { loginOnlyProtector } from "../../users/users.utils";
import { processSlugs } from "../shops.utils";

const editCoffeeShop: Resolver = async (
  _,
  { id, name, lat, lng, categories, photos },
  { prisma, loggedInUser }
) => {
  try {
    /*
        고려할 점
        1. editCoffeeShop에 입력 받은 카테고리나, 사진 정보를 외에 기존의 데이터를 어떡할 것인가..
          1) editCoffeeShop 입력 받은 data로 대체.
          or
          2) editCoffeeShop에서 입력 받은 data는 추가.
        2. editCoffeeShop의 기능이 좀 적다. category나 photo를 delete하고 싶은 경우는..?

        --> 결론
        editCoffeeShop에 입력 받은 내용은 category나 photos는 추가만 한다.
        addCategoryToShop, removeCategoryFromShop,
        addPhotoToShop, removeCategoryFropShop resolver를 추가한다.
     */
    const shop = await prisma.coffeeShop.findUnique({
      where: { id },
      rejectOnNotFound: true,
    });
    if (shop.userId !== loggedInUser.id) {
      throw new Error("Permission Error: Cannot edit not yours.");
    }

    // createCoffessShop.resolvers.ts 56 복붙.
    let uploaded: string[] = [];
    if (photos && photos.length > 0) {
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

    // update할 data
    const data = {
      ...(name && { name }),
      ...(lat && { lat }),
      ...(lng && { lng }),
      ...(categories &&
        categories.length > 0 && {
          categories: {
            connectOrCreate: processSlugs(categories),
          },
        }),
      ...(uploaded.length > 0 && {
        photos: {
          create: uploaded.map((url) => ({ url })),
        },
      }),
    };
    // update 성공 -> ok: true, id 같이 리턴.
    // update 실패 -> error와 만들어진 uploaded를 같이 throw.
    const updated = await new Promise<
      CoffeeShop | { e: any; uploaded: UploadResult[] }
    >((resolve, reject) => {
      prisma.coffeeShop
        .update({
          where: { id },
          data,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          // create가 정상적으로 안되었으면, {e, uploaded} 형태로 리턴해주어 throw 하도록..
          reject({ e, uploaded });
        });
    });

    // createCoffeeShop과 같은 로직.
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

const resolvers: Resolvers = {
  Mutation: {
    editCoffeeShop: loginOnlyProtector(editCoffeeShop),
  },
};

export default resolvers;
