
import "app-module-path/register";
import * as dotenv from "dotenv";
import * as varhttp from "http";

console.log(process.env.NODE_ENV);
dotenv.config({ path: "./env/" + process.env.NODE_ENV + ".env" });
// dotenv.config({ path: "./env/dev.env" });
console.log(process.env.API_PORT);
import app from "./app";

varhttp.createServer(app).listen(3200);