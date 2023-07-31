import { model, Schema, Types } from "mongoose";

import { User } from "./User.model";


const carSchema = new Schema(
    {
        // @ts-ignore
        brand: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
        },
        // @ts-ignore
        model: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
        },
        // @ts-ignore
        year: {
            type: Number,
            required: true,
        },
        user: {
            // @ts-ignore
            type: Types.ObjectId,
            required: true,
            ref: User,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);
export const Car = model("car", carSchema);