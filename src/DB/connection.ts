import mongoose from "mongoose";
import {DB_URL} from "../config";

export function connctDB() {
    mongoose.connect(DB_URL).then(() => {
            console.log("Connected to DB successfully!");
        }
    ).catch((err) => {
        console.log(`Connection Error: ${err}`);
    });
}