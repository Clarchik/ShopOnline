import express, { Application } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { UserController } from './modules/user/controllers/user.controller';

class App {
    public app: Application;
    public userController: UserController;
    constructor() {
        this.app = express();
        this.setConfig();
        this.setMongoConfig();

        this.userController = new UserController(this.app);
    }

    private setConfig() {
        // Allows us to receive requests with data in json format
        this.app.use(bodyParser.json({ limit: '50mb' }));

        // this.app.use(cors());

        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // update to match the domain you will make the request from
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, _id, x-access-token, x-refresh-token');
            res.header(
                'Access-Control-Expose-Headers',
                'x-access-token, x-refresh-token',
            );
            next();
        });
    }

    private setMongoConfig() {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb+srv://admin:adminnimda@cluster0-lppdm.azure.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }).then(() => {
            console.log('Connected to MongoDB successfully :)');
        }).catch((e) => {
            console.log('Error while attempting to connect to MongoDB');
            console.log(e);
        });

        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);
    }
}

export default new App().app;


