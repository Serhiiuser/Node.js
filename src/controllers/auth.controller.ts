import {NextFunction, Request, Response} from "express";

import {authService} from "../services";
import {ITokenPair, IUser} from "../types";


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

            const user = req.res?.locals;
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
            const {tokenInfo,jwtPayload} = req.res?.locals;

            const tokenPair = await authService.refresh(tokenInfo, jwtPayload);


            return res.status(200).json(tokenPair)
        }catch (e){
            next(e)
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