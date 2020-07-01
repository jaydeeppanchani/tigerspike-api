
class httpUtilityClass {

    public sendSuccess(httpStack, data): void {
        
        data = JSON.stringify(data).replace(/null/gi, "\"\"");
        data = JSON.parse(data);
        
        httpStack.statusCode = httpStack.statusCode == undefined ? 200 : httpStack.statusCode;

        httpStack.res.status(httpStack.statusCode).send({
            code: httpStack.code == undefined ? '' : httpStack.code,
            message: httpStack.message == undefined ? "" : httpStack.message,
            status: true,
            data: data,
            trace: ""
        });
    }

    public sendError(httpStack, error): void {
        httpStack.statusCode = httpStack.statusCode == undefined ? 200 : httpStack.statusCode;
        httpStack.res.status(httpStack.statusCode).send({
            code: httpStack.code == undefined ? '' : httpStack.code,
            message: httpStack.message == undefined ? (error.message == undefined ? "SERVER ERROR" : error.message) : httpStack.message,
            status: false,
            data: [],
            trace: error.message == undefined ? error : error.message
        });

    }

    public action(req, res, next, action) {

        let httpStack = {
            req: req,
            res: res,
            next: next,
            code: '',
            message: '',
            statusCode: 200
        };

        let reqBody = '';
        let decoded = '';
        let formData = '';
        let queryData = '';
        // ,{decoded: httpStack.req.decoded.username}
        if (httpStack.req.decoded) {
            decoded = httpStack.req.decoded.username;
        }
        // console.log("method",httpStack.req.method);
        // console.log("httpStack",httpStack);
        if (httpStack.req.method == 'GET') {
            reqBody = httpStack.req.query;
        }
        else if (httpStack.req.method == 'POST') {
            reqBody = httpStack.req.body;
            if (httpStack.req.files) {
                formData = httpStack.req.files;
            }
            if (httpStack.req.query) {
                queryData = httpStack.req.query;
            }
        }
        else if (httpStack.req.method == 'PUT') {
            reqBody = httpStack.req.body;
        }
        else if (httpStack.req.method == 'DELETE') {
            reqBody = httpStack.req.query;
        }
        //console.log(req.files);
        // console.log(httpStack.req.query);
        let requestJSON: any = { body: reqBody, decoded: decoded, files: formData, query: queryData };
        // console.log('requestJSON http',requestJSON);
        action(httpStack, requestJSON);
    }
}

export const httpUtility = new httpUtilityClass();