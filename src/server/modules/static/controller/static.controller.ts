import * as express from 'express';

export default class StaticController {
    constructor(private app: express.Application) {
        this.staticRoutes();
    }


    private staticRoutes() {
        this.app.use(express.static(`${__dirname}dist/`));

        this.app.get('*', (req, res) => {
            res.sendFile(`${__dirname}/dist/index.html`);
        });
    }
}
