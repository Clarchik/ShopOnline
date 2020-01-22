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
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CurrencyRatesService } from './shared/services/currency/currency-rates.service';
import { GalleryShoesDirective } from './shared/directives/gallery-shoes/gallery-shoes.directive';
import { ImageGridDirective } from './shared/directives/image-grid/image-grid.directive';
import { CurrencyConverterPipe } from './shared/pipes/currency-converter/currency-converter.pipe';
import { CurrencyRates } from './shared/models/currency/currency-rates';

import { AppComponent } from './app.component';
import { InitService } from './shared/services/authentication/init.service';
import { WebReqInterceptor } from './interceptor/web-req.interceptor';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationAutoFocusDirective } from './shared/directives/registration/registration-auto-focus.directive';
import { ProfileComponent } from './components/account/profile/profile.component';
import { ProfileDetailsComponent } from './components/account/profile-details/profile-details.component';
import { CopmareValidatorDirective } from './shared/validators/compare-validators/compare-validator.directive';

import * as fromComponents from './components';
import { reducers as userReducers, effects as userEffects } from './store';
import { ProductsComponent } from './components/products/products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductItemDetailsComponent } from './components/product-item-details/product-item-details.component';
import { SizesComponent } from './components/sizes/sizes.component';
import { ResizeService } from './shared/services/resize/resize.service';
import { UtilsService } from './shared/services/utils/utils.service';
import { SearchdumbbedComponent } from './components/header/searchdumbbed/searchdumbbed.component';

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
        GalleryShoesDirective,
        ImageGridDirective,
        CurrencyConverterPipe,
        RegistrationComponent,
        RegistrationAutoFocusDirective,
        ProfileComponent,
        ProfileDetailsComponent,
        CopmareValidatorDirective,
        ProductsComponent,
        ProductItemComponent,
        ProductItemDetailsComponent,
        SizesComponent,
        SearchdumbbedComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
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
    entryComponents: [fromComponents.PreferencesModalComponent, SearchdumbbedComponent]
})
export class AppModule { }
