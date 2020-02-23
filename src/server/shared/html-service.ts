import ejs from 'ejs';
const mailjet = require('node-mailjet')
    .connect('850a29ef9d5d2b62a1e09fa3e437534d', 'b6023fb90acee91b5417318923b00cbd');

export const createOrderHTMLTemplate = (fio: string, products: any): Promise<any> => {
    const { pathdir } = (global as any);
    const html = ejs.renderFile(`${pathdir}/server/ejs/order.ejs`, { fio, products });
    return html;
};

export const sendOrderTemplate = (email: string, html: any): Promise<any> => {
    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [{
                From: {
                    Email: 'shoesonlineshop4@gmail.com',
                    Name: 'Online Shop'
                },
                To: [{
                    Email: email,
                }],
                Subject: 'Order confirmation',
                TextPart: `Dear customer. Thank you for ordering products in our store.`,
                HTMLPart: html
            }]
        });
    return request;
};
