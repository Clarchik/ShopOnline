import { Application } from 'express';
import { OrdersService } from '../services';
import { verifyJWTToken, verifySession, verifyUserRole } from '../../../shared/middlewares';
import {UserRoles} from '../../../../shared/interfaces/user-roles';

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

        // Get Current User Order Deatils By ID
        this.app.route('/api/getOrderDetails').get([verifyJWTToken, verifySession], this.ordersService.getUserOrderDetails);

        // Get All Users Orders
        this.app.route('/api/getAllUsersOrders')
            .get([verifyJWTToken, verifySession, verifyUserRole([UserRoles.Manager, UserRoles.Admin])], this.ordersService.getAllUsersOrders);

        // Change Order Status
        this.app.route('/api/updateOrderStatus')
            .post([verifyJWTToken, verifySession, verifyUserRole([UserRoles.Manager, UserRoles.Admin])], this.ordersService.changeOrderStatus);

        // Get All Countries
        this.app.route('/api/getCountries').get(this.ordersService.getCountries);

        // Get States By Country Id
        this.app.route('/api/getCountryState').get(this.ordersService.getStateByCountryId);

        // Get Citoes By State name and Country Id
        this.app.route('/api/getStateCities').get(this.ordersService.getCitiesByStateAndCountry);
    }
}
