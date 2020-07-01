import * as express from "express";
import * as bodyParser from "body-parser";
import { baseRouter } from "./routers";
import { securityUtility } from "./utils/security";

class appClass {

  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    // console.log(baseRouter);
    //suppport application/json
    this.app.use(bodyParser.json({limit: '50mb'}));

    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));

    //enabled cors middleware
    this.app.use(securityUtility.cors);

    //enabled authorization token
    this.app.use(securityUtility.validateToken);

    //enabled base router
    this.app.use("/tigerspikeApi/v1", baseRouter);
    

  }
}
 
export default new appClass().app;