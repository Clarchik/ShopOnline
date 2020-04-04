import bodyParser from 'body-parser';
import { Application } from 'express';

export default class Cors {
    constructor(private app: Application) {
        this.setConfig();
    }

    private setConfig() {
        // Allows us to receive requests with data in json format
        this.app.use(bodyParser.json({ limit: '50mb' }));

        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, _id, x-access-token, x-refresh-token');
            res.header(
                'Access-Control-Expose-Headers',
                'x-access-token, x-refresh-token',
            );
            next();
        });
    }
}
