import { Injectable } from '@angular/core';
import { Currency } from '../../models/currency/currency';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CurrencyStorageService {
    private static _lastCurrency: Currency;
    private currencySource = new BehaviorSubject<Currency>(null);

    currentCurrency = this.currencySource.asObservable();

    constructor() {
        if (CurrencyStorageService._lastCurrency) {
            this.onCurrencyChange(CurrencyStorageService._lastCurrency);
        }
    }

    onCurrencyChange(currency: Currency) {
        CurrencyStorageService._lastCurrency = currency;

        this.currencySource.next(currency);
    }

    get lastCurrency(): Currency {
        return CurrencyStorageService._lastCurrency;
    }
}
