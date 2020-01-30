import { Injectable } from '@angular/core';
import { Currency } from '../../models/currency/currency';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CurrencyStorageService {
    private static _lastCurrency: Currency = null;
    private currencySource = new BehaviorSubject<Currency>(null);

    public currentCurrency = this.currencySource.asObservable();

    constructor() {
        if (CurrencyStorageService._lastCurrency) {
            console.log('1');
            this.onCurrencyChange(CurrencyStorageService._lastCurrency);
        }

        // if (localStorage.getItem('currency')) {
        //     this.onCurrencyChange(JSON.parse(localStorage.getItem('currency')));
        // }
    }

    onCurrencyChange(currency: Currency) {
        CurrencyStorageService._lastCurrency = currency;
        localStorage.setItem('currency', JSON.stringify(currency));
        this.currencySource.next(currency);
    }

    get lastCurrency(): Currency {
        return CurrencyStorageService._lastCurrency;
    }
}
