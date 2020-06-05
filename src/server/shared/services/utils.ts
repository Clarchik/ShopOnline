export const createUpdatedProductDocuments = (products: Array<any>): Array<any> => {
    const bulkArr = [];
    for (const product of products) {
        bulkArr.push({
            updateOne: {
                filter: {_id: product.id, 'sizes.size': product.size},
                update: {$inc: {'sizes.$.quantity': - product.quantity}}
            }
        });
    }
    return bulkArr;
};
