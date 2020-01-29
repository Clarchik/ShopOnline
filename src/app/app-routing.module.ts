import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProfileDetailsComponent } from './components/account/profile-details/profile-details.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductItemDetailsComponent } from './components/product-item-details/product-item-details.component';
import { SizesComponent } from './components/sizes/sizes.component';
import { OrderComponent } from './components/order/order.component';
import { MakeOrderGuard } from './guards/make-order-guard/make-order-component.guard';
import { LoginComponentGuard } from './guards/login-component-guard/login-component.guard';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { AuthGuard } from './guards/auth-guard/auth.guard';
import { UserOrdersResolver } from './resolvers/user-orders/user-orders.resolver';

const routes: Routes = [
    { path: '', redirectTo: 'orders', pathMatch: 'full' },
    { path: 'main', component: MainPageComponent, data: { animation: 'swipeLeft' } },
    { path: 'login', component: LoginComponent, canActivate: [LoginComponentGuard], data: { animation: 'swipeRight' } },
    { path: 'registration', component: RegistrationComponent, data: { animation: 'FlipY' } },
    { path: 'profile-details', component: ProfileDetailsComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'product/:id', component: ProductItemDetailsComponent },
    { path: 'size-guide', component: SizesComponent },
    { path: 'make-order', component: OrderComponent, canActivate: [MakeOrderGuard] },
    {
        path: 'orders',
        component: UserOrdersComponent,
        canActivate: [AuthGuard],
        resolve: { orders: UserOrdersResolver }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        UserOrdersResolver
    ]
})
export class AppRoutingModule { }
