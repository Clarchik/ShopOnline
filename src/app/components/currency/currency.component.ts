import { Component } from '@angular/core';
import { Currency } from '../../shared/models/currency/currency';
import { CurrencyRates } from '../../shared/models/currency/currency-rates';
import { CurrencyStorageService } from '../../shared/services/currency/currency-storage.service';

@Component({
    selector: 'app-currency',
    templateUrl: './currency.component.html',
    styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent {
    public currentCurrency: Currency;
    public allCurencies: Array<Currency> = [];
    public availableCurrencies: Array<Currency> = [];
    constructor(private css: CurrencyStorageService, private cs: CurrencyRates) {
        this.initCurrencies();
    }

    initCurrencies() {
        const currencyRates = this.cs.rates;
        const currencyFromLocalStorage: Currency = localStorage.getItem('currency') ? JSON.parse(localStorage.getItem('currency')) : null;
        const currencyFromServiceStorage: Currency = this.css.lastCurrency ? this.css.lastCurrency : null;
        const currencyFromStorage = currencyFromLocalStorage || currencyFromServiceStorage;
        const refreshIfFound = currencyRates.length ? currencyRates.find(((item) => item.name === currencyFromStorage.name)) : null;
        const currency = refreshIfFound ? refreshIfFound : this.cs.defaultCurrency;
        this.allCurencies = currencyRates.length ? currencyRates : [currency];
        this.switchCurrency(currency);

    }

    public switchCurrency(currency: Currency) {
        this.css.onCurrencyChange(currency);
        localStorage.setItem('currency', JSON.stringify(currency));
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
