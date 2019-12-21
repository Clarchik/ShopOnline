import express, { Application } from 'express';
import { UserController } from './modules/user/controllers';
import { MongoDB } from './db/mongoose';
import Cors from './cors/cors';

class App {
    public app: Application;
    private cors: Cors;
    private mongoDB: MongoDB;
    private userController: UserController;
    constructor() {
        this.app = express();

        // CORS
        this.cors = new Cors(this.app);

        // Database initialization
        this.mongoDB = new MongoDB();

        // Controllers initialization
        this.userController = new UserController(this.app);
    }
}

export default new App().app;


