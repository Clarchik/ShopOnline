import { ProductsService } from '../services';
import { Application } from 'express';


export default class ProductsController {
    private productsService: ProductsService;
    constructor(private app: Application) {
        this.productsService = new ProductsService();
        this.useProductsRoutes();
    }

    private useProductsRoutes() {
        /* GET PRODUCTS BY CATEGORY */
        this.app.route('/products').get(this.productsService.getProductsByCategory);

        /* GET SINGLE PRODUCT BY ID */
        this.app.route('/products/:id').get(this.productsService.getProductById);
    }
}
