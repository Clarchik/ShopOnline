import express, {Response} from 'express';
import Product from '../models/product';
import CONFIG from '../../../shared/config';
import {Product as IProduct} from '../../../shared/interfaces/product';
import {FiltersDTO} from '../../orders/models/order-filters-dto';
const paginate = require('jw-paginate');

export default class ProductsService {

    public getProductsByCategory(req: express.Request, res: Response) {
        const {category} = req.query;
        const {title} = req.query;
        const {page} = req.query;
        const pageNumber = parseInt(page.toString(), null) || 1;
        const titleRegex = {title: {$regex: title, $options: title}};
        const param = category === 'all' ? {...titleRegex} : {...titleRegex, category};
        const query = {
            skip: CONFIG.itemsPerPage * (pageNumber - 1),
            limit: CONFIG.itemsPerPage
        };

        Product.countDocuments(param, (error: any, totalCount: number) => {
            if (error) {
                res.status(400).send({message: 'Error occured'});
            }

            Product.find(param, null, query, (err: any, products: any) => {
                if (err) {
                    res.status(400).send({
                        message: 'Error occured'
                    });
                    return;
                }
                const pageSize = CONFIG.itemsPerPage;
                const pager = paginate(totalCount, pageNumber, pageSize, CONFIG.pageSizeToShow);
                res.status(200).json({pager, products});
            });
        });
    }

    public getProductById(req: express.Request, res: Response) {
        const {id} = req.params;
        Product.findById(id, null, (err: any, data: any) => {
            if (err) {
                res.status(404).send({
                    message: 'Product not found'
                });
            }
            res.status(200).json(data);
        });
    }

    public getProductForEdit(req: express.Request, res: express.Response) {
        const {price, category, page} = req.query as any;
        const filters = new FiltersDTO({price, category});
        const pageNumber = page ? parseInt(page.toString(), null) : 1;
        const query = {
            skip: CONFIG.itemsPerPage * (pageNumber - 1),
            limit: CONFIG.itemsPerPage
        };

        Product.countDocuments({...filters}, (error: any, totalCount: number) => {
            if (error) {
                res.status(400).send({message: 'Error occured'});
                return;
            }
            Product.find({...filters}, null, query, (err, products) => {
                if (err) {
                    res.status(400).send({
                        message: 'Error occured'
                    });
                    return;
                }
                const pageSize = CONFIG.itemsPerPage;
                const pager = paginate(totalCount, pageNumber, pageSize, CONFIG.pageSizeToShow);
                res.status(200).json({pager, products});
            });
        });
    }

    public addSingleProduct(req: express.Request, res: Response) {
        const {product} = req.body;
        const newProduct = new Product(product);
        newProduct.save().then(() => {
            res.status(200).send({message: 'Successfully added'});
        }).catch((e) => {
            res.status(400).send({message: 'Error occured', e});
        });
    }

    public updateSingleProduct(req: express.Request, res: express.Response) {
        const {product}: {product: IProduct} = req.body;
        const {id} = req.query;
        Product.findById(id, null, (foundError, foundProduct) => {
            if (foundError) {
                res.status(400).send({message: 'Updated product not found'});
                return;
            }
            foundProduct.updateOne(product, (updateError, updated) => {
                if (updateError) {
                    res.status(400).send({message: 'Couldnt update selected product. Try again'});
                    return;
                }
                res.status(200).send({message: 'Successfully updated'});
            });
        });
    }
}
