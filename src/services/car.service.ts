import { Types } from "mongoose";

import { ApiError } from "../errors";
import { Car } from "../models";
import { carRepository } from "../repositories";
import { ICar } from "../types";

class CarService {
    public async create(data: ICar, userId: string): Promise<any> {
        try {
            return await Car.create({ ...data, user: new Types.ObjectId(userId) });
        } catch (e:any) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async getById(userId: string, carId: string): Promise<ICar> {
        try {
            return await carRepository.getByUserAndCar(userId, carId);
        } catch (e:any) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const carService = new CarService();