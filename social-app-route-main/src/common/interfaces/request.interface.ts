import {IUser} from "./user.interface";

// re-open concept
declare module "express-serve-static-core" {
    interface Request {
        user?:IUser;
    }
}