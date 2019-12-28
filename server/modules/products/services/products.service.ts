import express, { Response } from 'express';
import Product from '../models/product';
import CONFIG from '../../../shared/config';
const paginate = require('jw-paginate');

export default class ProductsService {

    public getProductsByCategory(req: express.Request, res: Response) {
        const { category } = req.query;
        const { page } = req.query;
        const param = category === 'all' ? {} : { category };
        Product.find(param, null, null, (err, products: any) => {
            if (err) {
                res.status(400).send({
                    message: 'Error occured'
                });
            }
            const pageNumber = parseInt(page, undefined) || 1;
            const pageSize = CONFIG.itemsPerPage;
            const pager = paginate(products.length, pageNumber, pageSize, CONFIG.pageSizeToShow);
            const items = products.slice(pager.startIndex, pager.endIndex + 1);
            res.status(200).json({ pager, items });
        });
    }


    public getProductById(req: express.Request, res: Response) {
        const { id } = req.params;
        Product.findById(id, null, (err, data) => {
            if (err) {
                res.status(404).send({
                    message: 'Product not found'
                });
            }
            res.status(200).json(data);
        });
    }
}
