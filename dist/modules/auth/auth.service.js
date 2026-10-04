"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../DB/models");
const common_1 = require("../../common");
const redis_service_1 = require("../../DB/redis.service");
const otpEmail_1 = require("../../common/utils/otpEmail");
const init_1 = require("../../common/email/nodemailer/init");
class AuthService {
    userRepository;
    MailProvider;
    constructor(userRepository, MailProvider) {
        this.userRepository = userRepository;
        this.MailProvider = MailProvider;
    }
    async signup(signupDTO) {
        const { email, password } = signupDTO;
        const userExist = await this.userRepository.getOne({ email });
        if (userExist) {
            throw new common_1.ConflictException("User already exists");
        }
        const hashedPassword = await (0, common_1.hash)(password);
        const otp = (0, common_1.generateOTP)();
        await this.MailProvider.send(signupDTO.email, "confirm Email", (0, otpEmail_1.otpEmail)(otp));
        await (0, redis_service_1.setIntoCache)(`${signupDTO.email}:otp`, otp, 30 * 60);
        // Cache signup data with hashed password
        const cachedSignupDTO = { ...signupDTO, password: hashedPassword };
        await (0, redis_service_1.setIntoCache)(signupDTO.email, JSON.stringify(cachedSignupDTO), 2 * 24 * 60 * 60);
    }
    async verifyAccount(verifyAccountDTO) {
        const userData = await (0, redis_service_1.getFromCache)(verifyAccountDTO.email);
        if (!userData)
            throw new common_1.NotFoundException("User does not exist");
        const otp = await (0, redis_service_1.getFromCache)(`${verifyAccountDTO.email}:otp`);
        if (!otp)
            throw new common_1.BadRequestException("Expire otp");
        if (otp != verifyAccountDTO.otp)
            throw new common_1.BadRequestException("invalid otp");
        await this.userRepository.create(JSON.parse(userData));
        await (0, redis_service_1.deleteFromCache)(`${verifyAccountDTO.email}:otp`);
        await (0, redis_service_1.deleteFromCache)(verifyAccountDTO.email);
    }
    async login(loginDTO) {
        const user = await this.userRepository.getOne({ email: loginDTO.email });
        if (!user) {
            throw new common_1.BadRequestException("Invalid email or password");
        }
        if (user.lockUntil && new Date(user.lockUntil).getTime() > Date.now()) {
            throw new common_1.BadRequestException("Too many attempts, try after 5 minutes");
        }
        if (user.lockUntil && new Date(user.lockUntil).getTime() <= Date.now()) {
            user.numberOfTries = 0;
            user.lockUntil = null;
            await this.userRepository.updateOne({ _id: user._id }, { numberOfTries: 0, lockUntil: null });
        }
        const isMatch = await (0, common_1.compare)(loginDTO.password, user.password);
        if (!isMatch) {
            const tries = (user.numberOfTries || 0) + 1;
            if (tries >= 5) {
                const lockTime = new Date(Date.now() + 5 * 60 * 1000);
                await this.userRepository.updateOne({ _id: user._id }, { numberOfTries: tries, lockUntil: lockTime });
                throw new common_1.BadRequestException("Too many attempts, try after 5 minutes");
            }
            await this.userRepository.updateOne({ _id: user._id }, { numberOfTries: tries });
            throw new common_1.BadRequestException("Invalid email or password");
        }
        if (user.numberOfTries && user.numberOfTries > 0) {
            await this.userRepository.updateOne({ _id: user._id }, { numberOfTries: 0, lockUntil: null });
        }
        const accessToken = (0, common_1.signToken)({ id: user._id, role: user.role }, "1h");
        const refreshToken = (0, common_1.signToken)({ id: user._id, role: user.role }, "365d");
        return { accessToken, refreshToken, user };
    }
    async sendOTP(sendOtpDTO) {
        const userExistDB = await this.userRepository.getOne({ email: sendOtpDTO.email });
        const userExistC = await (0, redis_service_1.getFromCache)(sendOtpDTO.email);
        if (!userExistDB && !userExistC)
            throw new common_1.NotFoundException("User does not exist,Please sign up");
        const otpExist = await (0, redis_service_1.getFromCache)(`${sendOtpDTO.email}:otp`);
        if (otpExist)
            throw new common_1.BadRequestException("already have a valid otp");
        const otp = (0, common_1.generateOTP)();
        await this.MailProvider.send(sendOtpDTO.email, "Confirm Email", (0, otpEmail_1.otpEmail)(otp));
        await (0, redis_service_1.setIntoCache)(`${sendOtpDTO.email}:otp`, otp, 30 * 60);
    }
    async resetPassword(resetPasswordDTO) {
        // check email exist
        const userExist = await this.userRepository.getOne({ email: resetPasswordDTO.email });
        if (!userExist)
            throw new common_1.NotFoundException("User does not exist");
        //check otp valid
        const cacheOtp = await (0, redis_service_1.getFromCache)(`${resetPasswordDTO.email}:otp`);
        if (cacheOtp != resetPasswordDTO.otp)
            throw new common_1.BadRequestException("Invalid otp");
        // hash new password
        resetPasswordDTO.newPassword = await (0, common_1.hash)(resetPasswordDTO.newPassword);
        // update password and credentialsUpdatedAt
        await this.userRepository.updateOne({ email: resetPasswordDTO.email }, {
            password: resetPasswordDTO.newPassword,
            credentialsUpdatedAt: new Date()
        });
    }
    async logout(token) {
        // Blacklist the token in Redis for its remaining validity (or a standard time)
        // For simplicity we blacklist it for 1 day
        await (0, redis_service_1.setIntoCache)(`blacklist:${token}`, "true", 24 * 60 * 60);
        return { message: "Logged out successfully" };
    }
}
exports.default = new AuthService(models_1.userRepo, init_1.nodeMailerProvider);
