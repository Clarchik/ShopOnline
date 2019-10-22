import {Currency} from './currency';
import {CURRENCY_NAME} from './currency-names';
import {Injectable} from '@angular/core';
import {CURRENCY_SIGN} from './currency-sign';

@Injectable()
export class CurrencyRates {
    private _rates: Array<Currency> = [];
    constructor() {}

    get rates(): Array<Currency> {
        return this._rates;
    }

    set rates(rates: Array<Currency>) {
        this._rates = rates;
    }

    get defaultCurrency(): Currency {
        const defaultCurrency: Currency = {name: CURRENCY_NAME.USD, value: 1, sign: CURRENCY_SIGN.USD};
        return defaultCurrency;
    }
}
