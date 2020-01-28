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
        // Save User Order
        this.app.route('/api/saveorder').post([verifyJWTToken, verifySession], this.ordersService.saveOrder);

        // Get Current User Orders
        this.app.route('/api/getUserOrders').get([verifyJWTToken, verifySession], this.ordersService.getUserOrders);
    }
}
