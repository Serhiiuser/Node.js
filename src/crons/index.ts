
import {removeOldTokens} from "./remove.old.tokens";
import {removeOldPasswords} from "./remove.old.password.cron";

export * from "./remove.old.tokens"

export const cronRunner = () => {
    removeOldTokens.start();
    removeOldPasswords.start();
};