import { usersModel,dbMongoose,dbMongooseUtility } from 'utils/mongoose';
import { passwordUtility } from 'utils/password';
import { securityUtility } from "utils/security";

class userRepositoryClass {

    public authenticateUser(httpStack: any, requestJSON: any): any {
        let dbPromise = new Promise((resolve, reject) => {
            try {
                let userCondition: any;
                userCondition = usersModel.find({email: requestJSON.body.userName}); // find user email
                userCondition.exec(function (err, data) {
                    if (err) console.log('Error on save!')
                    // console.log('data',data);
                    if (data.length > 0) { // if user found then
                        passwordUtility.verifyPassword(requestJSON.body.password, data[0].password).then(data1 => { // verify password
                            if (data1) { // if password true
                                let userdata = {
                                    _id: data[0]._id,
                                    name: data[0].forename + ' ' + data[0].surname,
                                    email: data[0].email
                                };
                                let token = securityUtility.generateToken(userdata);
                                httpStack.code = '200';
                                httpStack.message = 'Login Successful!!!'
                                resolve(token);
                            }else{ // if password not matched
                                httpStack.code = '404';
                                httpStack.message = 'Password Could Not match!!!';
                                resolve(false);
                            }
                        });
                    }
                    else{ // if users not found.
                        httpStack.code = '404';
                        httpStack.message = 'Could not find user!!!';
                        resolve(false);
                    }
                });
            }
            catch (e) {
                reject(e);
            }
        });
        return dbPromise;
    }

    public registerUser(httpStack: any, requestJSON: any): any {
        let dbPromise = new Promise((resolve, reject) => {
            try {
                
                passwordUtility.hashedPassword(requestJSON.body.password).then(data => { // generate Hased password
                    // create user object to insert
                    const userObject = { 
                        forename: requestJSON.body.foreName,
                        surname: requestJSON.body.surName,
                        password: data,
                        email: requestJSON.body.email,
                        sex : requestJSON.body.sex,
                        dob : requestJSON.body.dob,
                    }
                    let usersData = new usersModel(userObject); // init user object to usersModel mongo.
                    usersData.save(function (err, data) { 
                        if (err) {
                            httpStack.code = '404';
                            httpStack.message = 'Could Not register user'
                            resolve(false);
                        }
                        else {
                            httpStack.code = '200';
                            httpStack.message = 'User registered successfully'
                            resolve(true);
                        }
                    });
                });
            }
            catch (e) {
                reject(e);
            }
        });
        return dbPromise;
    }

}

export const userRepository = new userRepositoryClass();
