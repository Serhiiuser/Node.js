import {User} from "../models/User.model";
import {IUser} from "../types/user.types";
import {ApiError} from "../errors/api.errors";


class UserService {
    public async getAll(): Promise<IUser[]> {
        try {
            return User.find()

        } catch (e: any) {
            throw new ApiError(e.message, e.status)
        }
    }
    public async getById(id:string) {
        try {
            return  User.findById(id)
        } catch (e: any) {
            throw new ApiError(e.message, e.status)
        }
    }

}

export const userService = new UserService();