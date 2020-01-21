import * as express from 'express';

export default class StaticController {
    constructor(private app: express.Application) {
        this.staticRoutes();
    }


    private staticRoutes() {
        this.app.use(express.static(`${__dirname}dist/`));

        this.app.get('*', (req, res) => {
            console.log(__dirname, '123');
            res.sendFile(`${__dirname}/dist/index.html`);
        });
    }
}
