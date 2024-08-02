import { Request, Response, NextFunction } from "express";
import authAction from "@/actions/auth.action";

export class AuthController {

    public loginController = async (
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

}