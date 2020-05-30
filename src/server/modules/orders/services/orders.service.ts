import express, { Request, Response } from 'express';
import { Order } from '../models';
import { User } from '../../user/models';
import { createOrderHTMLTemplate, sendHTMLTemplate } from '../../../shared/html-service';
import { UserData } from '../../user/interface/user';
import {Order as IOrder} from '../../../shared/interfaces/order';
import {countries} from '../../../data/countries/countries';
import {countriesWithStates} from '../../../data/cities/cities';
import {keys, reduce} from 'lodash';
import {OrderStatus} from '../../../../shared/interfaces/order-status';
import {UserRoles} from '../../../../shared/interfaces/user-roles';
import {OrderFilterDTO} from '../models/order-filters-dto';
import CONFIG from '../../../shared/config';
const paginate = require('jw-paginate');


export default class OrdersService {

    public saveOrder(req: express.Request, res: express.Response) {
        const user = (req as any).userObject;

        if (user) {
            const { _id} = user;
            const { email, country, state, city, address, index, phone, name, surname, products } = req.body;
            const totalSum = reduce(products, (sum, current) => sum + (current.price * current.quantity), 0);
            Order.countDocuments({}, (error: any, totalCount: number) => {
                const newOrder = new Order({country, state, city, address, name, surname, phone, index, products, orderNumber: totalCount + 1, totalSum});
                newOrder.save().then((savedOrder: any) => {
                    User.update(
                        {_id},
                        {$push: {orders: savedOrder}}
                    ).then(() => {
                        createOrderHTMLTemplate(`${name} ${surname}`, products)
                            .then((html) => {
                                sendHTMLTemplate(email, html, 'Order confirmation', 'Dear customer. Thank you for ordering products in our store.')
                                    .then(() => {
                                        res.status(200).send({message: 'Order have been sent'});
                                    })
                                    .catch((e: any) => {
                                        res.status(400).send({e, message: 'Order have not been sent'});
                                    });
                            }).catch((e) => {
                                res.status(400).send({e, message: 'Couldt create Html Template'});
                            });
                    }).catch((e: any) => {
                        res.status(400).send({e, message: 'Couldnt add order to User'});
                    });
                }).catch((e: any) => {
                    res.status(400).send({e, message: 'Couldnt save order'});
                });
            });
        } else {
            res.status(403).send({ message: 'User not found' });
        }
    }

    public getUserOrders(req: express.Request, res: express.Response) {
        const { user_id } = (req as any);
        User.findById(user_id).populate('orders').exec((err, user: UserData) => {
            if (err) { res.status(400).send({ message: 'User orders not found' }); }
            res.status(200).send(user.orders);
        });
    }

    public getAllUsersOrders(req: express.Request, res: express.Response) {
        const {orderStatus, orderNumber, createdAt, page} = req.query as any;
        const filters = new OrderFilterDTO({orderNumber, orderStatus});
        const startDate = new Date(createdAt);
        const finishDate = new Date(new Date(createdAt).valueOf() + 86400000 - 1);
        const date = createdAt !== 'null' ? {createdAt: {$gt: startDate, $lt: finishDate}} : {};
        const pageNumber = page ? parseInt(page.toString(), null) : 1;
        const query = {
            skip: CONFIG.itemsPerPage * (pageNumber - 1),
            limit: CONFIG.itemsPerPage
        };

        Order.countDocuments({...filters, ...date}, (error: any, totalCount: number) => {
            if (error) {
                res.status(400).send({message: 'Error occured'});
                return;
            }
            Order.find({...filters, ...date}, null, query, (err, orders) => {
                if (err) {
                    res.status(400).send({
                        message: 'Error occured'
                    });
                    return;
                }
                const pageSize = CONFIG.itemsPerPage;
                const pager = paginate(totalCount, pageNumber, pageSize, CONFIG.pageSizeToShow);
                res.status(200).json({pager, orders});
            });
        });

    }

    public changeOrderStatus(req: express.Request, res: express.Response) {
        const {orderStatus, orderId} = req.body;
        if (!!!OrderStatus[orderStatus]) {
            res.status(400).send({message: 'Status is invalid'});
            return;
        }
        Order.update({_id: orderId}, {$set: {orderStatus}}, (err, order) => {
            if (err) {
                res.status(400).send({message: 'Couldnt update order status'});
            }
            res.status(200).send({message: 'Order status is updated'});
        });
    }

    public getUserOrderDetails(req: express.Request, res: express.Response) {
        const {user_id} = (req as any);
        const orderId = req.query.id as string;
        const allowedUsersRole = [UserRoles.Admin, UserRoles.Manager];
        const {userObject} = (req as any);

        const findOrderCallback = (error: any, order: any) => {
            if (error) {res.status(400).send({message: 'Order doesnt exist'}); return; }
            res.status(200).send(order);
        };

        if (allowedUsersRole.includes(userObject.role)) {
            Order.findById(orderId, null, findOrderCallback);
        } else {
            User.findById(user_id).exec((err, user) => {
                if (err) {res.status(400).send({message: 'User orders not found'}); return; }

                if (!(user.orders as Array<string>).includes(orderId)) {
                    res.status(403).send({message: 'You are not allowed to see this order or order doesnt exist'});
                    return;
                }
                Order.findById(orderId, null, findOrderCallback);
            });
        }
    }

    public getCountries(req: Request, res: Response) {
        res.status(200).send(countries);
    }

    public getStateByCountryId(req: Request, res: Response) {
        const countryId = req.query.id;
        const {states} = countriesWithStates[`${countryId}`];
        const onlyStates: any = states ? keys(states) : [];
        res.status(200).send(onlyStates);
    }

    public getCitiesByStateAndCountry(req: Request, res: Response) {
        const countryId = req.query.id;
        const stateName = req.query.name;
        const cities = countriesWithStates[`${countryId}`].states[`${stateName}`];
        const onlyStates: any = cities ? cities : [];
        res.status(200).send(onlyStates);
    }
}

