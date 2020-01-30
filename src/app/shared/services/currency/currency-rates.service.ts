import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Currency} from '../../models/currency/currency';
import {CURRENCY_NAME} from '../../models/currency/currency-names';
import {CURRENCY_SIGN} from '../../models/currency/currency-sign';
import {CurrencyRates} from '../../models/currency/currency-rates';

@Injectable({
    providedIn: 'root'
})
export class CurrencyRatesService {

    constructor(private http: HttpClient, private cr: CurrencyRates) {}

    public getCurrencyRates(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            this.http.get('/api/exchange').pipe(
                map((response: any) => this.getAllRequiredCurrency(response))
            ).subscribe({
                next: (rates) => {
                    resolve(true);
                    this.cr.rates = rates ? rates : [this.cr.defaultCurrency];
                },
                error: () => {
                    resolve(true);
                    this.cr.rates = [this.cr.defaultCurrency];
                }
            });
        });
    }

    private getAllRequiredCurrency(response: {rates: {}}) {
        const {rates} = response;
        const currencyRates: Array<Currency> = [];
        Object.keys(rates).forEach((item) => {
            const requiredCurrency = CURRENCY_NAME[item];
            if (requiredCurrency) {
                const currency: Currency = {name: CURRENCY_NAME[item], value: rates[item], sign: CURRENCY_SIGN[item]};
                currencyRates.push(currency);
            }
        });
        return currencyRates;
    }
}
