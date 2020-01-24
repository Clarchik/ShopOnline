import { Application } from 'express';
import { OrdersService } from '../services';
import { verifyJWTToken, verifySession } from '../../../shared/middlewares';

export default class OrdersController {
    private ordersService: OrdersService;

    constructor(private app: Application) {
        this.ordersService = new OrdersService();
        this.orderRoutes();
    }


    private orderRoutes() {
        this.app.route('/api/saveorder').post([verifyJWTToken, verifySession], this.ordersService.saveOrder);
    }
}
