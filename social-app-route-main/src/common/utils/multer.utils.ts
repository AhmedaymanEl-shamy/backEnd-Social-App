import multer from "multer";

// TODO: why to user diskStorage instead of memoryStorage ?
// answer : we use diskStorage when we want to save the file on the server before uploading it, when the files are large, or when we need to process or keep the file locally it uses less ram than memoryStorage but it is slower because it reads and writes to the disk memory storage is better when uploading files directly to aws S3
export function multerUploadFile() {
    return multer({storage: multer.memoryStorage()});
}