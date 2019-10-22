import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/main-page/header/header.component';
import { CarouselComponent } from './components/main-page/carousel/carousel.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ShoesSliderComponent } from './components/main-page/shoes-slider/shoes-slider.component';
import { GalleryShoesDirective } from './shared/directives/gallery-shoes/gallery-shoes.directive';
import { ImageGridComponent } from './components/main-page/image-grid/image-grid.component';
import { ImageGridDirective } from './shared/directives/image-grid/image-grid.directive';
import { ContactUsComponent } from './components/main-page/contact-us/contact-us.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        CarouselComponent,
        MainPageComponent,
        ShoesSliderComponent,
        GalleryShoesDirective,
        ImageGridComponent,
        ImageGridDirective,
        ContactUsComponent,
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
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
