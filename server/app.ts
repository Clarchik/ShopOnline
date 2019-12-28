import express, { Application } from 'express';
import { UserController } from './modules/user/controllers';
import { MongoDB } from './db/mongoose';
import Cors from './cors/cors';
import { ProductsController } from './modules/products/controllers';

class App {
    public app: Application;
    private cors: Cors;
    private mongoDB: MongoDB;
    private userController: UserController;
    private productsController: ProductsController;
    constructor() {
        this.app = express();

        // CORS
        this.cors = new Cors(this.app);

        // Database initialization
        this.mongoDB = new MongoDB();

        // Controllers initialization
        this.userController = new UserController(this.app);
        this.productsController = new ProductsController(this.app);
    }
}

export default new App().app;


