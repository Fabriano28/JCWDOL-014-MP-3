import { Request, Response, NextFunction } from "express";
import prisma from "@/prisma";
import userAction from "@/actions/user.action";
import { User } from "@/types/express";

export class UserController {

    async createUserData(req: Request, res: Response, next: NextFunction){
        try {
            const { email, password, first_name, last_name } = req.body;

            const user = await userAction.createUser(
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

    async getUsersData(req: Request, res: Response, next: NextFunction){
        try {
            const { email, first_name, last_name } = req.query;

            let filter = {};

            if (email) filter = { ...filter, email: { contains: email } };
            if (first_name) filter = { ...filter, first_name: { contains: first_name } };
            if (last_name) filter = { ...filter, last_name: { contains: last_name } };

            const user = await prisma.user.findMany({
                where: {
                    AND: [
                        {
                            ...filter,
                        },
                        {
                            role_id: {
                                not: 2,
                            },
                        },
                    ],
                },
            });

            res.status(200).json({
                message: "Fetch User Successfull",
                data: user,
            });
        } catch (err) {
            next(err);
        }
    }

    async getUserData(req: Request, res: Response, next: NextFunction){
        try {
            const { email } = req.user as User;

            const user = await userAction.findUserByEmail(String(email));
      
            if (!user) throw new Error("User not found!");

            res.status(200).json({
                message: "Fetch User Successfull",
                data: user,
            });
        } catch (err) {
            next(err);
        }
    }

    async updateUserData(req: Request, res: Response, next: NextFunction){
        try {
            const { user_id } = req.params;
            const { first_name, last_name } = req.body;
      
            const check = await userAction.findUserById(user_id);
      
            if (!check) throw new Error("User not found!");
      
            let params = {};
      
            if (first_name) params = { ...params, first_name };
            if (last_name) params = { ...params, last_name };
      
            const user = await prisma.user.update({
              where: {
                user_id: user_id,
              },
              data: {
                ...params,
              },
            });
      
            res.status(200).json({
              message: "Update user success",
              data: user,
            });
        } catch (err) {
            next(err);
        }
    };

    async deleteUserData(req: Request, res: Response, next: NextFunction){
        try {
            const { user_id } = req.params;
            const user = await prisma.user.delete({
              where: {
                user_id: user_id,
              },
            });
      
            res.status(200).json({
              message: "Delete user success",
              data: user,
            });
        } catch (err) {
            next(err);
        }
    };

}