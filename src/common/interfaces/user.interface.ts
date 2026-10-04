import { SYS_ROLE, SYS_GENDER } from "../enums";

export interface IUser {
    username: string
    email: string
    password: string
    phoneNumber?: string
    role: SYS_ROLE,
    gender: SYS_GENDER,
    profilePicture?: string,
    numberOfTries?: number,
    lockUntil?: Date | null,
    credentialsUpdatedAt?: Date,
}