import {BrowserModule} from '@angular/platform-browser';
import {NgModule, APP_INITIALIZER} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {MDBBootstrapModule, MDBModalRef} from 'angular-bootstrap-md';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/main-page/header/header.component';
import {CarouselComponent} from './components/main-page/carousel/carousel.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {ShoesSliderComponent} from './components/main-page/shoes-slider/shoes-slider.component';
import {GalleryShoesDirective} from './shared/directives/gallery-shoes/gallery-shoes.directive';
import {ImageGridComponent} from './components/main-page/image-grid/image-grid.component';
import {ImageGridDirective} from './shared/directives/image-grid/image-grid.directive';
import {ContactUsComponent} from './components/main-page/contact-us/contact-us.component';
import {LanguageComponent} from './components/language/language.component';
import {CurrencyComponent} from './components/currency/currency.component';
import {CurrencyConverterPipe} from './shared/pipes/currency-converter/currency-converter.pipe';
import {TextBoldPipe} from './shared/pipes/text-bold/text-bold.pipe';
import {CurrencyRatesService} from './shared/services/currency/currency-rates.service';
import {CurrencyRates} from './shared/models/currency/currency-rates';
import { PreferencesModalComponent } from './components/main-page/preferences-modal/preferences-modal.component';
import { FooterComponent } from './components/main-page/footer/footer.component';
import { PreferencesModalComponent } from './components/main-page/preferences-modal/preferences-modal.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

export function setupInitFactory(crs: CurrencyRatesService) {
    return (): Promise<any> => crs.getCurrencyRates();
}

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        CarouselComponent,
        MainPageComponent,
        ShoesSliderComponent,
        ImageGridComponent,
        ContactUsComponent,
        LanguageComponent,
        CurrencyComponent,
        GalleryShoesDirective,
        ImageGridDirective,
        CurrencyConverterPipe,
        TextBoldPipe,
        PreferencesModalComponent,
        FooterComponent,
        PreferencesModalComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MDBBootstrapModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    providers: [
        CurrencyRates,
        MDBModalRef,
        CurrencyRatesService,
        {
            provide: APP_INITIALIZER,
            useFactory: setupInitFactory,
            deps: [CurrencyRatesService],
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: [PreferencesModalComponent]
})
export class AppModule {}
