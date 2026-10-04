"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connctDB = connctDB;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
function connctDB() {
    mongoose_1.default.connect(config_1.DB_URL).then(() => {
        console.log("Connected to DB successfully!");
    }).catch((err) => {
        console.log(`Connection Error: ${err}`);
    });
}
