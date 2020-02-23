import * as express from 'express';

export default class StaticController {
    constructor(private app: express.Application) {
        this.staticRoutes();
    }

    private staticRoutes() {
        const { pathdir } = (global as any);

        this.app.use(express.static(pathdir));

        this.app.get('*', (_, res) => {
            res.status(200)
                .sendFile(`${pathdir}/index.html`);
        });
    }
}
