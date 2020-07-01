import * as express from "express";
import { httpUtility } from "utils/http";
import { userController } from './controller/user.controller';

export class userRouterClass {

    public router: express.Router = express.Router();

    constructor() {
        this.config();
    }

    private config(): void {
        // users module
        this.router.post("/authenticateUser", (req,res,next) => { httpUtility.action(req,res,next,userController.authenticateUser)});
        this.router.post("/register", (req,res,next) => { httpUtility.action(req,res,next,userController.registerUser)});
        
    }
}

export const userRouter = new userRouterClass().router;