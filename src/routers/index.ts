import * as express from "express";
import { userRouter } from "../modules/users/user.routing";

export class baseRouterClass {
	public router: express.Router = express.Router();

	constructor() {
		this.config();
	}

	public config(): void {
		this.router.use('/users', userRouter);

	}
}

export const baseRouter = new baseRouterClass().router;
