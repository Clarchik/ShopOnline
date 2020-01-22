import * as express from 'express';
import path from 'path';

export default class StaticController {
    constructor(private app: express.Application) {
        this.staticRoutes();
    }


    private staticRoutes() {
        const {pathdir} = (global as any);

        console.log(pathdir, 'PATH DIR');

        this.app.use(express.static(pathdir));

        this.app.get('*', (req, res) => {
            console.log('*****');
            res.status(200)
                .sendFile(`${pathdir}/index.html`);
        });

        // this.app.get('/:anyreq',  (req, res) => {
        //     express.static(pathdir);
        // });

        // this.app.all('/', (req, res) => {
        //     res.status(200)
        //         .set({'content-type': 'text/html; charset=utf-8'})
        //         .sendFile(`${pathdir}/index.html`);
        // });

        // this.app.use('/products', express.static(`${pathdir}/products`));
    }
}
