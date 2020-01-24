import express from 'express';
import { Order } from '../models';
import { User } from '../../user/models';
import { createHTMLTemplate } from '../../../shared/utils';
const mailjet = require('node-mailjet').connect('850a29ef9d5d2b62a1e09fa3e437534d', 'b6023fb90acee91b5417318923b00cbd');

export default class OrdersService {

    public saveOrder(req: express.Request, res: express.Response) {
        const user = (req as any).userObject;

        if (user) {
            const { _id, email, name, surname } = user;
            const { shippingAddress } = req.body;
            const { products } = req.body;
            const fio = `${name} ${surname}`;
            const newOrder = new Order({ ...shippingAddress, products, fio });
            newOrder.save().then((savedOrder) => {
                User.update(
                    { _id },
                    { $push: { orders: savedOrder } }
                ).then(() => {
                    createHTMLTemplate(fio, products).then((html) => {
                        const request = mailjet
                            .post('send', { version: 'v3.1' })
                            .request({
                                Messages: [{
                                    From: {
                                        Email: 'shoesonlineshop4@gmail.com',
                                        Name: 'Online Shop'
                                    },
                                    To: [{
                                        Email: email,
                                    }],
                                    Subject: 'Order confirmation',
                                    TextPart: `Dear customer. Thank you for ordering products in our store.`,
                                    HTMLPart: html
                                }]
                            });
                        request
                            .then(() => {
                                res.status(200).send({ message: 'Order have been saved' });
                            })
                            .catch((err: any) => {
                                res.status(400).send({ message: 'Order have not been saved' });
                            });
                    }).catch((err) => {
                        console.log(err, 'err');
                    });
                }).catch((e) => {
                    res.status(400).send({ message: 'Some errors occured' });
                });
            }).catch((e: any) => {
                res.status(400).send(e);
            });
        } else {
            res.status(403).send({ message: 'User not found' });
        }
    }
}

