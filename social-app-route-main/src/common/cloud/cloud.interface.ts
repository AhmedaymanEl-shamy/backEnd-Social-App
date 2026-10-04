// file >> multer[busboy] >> file Information >> {fileName?,destination?,originalName,mimeType,encoding,buffer?}

export interface ICloudProvider {
    // aws >> s3 >> return key >> string >> path of file >> "social-app/users/112323/pp/ka3bora.jpg"
    uploadFile(file: Express.Multer.File, path: string): Promise<string>

    getFile(key: string): Promise<NodeJS.ReadableStream | undefined>

    deleteFile(key: string): Promise<string | boolean>


}