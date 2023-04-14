import {NextFunction, Request, Response} from "express";

import {User} from "../models/User.model";
import { IUser} from "../types/user.types";
import {userService} from "../services/user.service";
import {ICommonResponse, IMessage} from "../types/common.types";

class UserController {
    // @ts-ignore
    public async getAll(req: Request, res: Response,next:NextFunction): Promise<Response<IUser[]>> {
        try {
            const users = await userService.getAll();

            return res.json(users);
        } catch (e: any) {
            res.json({
                message: e.message
            });
        }
    }

    // @ts-ignore
    public async getById(req: Request, res: Response,next:NextFunction): Promise<Response<IUser[]>> {
     try {
         const {userId} = req.params;
         const user = await userService.getById(userId);

         return res.json(user);

     }catch (e){
         next(e);
     }
    }


    // @ts-ignore
    public async create(req: Request, res: Response,next:NextFunction): Promise<Response<ICommonResponse<IUser>>> {

      try {
          const body = req.body;
          const user = await User.create({...body})

          return res.status(201).json({
              message: "User created",
              data: user
          });

      }catch (e){
          next(e);
      }

    }

    // @ts-ignore
    public async update(req: Request, res: Response,next:NextFunction): Promise<Response<ICommonResponse<IUser>>> {

    try {
        const {userId} = req.params;
        const user = req.body;

        const updatedUser = await User.updateOne({_id: userId}, {...user});


        return res.status(200).json({
            message: "User update",
            data: updatedUser,
        });

    }catch (e){
        next(e);
    }
    }

    // @ts-ignore
    public async delete(req: Request, res: Response,next:NextFunction): Promise<Response<IMessage>>{
      try {
          const {userId} = req.params;

          await User.deleteOne({_id: userId});

          return res.status(200).json({
              message: "User deleted",
          });

      }catch (e){
          next(e);
      }
    }
}

export const userController = new UserController();