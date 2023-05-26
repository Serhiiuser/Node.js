import { model, Schema, Types } from "mongoose";

import { User } from "./User.model";
import {EActionTokenType} from "../enums";

const actionTokenSchema = new Schema(
    {
        _user_id: {
            type: Types.ObjectId,
            required: true,
            ref: User,
        },
        actionToken: {
            type: String,
            required: true,
        },
        tokenType: {
            type: String,
            enum: EActionTokenType,
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export const Action = model("action", actionTokenSchema);