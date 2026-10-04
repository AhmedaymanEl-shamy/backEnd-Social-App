"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3CloudProvider = void 0;
const s3_service_1 = require("./s3.service");
const config_1 = require("../../../config");
exports.s3CloudProvider = new s3_service_1.S3CloudProvider({
    region: config_1.S3_REGION,
    credentials: {
        accessKeyId: config_1.S3_ACCESS_KEY_ID,
        secretAccessKey: config_1.S3_SECRET_ACCESS_KEY
    }
});
