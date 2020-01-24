import ejs from 'ejs';

const createHTMLTemplate = (fio: string, products: any) => {
    const { pathdir } = (global as any);
    const html = ejs.renderFile(`${pathdir}/server/ejs/order.ejs`, { fio, products });
    return html;
};

export { createHTMLTemplate };
