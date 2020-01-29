/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ToastrModule } from 'ngx-toastr';
import { MDBBootstrapModule, MDBModalRef } from 'angular-bootstrap-md';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/* Interceptors */
import { WebReqInterceptor } from './interceptor/web-req.interceptor';

/* Services */
import { CurrencyRatesService } from './shared/services/currency/currency-rates.service';
import { InitService } from './shared/services/authentication/init.service';
import { ResizeService } from './shared/services/resize/resize.service';
import { UtilsService } from './shared/services/utils/utils.service';

/* Pipes and Directives */
import * as fromSharedDirectives from './shared/directives';
import { CurrencyRates } from './shared/models/currency/currency-rates';
import { CurrencyConverterPipe } from './shared/pipes/currency-converter/currency-converter.pipe';

/* Root Store */
import { reducers as userReducers, effects as userEffects } from './store';

/* Components */
import {AppComponent} from './app.component';
import * as fromComponents from './components';

/* Others */
import {environment} from '../environments/environment.prod';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

export function setupInitFactory(
    crs: CurrencyRatesService,
    sessionService: InitService
) {
    return (): Promise<any[]> => Promise.all([
        crs.getCurrencyRates(),
        sessionService.findUserFromSessinon(),
        sessionService.setLanguage()
    ]);
}

@NgModule({
    declarations: [
        AppComponent,
        ...fromComponents.Components,
        ...fromSharedDirectives.Directives,
        CurrencyConverterPipe,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        MatExpansionModule,
        StoreModule.forRoot(userReducers),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        }),
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
        ResizeService,
        UtilsService,
        {
            provide: APP_INITIALIZER,
            useFactory: setupInitFactory,
            deps: [CurrencyRatesService, InitService],
            multi: true
        },
        { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
    entryComponents: [fromComponents.PreferencesModalComponent]
})
export class AppModule { }
