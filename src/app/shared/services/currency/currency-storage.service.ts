import { Injectable } from '@angular/core';
import { Currency } from '../../models/currency/currency';
import { BehaviorSubject } from 'rxjs';
import {CURRENCY_NAME} from '../../models/currency/currency-names';

@Injectable({
    providedIn: 'root'
})

export class CurrencyStorageService {
    private static _lastCurrencyName: string;
    private static _lastCurrency: Currency = null;
    private currencySource = new BehaviorSubject<Currency>(null);

    public currentCurrency = this.currencySource.asObservable();

    constructor() {
        const currenyNameFromStorage = localStorage.getItem('currency') ? localStorage.getItem('currency') : CURRENCY_NAME.USD;
        if (CurrencyStorageService._lastCurrency) {
            this.onCurrencyChange(CurrencyStorageService._lastCurrency);
        }

        if (currenyNameFromStorage) {
            CurrencyStorageService._lastCurrencyName = currenyNameFromStorage.toUpperCase();
        }
    }

    onCurrencyChange(currency: Currency) {
        CurrencyStorageService._lastCurrency = currency;
        CurrencyStorageService._lastCurrencyName = currency.name;
        localStorage.setItem('currency', currency.name.toLowerCase());
        this.currencySource.next(currency);
    }

    get lastCurrencyName(): string {
        return CurrencyStorageService._lastCurrencyName;
    }

    get lastCurrency(): Currency {
        return CurrencyStorageService._lastCurrency;
    }
}
