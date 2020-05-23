import { ProductsService } from '../services';
import { Application } from 'express';
import {verifyJWTToken, verifySession, verifyUserRole} from '../../../shared/middlewares';
import {UserRoles} from '../../../../shared/interfaces/user-roles';


export default class ProductsController {
    private productsService: ProductsService;
    constructor(private app: Application) {
        this.productsService = new ProductsService();
        this.useProductsRoutes();
    }

    private useProductsRoutes() {
        /* GET PRODUCTS BY CATEGORY */
        this.app.route('/api/products').get(this.productsService.getProductsByCategory);

        /* GET SINGLE PRODUCT BY ID */
        this.app.route('/api/products/:id').get(this.productsService.getProductById);

        /* ADD SINGLE PRODUCT TO DATABASE */
        this.app.route('/api/addProduct').post([verifyJWTToken, verifySession, verifyUserRole([UserRoles.Admin])], this.productsService.addSingleProduct);

        /* UPDATE SINGLE PRODUCT BY ID */
        this.app.route('/api/updateProduct').post([verifyJWTToken, verifySession, verifyUserRole([UserRoles.Admin])], this.productsService.updateSingleProduct);

        /* GET ALL PRODCUTS FOR EDIT */
        this.app.route('/api/productsForEdit').get([verifyJWTToken, verifySession, verifyUserRole([UserRoles.Admin])], this.productsService.getProductForEdit);
    }
}
