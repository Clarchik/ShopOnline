import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ToastrModule } from 'ngx-toastr';
import { MDBBootstrapModule, MDBModalRef } from 'angular-bootstrap-md';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CurrencyRatesService } from './shared/services/currency/currency-rates.service';
import { GalleryShoesDirective } from './shared/directives/gallery-shoes/gallery-shoes.directive';
import { ImageGridDirective } from './shared/directives/image-grid/image-grid.directive';
import { CurrencyConverterPipe } from './shared/pipes/currency-converter/currency-converter.pipe';
import { CurrencyRates } from './shared/models/currency/currency-rates';

import { AppComponent } from './app.component';

import { reducers as userReducers, effects as userEffects } from './store';

import * as fromComponents from './components';
import { SessionService } from './shared/services/authentication/session.service';
import { WebReqInterceptor } from './interceptor/web-req.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

export function setupInitFactory(crs: CurrencyRatesService, sessionService: SessionService) {
    return (): Promise<any[]> => Promise.all([
        crs.getCurrencyRates(),
        sessionService.findUserFromSessinon()
    ]);
}

@NgModule({
    declarations: [
        AppComponent,
        ...fromComponents.Components,
        GalleryShoesDirective,
        ImageGridDirective,
        CurrencyConverterPipe,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot(userReducers),
        StoreDevtoolsModule.instrument(),
        EffectsModule.forRoot(userEffects),
        MDBBootstrapModule.forRoot(),
        ToastrModule.forRoot(),
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
            deps: [CurrencyRatesService, SessionService],
            multi: true
        },
        { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
    entryComponents: [fromComponents.PreferencesModalComponent]
})
export class AppModule { }
