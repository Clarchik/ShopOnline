import mongoose from 'mongoose';

export class MongoDB {
    constructor() {
        this.setMongoConfig();
    }

    private setMongoConfig() {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb+srv://admin:adminnimda@cluster0-lppdm.azure.mongodb.net/test?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }).then(() => {
                console.log('Connected to MongoDB successfully :)');
            }).catch((e) => {
                console.log('Error while attempting to connect to MongoDB');
                console.log(e);
            });

        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);
    }
}
