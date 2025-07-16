import { Router, Request, Response } from "express";
import { LoginRequest, SignupRequest } from "../types/types";
import { UserService } from "../service/userService";

export const userRouter = Router();

/**
 * @openapi
 * /api/signup/:
 *  post:
 *      tags: 
 *          - Auth
 *      description: Signup
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          properties:
 *                              username:
 *                                  type: string
 *                                  example: abcde
 *                              email:
 *                                  type: string
 *                                  example: abcde
 *                              password:
 *                                  type: string
 *                                  example: 123456
 *                              confirmPassword:
 *                                  type: string
 *                                  example: 123456
 *      responses:
 *          200:
 *              description: Returns the JWT in case the credentials are correct
 */
userRouter.post('/signup', async (req: Request, res: Response) => {
    
    const {username, email, password, confirmPassword} = req.body as SignupRequest
    const userService = new UserService();

    if( username.trim() === '' || email.trim() === '' || 
            password.trim() === '' || confirmPassword.trim() === '') {
            
        res.status(400)
            .send({
            "message": `All the parameters are required.`
        });
    }

    if ( password !== confirmPassword ){
        res.status(401)
            .send({
            "message": `Password and the Confirmed Password should be identical.`
        });
    }

    // TODO: Validate email via 3rd party service 


    const result = await userService.createUser(username, email, password);
    
    if (result) {
        res.status(200).json({
            "message": result.message
        });
    }
        
    else {
        res.status(500).json({
            "message": "Error on the server side"
        });
    }
    
});

/**
 * @openapi
 * /api/login/:
 *  post:
 *      tags: 
 *          - Auth
 *      description: Login
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  example: abcde
 *                              password:
 *                                  type: string
 *                                  example: 123456
 *      responses:
 *          200:
 *              description: Returns the JWT in case the credentials are correct
 */
userRouter.post('/login', async (req: Request, res: Response) => {
    
    const {email, password} = req.body as LoginRequest
    const userService = new UserService();

    if( email.trim() === '' || password.trim() === '') {
            
        res.status(400)
            .send({
            "message": `All the parameters are required.`
        });
    }

    // TODO: Validate email via 3rd party service 


    const result = await userService.login( email, password);
    
    if (result) {
        res.status(200).json({
            "message": result.message,
            "jwt": result.jwt
        });
    }
        
    else{
        res.status(401).json({
            "message": "Credentials are not valid"
        });
    }
    
});