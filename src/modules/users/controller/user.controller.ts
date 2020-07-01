import { httpUtility } from 'utils/http';
import { userRepository } from '../repository/user.repository';

class userControllerClass {
    
    public authenticateUser(httpStack: any, requestJSON: any): void {
        userRepository.authenticateUser(httpStack, requestJSON).then(data => {
            httpUtility.sendSuccess(httpStack, data);
        }).catch(error => {
            httpUtility.sendError(httpStack, error);
        });
    }
    
    public registerUser(httpStack: any, requestJSON: any): void {
        userRepository.registerUser(httpStack, requestJSON).then(data => {
            httpUtility.sendSuccess(httpStack, data);
        }).catch(error => {
            httpUtility.sendError(httpStack, error);
        });
    }
    
    
}

export const userController = new userControllerClass();
