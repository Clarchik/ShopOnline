import ejs from 'ejs';

const createHTMLTemplate = (fio: string, products: any, pathdir: string) => {
    const html = ejs.renderFile(`${pathdir}/server/modules/orders/ejs/order.ejs`, { fio, products });
    return html;
};

export { createHTMLTemplate };
