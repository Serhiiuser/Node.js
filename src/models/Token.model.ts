import { model, Schema, Types } from "mongoose";

import { User } from "./User.model";

const tokensSchema = new Schema(
    {
        _user_id: {
            // @ts-ignore
            type: Types.ObjectId,
            required: true,
            ref: User,
        },
        // @ts-ignore
        accessToken: {
            type: String,
            required: true,
        },
        // @ts-ignore
        refreshToken: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const Token = model("Token", tokensSchema);