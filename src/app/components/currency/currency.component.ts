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
    public allCurencies: Array<Currency>;
    public availableCurrencies: Array<Currency>;
    constructor(private css: CurrencyStorageService) {
        const currencyRates = new CurrencyRates();
        const currencyFromLocalStorage = localStorage.getItem('currency') ? JSON.parse(localStorage.getItem('currency')) : null;
        const currencyFromServiceStorage = this.css.lastCurrency ? this.css.lastCurrency : null;
        const currencyAvailable = currencyFromLocalStorage || currencyFromServiceStorage;
        const currency = currencyAvailable ? currencyAvailable : currencyRates.defaultCurrency;
        this.allCurencies = currencyRates.rates;
        this.saveCurrency(currency);
        this.filterAvailableCurrencies();
    }

    switchCurrency(currency: Currency) {
        this.saveCurrency(currency);
        this.filterAvailableCurrencies();
    }

    filterAvailableCurrencies() {
        this.availableCurrencies = this.allCurencies.filter((currency) => currency.name !== this.currentCurrency.name);
    }

    saveCurrency(currency: Currency) {
        console.log(JSON.stringify(currency));
        this.css.onCurrencyChange(currency);
        localStorage.setItem('currency', JSON.stringify(currency));
        this.currentCurrency = currency;
    }

}
