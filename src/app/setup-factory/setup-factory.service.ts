import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CurrencyRatesService } from '../shared/services/currency/currency-rates.service';
import { InitService } from '../shared/services/init/init.service';


@Injectable({
    providedIn: 'root'
})
export class SetupFactory {

    constructor() { }

    public HttpLoaderFactory(http: HttpClient) {
        return new TranslateHttpLoader(http);
    }

    public setupInitFactory(
        crs: CurrencyRatesService,
        sessionService: InitService) {
        return (): Promise<any[]> => Promise.all([
            crs.getCurrencyRates(),
            sessionService.findUserFromSessinon(),
            sessionService.setLanguage()
        ]);
    }
}
