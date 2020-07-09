import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
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
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { CountriesResolver } from './resolvers/countries/countries.resolver';
import { ProductsResolver } from './resolvers/products/products.resolver';
import { AccessDeniedPageComponent } from './components/screens/access-denied-page/access-denied-page.component';
import { NotFoundPageComponent } from './components/screens/not-found-page/not-found-page.component';
import { ErrorPageComponent } from './components/screens/error-page/error-page.component';

const routes: Routes = [
    // Modules
    { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashBoardModule) },
    // Components
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', component: MainPageComponent, data: { animation: 'MainPage' } },
    { path: 'login', component: LoginComponent, canActivate: [LoginComponentGuard], data: { animation: 'LoginPage' } },
    { path: 'registration', component: RegistrationComponent, data: { animation: 'RegPage' } },
    { path: 'profile-details', component: ProfileDetailsComponent },
    { path: 'products', component: ProductsComponent, data: { animation: 'ProductPage' } },
    { path: 'product/:id', component: ProductItemDetailsComponent, data: { animation: 'ProductDetPage' } },
    { path: 'size-guide', component: SizesComponent },
    {
        path: 'make-order',
        component: OrderComponent,
        canActivate: [MakeOrderGuard],
        resolve: { countries: CountriesResolver, products: ProductsResolver },
        data: { animation: 'MakeOrderPage' }
    },
    {
        path: 'orders',
        component: UserOrdersComponent,
        canActivate: [AuthGuard],
        resolve: { orders: UserOrdersResolver }
    },
    {
        path: 'orders/:id',
        component: OrderDetailsComponent,
        canActivate: [AuthGuard],
    },
    { path: '403', component: AccessDeniedPageComponent },
    { path: '404', component: NotFoundPageComponent },
    { path: '500', component: ErrorPageComponent },
    { path: '**', redirectTo: '/main' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' })],
    exports: [RouterModule],
    providers: [UserOrdersResolver]
})
export class AppRoutingModule { }
