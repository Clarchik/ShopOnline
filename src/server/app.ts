import express, { Application } from 'express';
import path from 'path';
import { UserController } from './modules/user/controllers';
import { MongoDB } from './db/mongoose';
import Cors from './cors/cors';
import { ProductsController } from './modules/products/controllers';
import StaticController from './modules/static/controller/static.controller';
import { OrdersController } from './modules/orders/controllers';

class App {
    public app: Application;
    private cors: Cors;
    private mongoDB: MongoDB;
    private userController: UserController;
    private productsController: ProductsController;
    private staticController: StaticController;
    private ordersController: OrdersController;
    constructor() {
        const pathdir = path.resolve(__dirname, '..');
        (global as any).pathdir = pathdir;
        this.app = express();

        // CORS
        this.cors = new Cors(this.app);

        // Database initialization
        this.mongoDB = new MongoDB();

        // Controllers initialization
        this.ordersController = new OrdersController(this.app);
        this.userController = new UserController(this.app);
        this.productsController = new ProductsController(this.app);
        this.staticController = new StaticController(this.app);
    }
}

export default new App().app;


