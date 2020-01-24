import ejs from 'ejs';
import path from 'path';

const createHTMLTemplate = (fio: string, products: any, pathdir: string) => {
    const newPath = path.resolve(pathdir, '..', '..');
    console.log(newPath, 'new path');
    const html = ejs.renderFile(`${newPath}/server/modules/orders/ejs/order.ejs`, { fio, products });
    return html;
};

export { createHTMLTemplate };
