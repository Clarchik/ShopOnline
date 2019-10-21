import { Currency } from './currency';
import { CURRENCY_NAME } from './currency-names';

export class CurrencyRates {
    private _rates: Array<Currency>;
    constructor() {
        this._rates = [
            { name: CURRENCY_NAME.usd, value: 1, sign: '$' },
            { name: CURRENCY_NAME.eur, value: 0.9, sign: '€' },
            { name: CURRENCY_NAME.pln, value: 3.83, sign: 'zł' },
        ];
    }

    get rates(): Array<Currency> {
        return this._rates;
    }

    get defaultCurrency(): Currency {
        return this.rates.find((currency) => currency.name === CURRENCY_NAME.usd);
    }
}
