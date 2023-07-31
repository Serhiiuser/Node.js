import { model, Schema, Types } from "mongoose";

import { User } from "./User.model";

const oldPasswordSchema = new Schema(
    {
        _user_id: {
            // @ts-ignore
            type: Types.ObjectId,
            required: true,
            ref: User,
        },
        // @ts-ignore
        password: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export const OldPassword = model("OldPassword", oldPasswordSchema);