import { Router } from "express";
import { IRoutes } from "@/interface/routes.interface";
import { AuthMiddleware } from "@/Middleware/auth.middleware";
import { LandingController } from "@/controllers/landing.controller";

export class LandingRouter implements IRoutes {
    public router: Router;
    private landingController: LandingController;
    private auth: AuthMiddleware;

    constructor() {
        this.landingController = new LandingController;
        this.auth = new AuthMiddleware();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/landing", this.auth.verifyToken, this.auth.role(['user']), this.landingController.getUsersData);
    }

    getRouter(): Router {
        return this.router;
    }
}