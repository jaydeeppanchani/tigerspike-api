import * as passwordSaltHash from "password-hash-and-salt";

class passwordUtilityClass {

    public hashedPassword(password: string): any {
        let passwordPromise = new Promise((resolve, reject) => {
            try {
                passwordSaltHash(password).hash((error, hashedPassword) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(hashedPassword);
                    }
                })
            }
            catch (e) {
                reject(e);
            }
        });
        return passwordPromise;
    }

    public verifyPassword(plainPassword: string, hashedPassword: string): any {
        let passwordPromise = new Promise((resolve, reject) => {
            try {
                passwordSaltHash(plainPassword).verifyAgainst(hashedPassword, (error, verifiedPassword) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(verifiedPassword);
                    }
                })
            }
            catch (e) {
                reject(e);
            }
        });
        return passwordPromise;
    }

}

export const passwordUtility = new passwordUtilityClass();