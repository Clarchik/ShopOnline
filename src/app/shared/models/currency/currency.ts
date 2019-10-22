import {CURRENCY_NAME} from './currency-names';
import {CURRENCY_SIGN} from './currency-sign';

export interface Currency {
    name: CURRENCY_NAME;
    value: number;
    sign: CURRENCY_SIGN;
}
