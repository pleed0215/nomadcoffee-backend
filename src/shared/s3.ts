import * as AWS from "aws-sdk";
import * as fs from "fs";

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: Function;
}

export interface RemoveResult {
  ok: boolean;
  error?: string;
}

export interface UploadResult extends RemoveResult {
  url?: string;
}

const BUCKET_NAME = "nomadcoffee";

export const uploadFile = async (file: FileUpload): Promise<UploadResult> => {
  try {
    // credential config.
    if (process.env.AWS_ACCESS && process.env.AWS_SECRET) {
      AWS.config.update({
        credentials: {
          accessKeyId: process.env.AWS_ACCESS,
          secretAccessKey: process.env.AWS_SECRET,
        },
      });

      // s3-upload-stream package, WriteStream for S3
      // https://www.npmjs.com/package/s3-upload-stream
      const s3Stream = require("s3-upload-stream")(new AWS.S3());

      const { filename, createReadStream } = file;
      const readStream: fs.ReadStream = createReadStream();

      const objectName = `${Date.now()}_${filename}`;
      /* s3-upload-stream을 사용하지 않고서는 AWS.S3.upload({
        ...,
        Body: readStream
      })
      이렇게 해도 되는 모양이다. 
      https://nomadcoders.co/instaclone/lectures/2463 6:33
      */
      const upload = s3Stream.upload({
        Bucket: BUCKET_NAME,
        Key: objectName,
        ACL: "public-read",
      });

      readStream.pipe(upload);

      // handle events for s3-upload-stream
      // 업로드 끝날때까지 ... 기둘리기.
      const end = new Promise<string | null>((resolve, reject) => {
        upload.on("error", () => {
          reject(new Error("Error occured on file uploading"));
        });

        upload.on("uploaded", (details) => {
          resolve(details.Location);
        });
      });
      const url = await end;
      if (url && typeof url === "string") {
        return {
          ok: true,
          ...(url && { url }),
        };
      } else {
        throw url;
      }
    } else {
      throw new Error("AWS Credential failed");
    }
  } catch (e) {
    return {
      ok: false,
      error: e.message,
    };
  }
};

// url 구조 분석 정규표현식.
/*url: RegExp['$&'],
protocol:RegExp.$2,
host:RegExp.$3,
path:RegExp.$4,
file:RegExp.$6,
query:RegExp.$7,
hash:RegExp.$8*/
// from: https://stackoverflow.com/questions/27745/getting-parts-of-a-url-regex
const urlRegex =
  /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/g;

/**
 * 제공된 url 파일을 제거. url을 분석하여 s3 버킷 파일을 제거한다.
 * @param {string} url 제거할 url
 * @returns {RemoveResult} 잘 제거 되면 ok: true, 아니면 ok: false + 에러메시지.
 */
export const removeFile = async (url: string) => {
  try {
    if (process.env.AWS_ACCESS && process.env.AWS_SECRET) {
      AWS.config.update({
        region: "ap-northeast-2",
        credentials: {
          accessKeyId: process.env.AWS_ACCESS,
          secretAccessKey: process.env.AWS_SECRET,
        },
      });
      if (url.includes(BUCKET_NAME)) {
        const parsed = url.split(urlRegex);
        const key = parsed[4].slice(1) + parsed[6];

        const result = await new AWS.S3()
          .deleteObject({
            Bucket: BUCKET_NAME,
            Key: key,
          })
          .promise();

        return {
          ok: true,
        };
      } else {
        // 해당 버킷이 아니면.. 일단 좀 이상하긴해도 큰 문제는 아니니까 ok리턴.

        return {
          ok: true,
        };
      }
    } else {
      throw new Error("AWS credential failed");
    }
  } catch (e) {
    return {
      ok: false,
      error: e.message,
    };
  }
};
