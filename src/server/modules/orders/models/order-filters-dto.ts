export class FiltersDTO {
    constructor(args: any) {
        const filters = args;
        for (const key in args) {
            if (args[key] === 'null' || filters[key] === null) {
                delete filters[key];
            }
        }
        return filters;
    }
}
