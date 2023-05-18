import {ApiError} from "../errors";
import {ICredentials, ITokenPair, ITokenPayload, IUser} from "../types";
import {passwordService} from "./password.service";
import {User} from "../models";
import {tokenService} from "./token.service";
import {Token} from "../models/Token.model";
import {emailService} from "./email.service";
import {EEmailActions, ESmsActionEnum} from "../enums";
import {smsService} from "./sms.service";

class AuthService {
    public async register(body: IUser): Promise<void> {
        try {
            const {password} = body;
            const hashedPassword = await passwordService.hash(password)
            await User.create({
                ...body,
                password: hashedPassword
            });
            await Promise.all([
                 emailService.sendMail("serhiik91@gmail.com", EEmailActions.WELCOME),
                 smsService.sendSms(body.phone, ESmsActionEnum.WELCOME)
        ])
        } catch (e: any) {
            throw new ApiError(e.message, e.status)
        }
    }

    public async login(credentials: ICredentials, user: IUser): Promise<ITokenPair> {
        try {
            const isMatched = await passwordService.compare(credentials.password, user.password)


            if (!isMatched) {
                throw new ApiError("Email or password wrong", 400)
            }

            const tokenPair = tokenService.generateTokenPair({
                name: user.name,
                _id: user._id,
            });
            await Token.create({
                _user_id: user._id,
                ...tokenPair

            })
            console.log(tokenPair)

            return tokenPair;


        } catch (e) {
            // @ts-ignore
            throw new ApiError(e.message, e.status)
        }

    }

    public async refresh(tokenInfo: ITokenPair, jwtPayload: ITokenPayload): Promise<ITokenPair> {
        try {
            const tokenPair = tokenService.generateTokenPair({
                _id: jwtPayload._id,
                name: jwtPayload.name
            })

            await Promise.all([
                Token.create({_user_id: jwtPayload._id, ...tokenPair}),
                Token.deleteOne({refreshToken: tokenInfo.refreshToken}),
            ]);
            return tokenPair;
        } catch (e) {
            // @ts-ignore
            throw new ApiError(e.message, e.status)
        }
    }

    public async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {

        const user = await User.findById(userId)
        // @ts-ignore
        const isMatched = await passwordService.compare(oldPassword, user.password);

        if (!isMatched) {
            throw new ApiError("Wrong new password", 400)
        }
        const hashedNewPassword = await passwordService.hash(newPassword)
        // @ts-ignore
        await User.updateOne({_id: user._id}, {password: hashedNewPassword})
    }

    // public async refresh(
    //     tokenInfo: ITokenPair,
    //     jwtPayload: ITokenPayload
    // ): Promise<ITokenPair> {
    //     try {
    //         const tokenPair = tokenService.generateTokenPair({
    //             _id: jwtPayload._id,
    //             name: jwtPayload.name,
    //         });
    //
    //         await Promise.all([
    //             Token.create({ _user_id: jwtPayload._id, ...tokenPair }),
    //             Token.deleteOne({ refreshToken: tokenInfo.refreshToken }),
    //         ]);
    //
    //         return tokenPair;
    //     } catch (e) {
    //         // @ts-ignore
    //         throw new ApiError(e.message, e.status);
    //     }
    // }

}

export const authService = new AuthService()