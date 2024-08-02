import { Router } from "express";
import { IRoutes } from "@/interface/routes.interface";
import { UserController } from "@/controllers/user.controller";
import { AuthMiddleware } from "@/Middleware/auth.middleware";

export class UserRouter implements IRoutes {
    public router: Router;
    private userController: UserController;
    private auth: AuthMiddleware;

    constructor() {
        this.userController = new UserController();
        this.auth = new AuthMiddleware();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/users", this.auth.verifyToken, this.auth.role(['user']), this.userController.getUsersData);
        this.router.get("/users/profile", this.auth.verifyToken, this.userController.getUserData);
        this.router.get("/users/:userId", this.userController.getUserData);

        // this.router.post("/users", this.userController.createUserData);

        this.router.patch("/users/:userId", this.userController.updateUserData);

        this.router.delete("/users/:userId", this.userController.deleteUserData);
    }

    getRouter(): Router {
        return this.router;
    }
}