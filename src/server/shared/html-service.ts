import ejs from 'ejs';
const mailjet = require('node-mailjet')
    .connect('850a29ef9d5d2b62a1e09fa3e437534d', 'b6023fb90acee91b5417318923b00cbd');

export const createOrderHTMLTemplate = (fio: string, products: any): Promise<any> => {
    const { pathdir } = (global as any);
    const html = ejs.renderFile(`${pathdir}/server/ejs/order.ejs`, { fio, products });
    return html;
};

export const creatVerificationTemplate = (fio: string, path: string, token: string): Promise<any> => {
    const { pathdir } = (global as any);
    const html = ejs.renderFile(`${pathdir}/server/ejs/verification.ejs`, { fio, path, token });
    return html;
};

export const sendHTMLTemplate = (email: string, html: any, subject: string, textPart: string): Promise<any> => {
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
                Subject: subject,
                TextPart: textPart,
                HTMLPart: html
            }]
        });
    return request;
};
