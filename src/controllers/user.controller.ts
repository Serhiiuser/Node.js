import {NextFunction, Request, Response} from "express";

import {User} from "../models";
import {IUser} from "../types";
import {IQuery, userService} from "../services";
import {ICommonResponse,} from "../types";
import {UploadedFile} from "express-fileupload";
import {userMapper} from "../mappers";

class UserController {
    // @ts-ignore
    public async getAll(req: Request, res: Response, next: NextFunction): Promise<Response<IUser[]>> {
        try {
            const response = await userService.getWithPagination(
                req.query as unknown as IQuery);


            return res.json(response);
        } catch (e: any) {
            res.json({
                message: e.message
            });
        }
    }

    // @ts-ignore
    public async getById(req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> {
        try {
            const {user} = res.locals;
            const response = userMapper.toResponse(user);

            return res.json(response);
        } catch (e) {
            next(e);
        }
    }


    // @ts-ignore
    public async create(req: Request, res: Response, next: NextFunction): Promise<Response<ICommonResponse<IUser>>> {

        try {
            const body = req.body;
            const user = await User.create({...body})

            return res.status(201).json({
                message: "User created",
                data: user
            });

        } catch (e) {
            next(e);
        }

    }

    // @ts-ignore
    public async update(req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> {

        try {
            const {userId} = req.params;

            const updatedUser = await User.findByIdAndUpdate(
                 userId,
                {...req.body},
                {new: true});
            return res.status(201).json(updatedUser);

        } catch (e) {
            next(e);
        }
    }

    // @ts-ignore
    private userMapper: any;
    // @ts-ignore
    public async delete(req: Request, res: Response, next: NextFunction): Promise<Response<void>> {
        try {
            const {userId} = req.params;

            await User.deleteOne({_id: userId});

            return res.sendStatus(204).json()

        } catch (e) {
            next(e);
        }
    }
    public async uploadAvatar(
        req: Request,
        res: Response,
        next: NextFunction
        // @ts-ignore
    ): Promise<Response<IUser>> {
        try {
            const userEntity = res.locals.user as IUser;
            const avatar = req.files?.avatar as UploadedFile;

            const user = await userService.uploadAvatar(avatar, userEntity);

            const response = this.userMapper.toResponse(user);

            return res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    }

    public async deleteAvatar(
        req: Request,
        res: Response,
        next: NextFunction
        // @ts-ignore
    ): Promise<Response<IUser>> {
        try {
            const userEntity = res.locals.user as IUser;

            const user = await userService.deleteAvatar(userEntity);


            const response = userMapper.toResponse(user);

            return res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();