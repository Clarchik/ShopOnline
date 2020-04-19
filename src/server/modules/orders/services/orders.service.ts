import express from 'express';
import { Order } from '../models';
import { User } from '../../user/models';
import { createOrderHTMLTemplate, sendOrderTemplate } from '../../../shared/html-service';
import { UserData } from '../../user/interface/user';
import {Order as IOrder} from '../../../shared/interfaces/order';


export default class OrdersService {

    public saveOrder(req: express.Request, res: express.Response) {
        const user = (req as any).userObject;

        if (user) {
            const { _id, email, name, surname } = user;
            const { shippingAddress } = req.body;
            const { products } = req.body;
            const fio = `${name} ${surname}`;
            Order.countDocuments({}, (error: any, totalCount: number) => {
                const newOrder = new Order({...shippingAddress, products, fio, orderNumber: totalCount + 1});
                newOrder.save().then((savedOrder: any) => {
                    User.update(
                        {_id},
                        {$push: {orders: savedOrder}}
                    ).then(() => {
                        createOrderHTMLTemplate(fio, products)
                            .then((html) => {
                                sendOrderTemplate(email, html)
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

    public getUserOrderDetails(req: express.Request, res: express.Response) {
        const {user_id} = (req as any);
        const orderId = req.query.id as string;
        User.findById(user_id).exec((err, user) => {
            if (err) {res.status(400).send({message: 'User orders not found'}); return;}
            if (!(user.orders as Array<string>).includes(orderId)) {
                res.status(403).send({message: 'You are not allowed to see this order or order doesnt exist'});
                return;
            }
            Order.findById(orderId, null, (error, order: IOrder) => {
                if (error) {res.status(400).send({message: 'Order doesnt exist'});}
                res.status(200).send(order);
            });
        });
    }
}

