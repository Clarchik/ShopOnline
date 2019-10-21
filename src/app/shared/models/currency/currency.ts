import { CURRENCY_NAME } from './currency-names';

export interface Currency {
    name: CURRENCY_NAME;
    value: number;
    sign: string;
}
