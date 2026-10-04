import {ICloudProvider} from "../cloud.interface";
import {DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {Promise} from "mongoose";
import {S3_BUCKET_NAME, S3_EXPIRES_IN} from "../../../config";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"

interface S3Config {
    region: string,
    credentials: {
        secretAccessKey: string,
        accessKeyId: string
    }
}

export class S3CloudProvider implements ICloudProvider {
    private client: S3Client
    private region: string

    constructor(config: S3Config) {
        this.region = config.region;
        this.client = new S3Client({
            region: config.region,
            credentials: config.credentials
        })
    }

    async deleteFile(key: string): Promise<boolean> {
        let command = new DeleteObjectCommand({
            Key: key,
            Bucket: S3_BUCKET_NAME
        });
        const {DeleteMarker} = await this.client.send(command);
        return DeleteMarker as boolean;
    }

    async getFile(key: string): Promise<NodeJS.ReadableStream | undefined> {
        let command = new GetObjectCommand({
            Key: key,
            Bucket: S3_BUCKET_NAME
        })
        const {Body} = await this.client.send(command);


        return Body as NodeJS.ReadableStream;
    }

    async uploadFile(file: Express.Multer.File, path: string): Promise<string> {
        let command: any = new PutObjectCommand({
            Bucket: S3_BUCKET_NAME,
            Key: `social-app/${path}/${Date.now()}_${file.originalname}`,
            ACL: "public-read",
            ContentType: file.mimetype,
            Body: file.buffer,
        });
        await this.client.send(command);
        return `https://${S3_BUCKET_NAME}.s3.${this.region}.amazonaws.com/${command.input.Key}`;
    }

}