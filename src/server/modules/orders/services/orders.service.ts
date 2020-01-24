import express from 'express';
import { Order } from '../models';
import { User } from '../../user/models';
const mailjet = require('node-mailjet').connect('850a29ef9d5d2b62a1e09fa3e437534d', 'b6023fb90acee91b5417318923b00cbd');

export default class OrdersService {

    public saveOrder(req: express.Request, res: express.Response) {
        const { userId } = req.body;
        const { email } = req.body;
        const order = {
            userId,
            products: req.body.products
        };

        const newOrder = new Order(order);

        newOrder.save().then((savedOrder) => {
            User.update(
                { _id: userId },
                { $push: { orders: savedOrder } }
            ).then(() => {
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
                                Name: 'passenger 1'
                            }],
                            Subject: 'Order confirmation',
                            TextPart: `Dear customer. Thank you for ordering ${order.products.length} products in our store.`,
                        }]
                    });

                request
                    .then((result: any) => {
                        res.status(200).send({ message: 'Okay' });
                    })
                    .catch((err: any) => {
                        console.log(err.statusCode);
                    });
            }).catch((e) => {
                res.status(400).send({ message: 'Some errors occured' });
            });
        }).catch((e: any) => {
            res.status(400).send(e);
        });
    }
}
