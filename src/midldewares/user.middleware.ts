import {Request, Response, NextFunction} from "express";
import {User} from "../models/User.model";
import {ApiError} from "../errors/api.errors";

class UserMiddleware {
    public async getByIdAndThrow(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const {userId} = req.params;

            const user = await User.findById(userId);

            if (!user) {
                throw new ApiError("User not found",404)
            }
            next();
        } catch (e:any){
         next(e);
        }

    }

}

export const userMiddleware = new UserMiddleware();