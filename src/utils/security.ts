import * as jwt from "jsonwebtoken";
import { httpUtility } from "./http";

class securityUtilityClass {

    public cors(req, res, next) {

        // CORS headers
        res.header("Access-Control-Allow-Origin", "*");

        // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

        // Set custom headers for CORS
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept, MetaID, UserID');

        if (req.method == 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    }

    public generateToken(username) {

        return jwt.sign(
            { username: username },
            'qwertyuiop',
            { expiresIn: '1h' });
    }

    public validateToken(req, res, next): void {
        let httpStack = {
            req: req,
            res: res,
            message: "",
            statusCode: 200
        };

        // Express headers are auto converted to lowercase
        let token = req.headers['x-access-token'] || req.headers['authorization'];

        if (token) {

            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
            }
            // verify token
            jwt.verify(token, 'qwertyuiop', (error, decoded) => {
                if (error) {
                    httpStack.statusCode = 401;
                    httpStack.message = "Authorization Token - Invalid";
                    httpUtility.sendError(httpStack, error);
                } else {
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            if (req.url.indexOf("login") != -1 || req.url.indexOf("users") != -1) {
                // console.log(req.url);
                next();
                return;
            }

            httpStack.statusCode = 401;
            httpStack.message = "Authorization Token - Not Found";
            httpUtility.sendError(httpStack, "");
        }
    }
}

export const securityUtility = new securityUtilityClass();