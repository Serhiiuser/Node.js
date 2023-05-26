import {model, Schema} from "mongoose"
import {EGenders, EUserStatus,} from "../enums";

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
    status: {
        type:String,
        enum: EUserStatus,
        default: EUserStatus.inactive,
    },
},
    {
    versionKey: false,
    timestamps:true
});

export const User = model("user",userSchema)
