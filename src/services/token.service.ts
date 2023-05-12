import * as jwt from "jsonwebtoken";

import {ITokenPair, ITokenPayload} from "../types";
import {configs} from "../configs";
import {ApiError} from "../errors";
import {ETokenType} from "../enums";

class TokenService {
    public generateTokenPair(payload: ITokenPayload): ITokenPair {
        const accessToken = jwt.sign(payload, configs.ACCESS_SECRET, {
            expiresIn: "15m",
        });
        const refreshToken = jwt.sign(payload, configs.REFRESH_SECRET, {
            expiresIn: "30d",
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    public async checkToken(token: string, tokenType = ETokenType.access): Promise<ITokenPayload> {
        try {
            let secret = '';

            switch (tokenType) {
                case ETokenType.access:
                    secret = configs.ACCESS_SECRET;
                    break;
                case ETokenType.refresh:
                    secret = configs.REFRESH_SECRET;
                    break

            }
            return jwt.verify(token, secret) as ITokenPayload;
        } catch (e) {
            throw new ApiError("Token not valid", 401)
        }
    }
}

export const tokenService = new TokenService();