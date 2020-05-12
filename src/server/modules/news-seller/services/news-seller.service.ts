import express from 'express';
import {NewsEmail} from '../models';

export default class NewsSellerService {

    public subscribeEmailOnNews(req: express.Request, res: express.Response) {
        const {email} = req.body;
        if (!email) {
            res.status(400).send({message: 'noEmail'});
        }

        const newsEmail = new NewsEmail({email});

        NewsEmail.findOne({email}).then((foudndEmail) => {
            if (foudndEmail) {
                res.status(400).send({message: 'alreadySubscribed'});
            } else {
                newsEmail.save().then(() => {
                    res.status(200).send({message: 'successfullySubscribed'});
                }).catch((e) => {
                    res.status(400).send({message: 'errorSaving', e});
                });
            }
        }).catch((e) => {
            res.status(400).send({message: 'errorFinding', e});
        });
    }
}
