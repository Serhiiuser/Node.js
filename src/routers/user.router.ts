import { Router} from "express";


import {userController} from "../controllers/user.controller";
import {userMiddleware} from "../midldewares/user.middleware";

const router = Router();

router.get("/",userController.getAll);
router.get("/:userId",userMiddleware.getByIdAndThrow,userController.getById);
router.post("/users",userController.create);

router.put("/:userId",userController.update);
//
router.delete("/:userId",userController.delete);


export const userRouter =router;