import express, { Response } from 'express';
import Product from '../models/product';
import CONFIG from '../../../shared/config';
const paginate = require('jw-paginate');

export default class ProductsService {

    public getProductsByCategory(req: express.Request, res: Response) {
            const { category } = req.query;
            const { search } = req.query;
            const { page } = req.query;
            const pageNumber = parseInt(page, undefined) || 1;
            const param = category === 'all' ? {title: { $regex: search, $options: search} } : {title: { $regex: search, $options: search}, category };
            const query = {
                skip: CONFIG.itemsPerPage * (pageNumber - 1),
                limit: CONFIG.itemsPerPage
            };

            Product.count(param, (error, totalCount) => {
                if (error) {
                    res.status(400).send({ message: 'Error occured' });
                }

                Product.find(param, null, query, (err, products: any) => {
                    if (err) {
                        res.status(400).send({
                            message: 'Error occured'
                        });
                    }
                    const pageSize = CONFIG.itemsPerPage;
                    const pager = paginate(totalCount, pageNumber, pageSize, CONFIG.pageSizeToShow);
                    res.status(200).json({ pager, items: products });
                });
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
