import { Pipe, PipeTransform } from '@angular/core';
import { Currency } from '../../models/currency/currency';
import { CurrencyRates } from '../../models/currency/currency-rates';
import { CurrencyStorageService } from '../../services/currency/currency-storage.service';

@Pipe({
    name: 'currencyConverter',
    pure: false
})
export class CurrencyConverterPipe implements PipeTransform {
    private _currencyRates: Array<Currency>;
    constructor(private css: CurrencyStorageService) {
        this._currencyRates = new CurrencyRates().rates;
    }

    transform(value: number): any {
        const currency = this._currencyRates.find((singleCurrency) => singleCurrency.name === this.currentCurrency.name);
        const calculated = (value * currency.value).toFixed(2);
        return `${calculated} ${currency.sign}`;
    }

    get currentCurrency(): Currency {
        return this.css.lastCurrency;
    }
}
