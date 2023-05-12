import express, {NextFunction, Request, Response} from "express";
import mongoose from "mongoose";


import {userRouter,authRouter} from "./routers";
import {IError} from "./types";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500

  return   res.status(status).json({
        message: err.message,
        status

    })
});


app.listen(5002,()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/test2')
    console.log(`Server has started on PORT  5002!!!`)
})

