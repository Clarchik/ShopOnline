import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyStorageService } from '../../services/currency/currency-storage.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
    name: 'currencyConverter',
})
export class CurrencyConverterPipe implements PipeTransform {
    constructor(private css: CurrencyStorageService) { }

    transform(value: number): Observable<string> {
        return this.css.currentCurrency.pipe(
            map((currentCurency) => {
                const calculated = (value * currentCurency.value).toFixed(2);
                return `${calculated} ${currentCurency.sign}`;
            })
        );
    }
}
