import { Application } from 'express';
import { OrdersService } from '../services';

export default class OrdersController {
    private ordersService: OrdersService;

    constructor(private app: Application) {
        this.ordersService = new OrdersService();
        this.orderRoutes();
    }


    private orderRoutes() {
        this.app.post('/api/saveorder', this.ordersService.saveOrder);
    }
}
