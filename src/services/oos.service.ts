import { config } from "config";
import got from "got";
import fs from "node:fs";
import path from "node:path";
import mime from "mime-types";

export class ObjectStorage {
  private static readonly bucketPARWrite = config.ORACLE_BUCKET_PAR_WRITE;
  private static readonly bucketPARName = config.ORACLE_BUCKET_PAR_NAME;
  private static readonly bucketUrl = config.ORACLE_BUCKET_URL;
  private static readonly region = config.ORACLE_REGION;
  private static readonly bucketName = config.ORACLE_BUCKET;

  public static async put(key: string, filePath: string): Promise<void> {
    try {
      const uploadUrl = `${this.bucketPARWrite}${encodeURIComponent(key)}`;
      const fileStream = fs.createReadStream(filePath);
      const mimeType = mime.lookup(filePath) || "application/octet-stream";

      const response = await got.put(uploadUrl, {
        body: fileStream,
        headers: {
          "Content-Type": mimeType,
        },
      });

      if (response.statusCode !== 200) {
        throw new Error(response.statusMessage);
      }
    } catch (error) {
      console.log(error);
      console.error(error, {
        message: `Failed to upload file: ${key}`,
      });
    }
  }

  public static async downloadAndUpload(key: string, url: string) {
    const tempFileName = path.join(".", `${Date.now()}-${path.basename(url)}`);
    try {
      const response = await got(url, { responseType: "buffer" });
      if (response.statusCode !== 200) {
        throw new Error(`Failed to download image: ${response.statusMessage}`);
      }

      fs.writeFileSync(tempFileName, new Uint8Array(response.body));
      await this.put(key, tempFileName);

      console.log(`Successfully uploaded image to bucket: ${key}`);
    } catch (error) {
      console.error("Error in convert function:", error);
    } finally {
      if (fs.existsSync(tempFileName)) {
        fs.unlinkSync(tempFileName);
      }
    }
  }

  public static get(key: string): string {
    return `${this.bucketUrl}${encodeURIComponent(key)}`;
  }
}
