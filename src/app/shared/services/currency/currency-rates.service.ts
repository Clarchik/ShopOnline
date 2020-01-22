import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Currency } from '../../models/currency/currency';
import { CURRENCY_NAME } from '../../models/currency/currency-names';
import { CURRENCY_SIGN } from '../../models/currency/currency-sign';
import { CurrencyRates } from '../../models/currency/currency-rates';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class CurrencyRatesService {

    constructor(private http: HttpClient, private cr: CurrencyRates) { }

    getCurrencyRates(): Promise<Array<Currency>> {
        return new Promise<Array<Currency>>((resolve) => {
            this.http.get('/api/exchange').pipe(
                map((response: any) => {
                    const { rates } = response;
                    const currencyRates: Array<Currency> = [];
                    Object.keys(rates).forEach((item) => {
                        const isNeeded = CURRENCY_NAME[item];
                        if (isNeeded) {
                            const currency: Currency = { name: CURRENCY_NAME[item], value: rates[item], sign: CURRENCY_SIGN[item] };
                            currencyRates.push(currency);
                        }
                    });
                    return currencyRates;
                })
            ).subscribe({
                next: (response) => {
                    resolve(response);
                    this.cr.rates = response;
                },
                error: (error) => {
                    resolve([]);
                    this.cr.rates = [];
                }
            });
        });
    }
}
