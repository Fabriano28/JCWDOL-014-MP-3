import { Router } from "express";
import { IRoutes } from "@/interface/routes.interface";
import { AuthMiddleware } from "@/Middleware/auth.middleware";
import { DashboardController } from "@/controllers/dashboard.controller";

export class DashboardRouter implements IRoutes {
    public router: Router;
    private dashboardController: DashboardController;
    private auth: AuthMiddleware;

    constructor() {
        this.dashboardController = new DashboardController;
        this.auth = new AuthMiddleware();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/dashboard", this.auth.verifyToken, this.auth.role(['event organizer']), this.dashboardController.getUsersData);
    }

    getRouter(): Router {
        return this.router;
    }
}