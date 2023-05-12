import {NextFunction, Request, Response} from "express";

import {ApiError} from "../errors/";
import {Token} from "../models/Token.model";
import {tokenService} from "../services";
import {ETokenType} from "../enums";


class AuthMiddleware {
    public async checkAccessToken(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const accessToken = req.get("Authorization");

            if (!accessToken) {
                throw new ApiError("No Token ", 401)
            }
          const jwtPayload = tokenService.checkToken(accessToken);

            const tokenInfo = await Token.findOne({accessToken});

            if (!tokenInfo) {
                throw new ApiError("Token not valid", 401)
            }

            res.locals.local = {tokenInfo,jwtPayload};
            next();
        } catch (e: any) {
            next(e);
        }

    }

    public async checkRefreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const refreshToken = req.get("Authorization");

            if (!refreshToken) {
                throw new ApiError("No Token ", 401)
            }

        const  jwtPayload =  tokenService.checkToken(refreshToken, ETokenType.refresh);

            const tokenInfo = await Token.findOne({refreshToken});

            if (!tokenInfo) {
                throw new ApiError("Token not valid", 401)
            }

            res.locals.local = {tokenInfo, jwtPayload};
            next();
        } catch (e: any) {
            next(e);
        }

    }

    // public async checkRefreshToken(
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    // ): Promise<void> {
    //     try {
    //         const refreshToken = req.get("Authorization");
    //
    //         if (!refreshToken) {
    //             throw new ApiError("No token", 401);
    //         }
    //
    //         const jwtPayload = tokenService.checkToken(
    //             refreshToken,
    //             ETokenType.refresh
    //         );
    //
    //         const tokenInfo = await Token.findOne({ refreshToken });
    //
    //         if (!tokenInfo) {
    //             throw new ApiError("Token not valid", 401);
    //         }
    //
    //         // @ts-ignore
    //         req.res.locals = { tokenInfo, jwtPayload };
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // }
}

export const authMiddleware = new AuthMiddleware();

