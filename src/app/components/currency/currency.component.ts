import { Component } from '@angular/core';
import { Currency } from '../../shared/models/currency/currency';
import { CurrencyRates } from '../../shared/models/currency/currency-rates';
import { CurrencyStorageService } from '../../shared/services/currency/currency-storage.service';

@Component({
    selector: 'app-currency',
    templateUrl: './currency.component.html',
    styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent {
    public currentCurrency: Currency;
    public availableCurrencies: Array<Currency> = [];
    private allCurencies: Array<Currency> = [];
    constructor(private css: CurrencyStorageService, private cs: CurrencyRates) {
        this.initCurrencies();
    }

    initCurrencies() {
        const currencyRates = this.cs.rates;
        const currencyNameFromStorage = this.css.lastCurrencyName;
        const foundCurrency = currencyRates.find(((item) => item.name === currencyNameFromStorage));
        const currency = foundCurrency ? foundCurrency : this.cs.defaultCurrency;
        this.allCurencies = currencyRates;
        this.switchCurrency(currency);

    }

    public switchCurrency(currency: Currency) {
        this.css.onCurrencyChange(currency);
        this.currentCurrency = currency;
        this.availableCurrencies = this.allCurencies.filter((singleCurrency) => singleCurrency.name !== this.currentCurrency.name);
    }

    get currensiesSize(): number {
        return this.allCurencies.length;
    }

    get availableCurrenciesSize(): number {
        return this.availableCurrencies.length;
    }

}
