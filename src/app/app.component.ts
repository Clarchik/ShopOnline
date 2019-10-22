import {Component} from '@angular/core';
import {CurrencyRatesService} from './shared/services/currency/currency-rates.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'OnlineShop';
    constructor() {}
}
