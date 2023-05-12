import { Router} from "express";


import {userController} from "../controllers/";
import {userMiddleware} from "../midldewares/";
import {authMiddleware} from "../midldewares/auth.middleware";

const router = Router();

router.get("/",userController.getAll);

router.get("/:userId",
    authMiddleware.checkAccessToken,
    userMiddleware.isIdValid,
    userMiddleware.getByIdOrThrow,
    userController.getById);

router.post("/",
    userMiddleware.isValidCreate,
    userController.create);

router.put("/:userId",
    authMiddleware.checkAccessToken,
    userMiddleware.isIdValid,
    userMiddleware.isValidUpdate,
    userMiddleware.getByIdOrThrow,
    userController.update);

router.delete("/:userId",
    authMiddleware.checkAccessToken,
    userMiddleware.isIdValid,
    userMiddleware.getByIdOrThrow,
    userController.delete);


export const userRouter =router;