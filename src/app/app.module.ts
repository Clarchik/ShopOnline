/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ToastrModule } from 'ngx-toastr';
import { MDBBootstrapModule, MDBModalRef } from 'angular-bootstrap-md';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

/* Interceptors */
import { WebReqInterceptor } from './interceptors/web-req.interceptor';

/* Services */
import { CurrencyRatesService } from './shared/services/currency/currency-rates.service';
import { InitService } from './shared/services/init/init.service';
import { ResizeService } from './shared/services/resize/resize.service';
import { UtilsService } from './shared/services/utils/utils.service';

/* Pipes and Directives */
import * as fromSharedDirectives from './shared/directives';
import { CurrencyRates } from './shared/models/currency/currency-rates';
import { CurrencyConverterPipe } from './shared/pipes/currency-converter/currency-converter.pipe';

/* Root Store */
import { reducers as userReducers, effects as userEffects } from './store';

/* Components */
import { AppComponent } from './app.component';
import * as fromComponents from './components';

/* Others */
import { environment } from '../environments/environment.prod';
import { SetupFactory } from './setup-factory/setup-factory.service';
import {CustomCommonModule} from './modules/common/common/custom-common.module';
import { AccessDeniedPageComponent } from './components/screens/access-denied-page/access-denied-page.component';
import { NotFoundPageComponent } from './components/screens/not-found-page/not-found-page.component';
import { ErrorPageComponent } from './components/screens/error-page/error-page.component';


const setupFactory = new SetupFactory();

@NgModule({
    declarations: [
        AppComponent,
        ...fromComponents.Components,
        ...fromSharedDirectives.Directives,
        CurrencyConverterPipe,
        AccessDeniedPageComponent,
        NotFoundPageComponent,
        ErrorPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CustomCommonModule,
        FormsModule,
        HttpClientModule,
        MatAutocompleteModule,
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
                useFactory: setupFactory.HttpLoaderFactory,
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
            useFactory: setupFactory.setupInitFactory,
            deps: [CurrencyRatesService, InitService],
            multi: true
        },
        { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
    exports: [],
    entryComponents: [fromComponents.PreferencesModalComponent]
})
export class AppModule { }
