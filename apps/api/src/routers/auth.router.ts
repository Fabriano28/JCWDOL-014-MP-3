import { Router } from "express";
import { IRoutes } from "@/interface/routes.interface";
import { AuthController } from "@/controllers/auth.controller";
import { UserController } from "@/controllers/user.controller";

export class AuthRouter implements IRoutes {
    public router: Router;
    public authController: AuthController;
    public userController: UserController;

    constructor() {
        this.authController = new AuthController();
        this.userController = new UserController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/login", this.authController.login);
        this.router.post("/register", this.authController.register);
    }

    getRouter(): Router {
        return this.router;
    }
}