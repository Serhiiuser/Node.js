import {model, Schema} from "mongoose"
import { EGenders } from "../types/user.types";

const userSchema = new Schema( {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        require: [true,"Email is require"],
        trim: true,
        lowercase: true

    },
    password: {
        type: String,
        require: [true,"Password is require"],
    },
    gender: {
        type: String,
        enum: EGenders
    },
},{
    versionKey: false
});

export const User = model("user",userSchema)
