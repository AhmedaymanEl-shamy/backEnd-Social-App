export interface SignupDTO {
    email: string;
    password: string;
    username: string;
    phoneNumber?: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface ResetPasswordDTO {
    otp: string;
    email: string;
    newPassword: string;
}

export interface ResetPasswordDTO {
    email: string;
    password: string;
    otp: string;
}

export interface VerifyAccountDTO {
    email: string;
    otp: string
}

export interface SendOtpDTO {
    email: string;
}