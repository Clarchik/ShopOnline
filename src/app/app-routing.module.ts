import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProfileDetailsComponent } from './components/account/profile-details/profile-details.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductItemDetailsComponent } from './components/product-item-details/product-item-details.component';

const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'main', component: MainPageComponent, data: { animation: 'swipeLeft' } },
    { path: 'login', component: LoginComponent, data: { animation: 'swipeRight' } },
    { path: 'registration', component: RegistrationComponent, data: { animation: 'FlipY' } },
    { path: 'profile-details', component: ProfileDetailsComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'product/:id', component: ProductItemDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
