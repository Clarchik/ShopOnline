import * as express from 'express';
import path from 'path';

export default class StaticController {
    constructor(private app: express.Application) {
        this.staticRoutes();
    }


    private staticRoutes() {
        const { pathdir } = (global as any);
        this.app.use(express.static(pathdir));

        this.app.all('/', (req, res) => {
            res.sendFile(`${pathdir}/index.html`);
        });
    }
}
