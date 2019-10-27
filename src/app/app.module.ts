import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MDBBootstrapModule, MDBModalRef } from 'angular-bootstrap-md';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CurrencyRatesService } from './shared/services/currency/currency-rates.service';
import { GalleryShoesDirective } from './shared/directives/gallery-shoes/gallery-shoes.directive';
import { ImageGridDirective } from './shared/directives/image-grid/image-grid.directive';
import { CurrencyConverterPipe } from './shared/pipes/currency-converter/currency-converter.pipe';
import { TextBoldPipe } from './shared/pipes/text-bold/text-bold.pipe';
import { CurrencyRates } from './shared/models/currency/currency-rates';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment.prod';
import * as fromComponents from './components';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

export function setupInitFactory(crs: CurrencyRatesService) {
    return (): Promise<any> => crs.getCurrencyRates();
}

@NgModule({
    declarations: [
        AppComponent,
        ...fromComponents.Components,
        GalleryShoesDirective,
        ImageGridDirective,
        CurrencyConverterPipe,
        TextBoldPipe,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
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
    entryComponents: [fromComponents.PreferencesModalComponent]
})
export class AppModule { }
