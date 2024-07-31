import { Request, Response, NextFunction } from "express";
import prisma from "@/prisma";

export class UserController {

    async createUserData(req: Request, res: Response, next: NextFunction){
        try {
            const { email, password, first_name, last_name } = req.body;

            const user = await prisma.user.create({
                data: {
                    email,
                    password,
                    first_name,
                    last_name,
                    role_id: 1,
                }
            });

            res.status(200).json({
                message: "Create User Successfull",
                data: user,
            });
        } catch (err) {
            next(err);
        }
    }

    async getUserData(req: Request, res: Response, next: NextFunction){
        try {
            const user = await prisma.user.findMany();

            res.status(200).json({
                message: "Fetch User Successfull",
                data: user,
            });
        } catch (err) {
            next(err);
        }
    }

    // public getUser = async (
    //     req: Request, 
    //     res: Response, 
    //     next: NextFunction
    // ) => {
    //     try {
    //         const user = await prisma.user.findMany();

    //         res.status(200).json({
    //             message: "Fetch User Successfull",
    //             data: user,
    //         });
    //     } catch (err) {
    //         next(err);
    //     }
    // };
}