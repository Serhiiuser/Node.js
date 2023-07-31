import {NextFunction, Request, Response} from "express";

import {authService} from "../services";
import {ITokenPair, ITokenPayload, IUser} from "../types";


class AuthController {
    public async register(req:Request, res:Response, next:NextFunction) {
        try {

            await authService.register(req.body);
            res.sendStatus(201)
        }catch (e){
            next(e)
        }
    }


    // @ts-ignore
    public async login(req:Request, res:Response, next:NextFunction):Promise <Response<ITokenPair>> {
        try {
            const {email, password} = req.body;

            // @ts-ignore
            const user = req.res.locals.user;
      const tokenPair = await authService.login({email, password}, user as IUser);


            return res.status(200).json(tokenPair)
        }catch (e){
            next(e)
        }
    }

    // @ts-ignore
    public async refresh(req:Request, res:Response, next:NextFunction):Promise <Response<ITokenPair>> {
        try {
            // @ts-ignore
            const {tokenInfo,jwtPayload} = req.res?.locals.user;

            const tokenPair = await authService.refresh(tokenInfo, jwtPayload);


            return res.status(200).json(tokenPair)
        }catch (e){
            next(e)
        }
    }

    // @ts-ignore
    public async changePassword(req:Request, res:Response, next:NextFunction) {
        try {
            // @ts-ignore
            const {tokenInfo} = req.res.locals.user
            const {oldPassword, newPassword} = req.body;

            await authService.changePassword(tokenInfo._user_id, oldPassword, newPassword)

            res.sendStatus(200)

        }catch (e){
            next(e)
        }
    }
    public async forgotPassword(req:Request, res:Response, next:NextFunction):Promise<void> {
        try {
            // @ts-ignore
            const {user} = req.res.locals;
            console.log(user)
            await authService.forgotPassword(user);

            res.sendStatus(200)

        }catch (e){
            next(e)
        }
    }
    public async setForgotPassword(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { password } = req.body;
            // @ts-ignore
            const { tokenInfo } = req.res.locals.user;

            await authService.setForgotPassword(password, tokenInfo._user_id,req.params.token);

            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }
    public async sendActivateToken(req:Request, res:Response, next:NextFunction):Promise<void> {
        try {
            // @ts-ignore
            const {user} = req.res.locals;
            console.log(user)
            await authService.sendActivateToken(user);

            res.sendStatus(204)

        }catch (e){
            next(e)
        }
    }
    public async activate(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            // @ts-ignore
            const { _id } = req.res.locals.jwtPayload as ITokenPayload;
            // @ts-ignore
            await authService.activate(_id);

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }


    // public async refresh(
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    //     // @ts-ignore
    // ): Promise<Response<ITokenPair>> {
    //     try {
    //         // @ts-ignore
    //         const { tokenInfo, jwtPayload } = req.res.locals;
    //
    //         const tokenPair = await authService.refresh(tokenInfo, jwtPayload);
    //
    //         return res.status(200).json(tokenPair);
    //     } catch (e) {
    //         next(e);
    //     }
    // }
}

export const authController = new AuthController()