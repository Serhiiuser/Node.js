import {Request, Response, NextFunction} from "express";
import {isObjectIdOrHexString} from 'mongoose'

import {User} from "../models";
import {ApiError} from "../errors/";
import {UserValidator} from "../validators";


class UserMiddleware {
    public async getByIdOrThrow(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const {userId} = req.params;

            const user = await User.findById(userId);

            if (!user) {
                throw new ApiError("User not found", 422)
            }

            res.locals.user = user;
            next();
        } catch (e: any) {
            next(e);
        }

    }

    public  getDynamicallyAndThrow(fieldName: string, from: "body" | "query" | "params" = 'body', dbField = fieldName) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const fieldValue = req[from][fieldName];

                const user = await User.findOne({[dbField]: fieldValue})

                if (user) {
                    throw new ApiError(`User with ${fieldName} ${fieldValue} already exist`, 409);
                }
                next();
            } catch (e) {
                next(e);
            }
        };

    }

    // public  getDynamicallyOrThrow(
    //     fieldName: string,
    //     from = 'body',
    //     dbField = fieldName
    // ) {
    //
    //     return async (req: IRequest, res: Response, next: NextFunction) => {
    //         try {
    //             const fieldValue = req[from][fieldName];
    //
    //             const user = await User.findOne({[dbField]: fieldValue})
    //
    //             if (!user) {
    //                 throw new ApiError(`User not found!!!`, 422);
    //             }
    //             console.log(user)
    //             req.res.local = user;
    //             next()
    //         } catch (e) {
    //             next(e)
    //         }
    //     };
    //
    // }
    public getDynamicallyOrThrow(
        fieldName: string,
        from: "body" | "query" | "params" = "body",
        dbField = fieldName
    ) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const fieldValue = req[from][fieldName];

                const user = await User.findOne({ [dbField]: fieldValue });

                if (!user) {
                    throw new ApiError(`User not found`, 422);
                }

                // @ts-ignore
                req.res.locals = user;

                next();
            } catch (e) {
                next(e);
            }
        };
    }

// validators
    public async isValidCreate(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const {error, value} = UserValidator.createUser.validate(req.body)

            if (error) {
                throw  new ApiError(error.message, 400)
            }
            req.body = value
            next();
        } catch (e: any) {
            next(e);
        }
    }

    public async isValidUpdate(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const {error, value} = UserValidator.updateUser.validate(req.body)

            if (error) {
                throw  new ApiError(error.message, 400)
            }
            req.body = value
            next();
        } catch (e: any) {
            next(e);
        }
    }



    public async isIdValid(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            if (!isObjectIdOrHexString(req.params.userId)) {
                throw  new ApiError("ID not valid", 400)
            }
            next();
        } catch (e: any) {
            next(e);
        }
    }

    public async isValidLogin(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const {error} = UserValidator.loginUser.validate(req.body)

            if (error) {
                throw  new ApiError(error.message, 400)
            }

            next();
        } catch (e: any) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();


