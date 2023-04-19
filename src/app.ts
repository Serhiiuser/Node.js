import express, {NextFunction, Request, Response} from "express";
import mongoose from "mongoose";


import {userRouter} from "./routers/user.router";
import {IError} from "./types/common.types";
import {configs} from "./configs/configs";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/users", userRouter);

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 400

  return   res.status(status).json({
        message: err.message,
        status

    })
});


app.listen(configs.PORT, ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/march-2023')
    console.log(`Server has started on PORT ${configs.PORT}  !!!`)
})


