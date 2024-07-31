import { Router } from "express";
import { IRoutes } from "@/interface/routes.interface";
import { UserController } from "@/controllers/user.controller";

export class UserRouter implements IRoutes {
    public router: Router;
    public userController: UserController;

    constructor() {
        this.userController = new UserController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/users", this.userController.getUserData);
        this.router.post("/users", this.userController.createUserData);
    }

    getRouter(): Router {
        return this.router;
    }
}