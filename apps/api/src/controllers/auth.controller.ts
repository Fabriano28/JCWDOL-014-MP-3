import { Request, Response, NextFunction } from "express";
import authAction from "@/actions/auth.action";

export class AuthController {

    public login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { email, password } = req.body;
        
            const user = await authAction.login(email, password);
        
            res.status(200).json({
                message: "Get user success",
                data: user,
            });
        } catch (err) {
            next(err);
        }
    };

    async register(req: Request, res: Response, next: NextFunction){
        try {
            const { email, password, first_name, last_name } = req.body;

            const user = await authAction.register(
                email,
                password,
                first_name,
                last_name,
            );

            res.status(200).json({
                message: "Create User Successfull",
                data: user,
            });
        } catch (err) {
            next(err);
        }
    }

}