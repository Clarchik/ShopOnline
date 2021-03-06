import express, {Application} from 'express';
import path from 'path';
import {UserController} from './modules/user/controllers';
import {MongoDB} from './db/mongoose';
import Cors from './cors/cors';
import {ProductsController} from './modules/products/controllers';
import {OrdersController} from './modules/orders/controllers';
import {NewsSellerController} from './modules/news-seller/controllers/inex';
import {StaticController} from './modules/static/controller';

class App {
    public app: Application;
    private cors: Cors;
    private mongoDB: MongoDB;
    private userController: UserController;
    private productsController: ProductsController;
    private staticController: StaticController;
    private ordersController: OrdersController;
    private newsSellerContorller: NewsSellerController;
    constructor() {
        const pathdir = path.resolve(__dirname, '..');
        (global as any).pathdir = pathdir;
        this.app = express();

        this.app.set('views', `${pathdir}/server/views/`);
        this.app.set('view engine', 'pug');

        // CORS
        this.cors = new Cors(this.app);

        // Database initialization
        this.mongoDB = new MongoDB();

        // Controllers initialization
        this.ordersController = new OrdersController(this.app);
        this.userController = new UserController(this.app);
        this.productsController = new ProductsController(this.app);
        this.newsSellerContorller = new NewsSellerController(this.app);
        this.staticController = new StaticController(this.app);
    }
}

export default new App().app;


