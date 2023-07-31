import express, {NextFunction, Request, Response} from "express";
import mongoose from "mongoose";
import fileUploader from "express-fileupload";
import * as swaggerUi from "swagger-ui-express"




import {userRouter,authRouter} from "./routers";
import { cronRunner } from "./crons";
import {IError} from "./types";
import {carRouter} from "./routers";
import * as swaggerJson from "./utils/swagger.json"


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUploader());



app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/cars", carRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));


app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500

  return   res.status(status).json({
        message: err.message,
        status

    })
});


app.listen(5001,()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/test2').then()
    cronRunner();
    console.log(`Server has started on PORT  5001!!!`)
})

