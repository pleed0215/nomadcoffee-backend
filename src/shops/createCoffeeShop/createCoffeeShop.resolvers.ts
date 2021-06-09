import { loginOnlyProtector } from "./../../users/users.utils";
import { Resolvers, Resolver } from "./../../types.d";

import { processSlugs } from "../shops.utils";
import { uploadFile, UploadResult, removeFile } from "../../shared/s3";
import { CoffeeShop } from "@prisma/client";

/*...(uploaded.length > 0 && {
  photos: {
    create: uploaded.map((photo) => ({ url: photo.url })),
  },
}),*/

const createCoffeeShop: Resolver = async (
  _,
  { name, categories, lat, lng, photos },
  { prisma, loggedInUser }
) => {
  try {
    /* TODO Step 
        [v] Processing slug
            - 소문자여야함.
            - trim하여 양 옆에 공백 제거 후, 문자 중간의 공백은 '-'으로 바꿈.
            - 여러개의 공백이 중간에 있을 때에는 한개로 바꾼다.
        [v] Setting up Upload
            1) S3 setting
            2) Graphql Upload setting
        [v] Files Upload on S3
            - 레코드 만들기에 실패하면 업로드한 파일은 삭제해야 함
        [v] Create coffee shop records.
          - 1) 슬러그 만들기.
          - 2) 파일 업로드하기.
          - 3) 레코드 만들기
    */

    // CoffeeShop - User 1:1 관계로 설정해 놓았음.
    // 이미 CoffeShop 관계가 존재하면, throw error.
    // 혹시나 해서 1:n 관계로 바꿈.. 2021.6.9
    /*if (
      Boolean(
        await prisma.coffeeShop.findFirst({
          where: { userId: loggedInUser.id },
        })
      )
    ) {
      throw new Error("Already Exist");
    }*/

    // Category가 적어도 한 개 있어야 함.
    if (categories.length === 0) {
      throw new Error("Input Error: Need cateogires to create coffee shop.");
    }

    // 입력 받은 category들을 object 배열로 만들어서 relation 연결 또는 생성+연결.
    const slugsInput = processSlugs(categories);

    // 파일 업로드. photos가 제공될 때만 업로드 로직 들어감.
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

    // create 성공 -> ok: true, id 같이 리턴.
    // create 실패 -> error와 만들어진 uploaded를 같이 throw.
    const created = await new Promise<
      CoffeeShop | { e: any; uploaded: string[] }
    >((resolve, reject) => {
      prisma.coffeeShop
        .create({
          data: {
            name,
            lat,
            lng,
            categories: {
              connectOrCreate: slugsInput,
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(uploaded.length > 0 && {
              photos: {
                create: uploaded.map((url) => ({ url })),
              },
            }),
          },
        })
        .then((res) => {
          // create 정상적으로 되었다면 만들어진 record를 resolve
          resolve(res);
        })
        .catch((e) => {
          // create가 정상적으로 안되었으면, {e, uploaded} 형태로 리턴해주어 throw 하도록..
          reject({ e, uploaded });
        });
    });

    // id가 들어있다는 의미는 create가 정상적으로 CoffeeShop 레코드를 받았다는 것..
    // 아니면 에러를 포함하는 것이니.. 에러 처리.
    if (created.hasOwnProperty("id")) {
      return {
        ok: true,
        id: created["id"],
      };
    } else {
      // { e: Error, uploaded: string[]}
      // 만들기에 실패한 경우에는 업로드한 파일들 롤백.
      throw created;
    }
  } catch (e) {
    // 작동 여부 확인 못함..
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
    createCoffeeShop: loginOnlyProtector(createCoffeeShop),
  },
};

export default resolvers;
