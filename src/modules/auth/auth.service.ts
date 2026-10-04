// dependency injection design pattern
// single tone design pattern
import { ResetPasswordDTO, LoginDTO, SendOtpDTO, SignupDTO, VerifyAccountDTO } from "./auth.dto";
import { userRepo, UserRepository } from "../../DB/models";
import { BadRequestException, ConflictException, generateOTP, hash, compare, signToken, NotFoundException, sendMail } from "../../common";
import { redisClient } from "../../DB/redis.connect";
import { deleteFromCache, getFromCache, setIntoCache } from "../../DB/redis.service";
import { otpEmail } from "../../common/utils/otpEmail";
import { IMailProvider } from "../../common/email/mail.interface";
import { nodeMailerProvider } from "../../common/email/nodemailer/init";


class AuthService {

    constructor(private userRepository: UserRepository, private MailProvider: IMailProvider) {

    }

    async signup(signupDTO: SignupDTO) {
        const { email, password } = signupDTO;
        const userExist = await this.userRepository.getOne({ email })
        if (userExist) {
            throw new ConflictException("User already exists");
        }
        const hashedPassword = await hash(password);
        const otp = generateOTP();
        await this.MailProvider.send(signupDTO.email, "confirm Email", otpEmail(otp));
        await setIntoCache(`${signupDTO.email}:otp`, otp, 30 * 60);
        
        const cachedSignupDTO = { ...signupDTO, password: hashedPassword };
        await setIntoCache(signupDTO.email, JSON.stringify(cachedSignupDTO), 2 * 24 * 60 * 60);
    }

    async verifyAccount(verifyAccountDTO: VerifyAccountDTO) {
        const userData = await getFromCache(verifyAccountDTO.email);
        if (!userData) throw new NotFoundException("User does not exist");
        const otp = await getFromCache(`${verifyAccountDTO.email}:otp`);
        if (!otp) throw new BadRequestException("Expire otp");
        if (otp != verifyAccountDTO.otp) throw new BadRequestException("invalid otp");
        await this.userRepository.create(JSON.parse(userData))
        await deleteFromCache(`${verifyAccountDTO.email}:otp`);
        await deleteFromCache(verifyAccountDTO.email);
    }

    async login(loginDTO: LoginDTO) {
        const user = await this.userRepository.getOne({ email: loginDTO.email });
        if (!user) {
            throw new BadRequestException("Invalid email or password");
        }
        
        if (user.lockUntil && new Date(user.lockUntil).getTime() > Date.now()) {
            throw new BadRequestException("Too many attempts, try after 5 minutes");
        }
        if (user.lockUntil && new Date(user.lockUntil).getTime() <= Date.now()) {
            user.numberOfTries = 0;
            user.lockUntil = null;
            await this.userRepository.updateOne({ _id: user._id }, { numberOfTries: 0, lockUntil: null });
        }
        
        const isMatch = await compare(loginDTO.password, user.password);
        if (!isMatch) {
            const tries = (user.numberOfTries || 0) + 1;
            if (tries >= 5) {
                const lockTime = new Date(Date.now() + 5 * 60 * 1000);
                await this.userRepository.updateOne({ _id: user._id }, { numberOfTries: tries, lockUntil: lockTime });
                throw new BadRequestException("Too many attempts, try after 5 minutes");
            }
            await this.userRepository.updateOne({ _id: user._id }, { numberOfTries: tries });
            throw new BadRequestException("Invalid email or password");
        }
        
        if (user.numberOfTries && user.numberOfTries > 0) {
            await this.userRepository.updateOne({ _id: user._id }, { numberOfTries: 0, lockUntil: null });
        }
        
        const accessToken = signToken({ id: user._id, role: user.role }, "1h");
        const refreshToken = signToken({ id: user._id, role: user.role }, "365d");
        
        return { accessToken, refreshToken, user };
    }


    async sendOTP(sendOtpDTO: SendOtpDTO) {
        const userExistDB = await this.userRepository.getOne({ email: sendOtpDTO.email })
        const userExistC = await getFromCache(sendOtpDTO.email);
        if (!userExistDB && !userExistC) throw new NotFoundException("User does not exist,Please sign up");
        const otpExist = await getFromCache(`${sendOtpDTO.email}:otp`)
        if (otpExist) throw new BadRequestException("already have a valid otp");
        const otp = generateOTP();
        await this.MailProvider.send(sendOtpDTO.email, "Confirm Email", otpEmail(otp))

        await setIntoCache(`${sendOtpDTO.email}:otp`, otp, 30 * 60)
    }

    async resetPassword(resetPasswordDTO: ResetPasswordDTO) {
        const userExist = await this.userRepository.getOne({ email: resetPasswordDTO.email })
        if (!userExist) throw new NotFoundException("User does not exist");
        const cacheOtp = await getFromCache(`${resetPasswordDTO.email}:otp`)
        if (cacheOtp != resetPasswordDTO.otp) throw new BadRequestException("Invalid otp");
        resetPasswordDTO.newPassword = await hash(resetPasswordDTO.newPassword)
        await this.userRepository.updateOne({ email: resetPasswordDTO.email }, { 
            password: resetPasswordDTO.newPassword,
            credentialsUpdatedAt: new Date()
        });
    }

    async logout(token: string) {
        await setIntoCache(`blacklist:${token}`, "true", 24 * 60 * 60);
        return { message: "Logged out successfully" };
    }

}


export default new AuthService(userRepo, nodeMailerProvider);
