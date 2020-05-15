import {Routes, RouterModule} from '@angular/router';
import {ManageOrdersComponent} from './components/manage-orders/manage-orders.component';
import {SyncGuardHelperGuard} from '../../guards/sync-guard-helper/sync-guard-helper.guard';
import {AuthGuard} from '../../guards/auth-guard/auth.guard';
import {RoleGuard} from '../../guards/role-guard/role.guard';
import {UserRoles} from '../../../shared/interfaces/user-roles';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ManageProductsComponent} from './components/manage-products/manage-products.component';

const AdminOrManagerAccess = {
    canActivate: [SyncGuardHelperGuard],
    data: {
        syncGuards: [AuthGuard, RoleGuard],
        expectedRole: [UserRoles.Admin, UserRoles.Manager]
    }
};

const AdminAccess = {
    canActivate: [SyncGuardHelperGuard],
    data: {
        syncGuards: [AuthGuard, RoleGuard],
        expectedRole: [UserRoles.Admin]
    }
};

const routes: Routes = [
    {
        path: '', component: DashboardComponent, ...AdminOrManagerAccess,
        children: [
            {
                path: 'manage-orders',
                component: ManageOrdersComponent,
                ...AdminOrManagerAccess
            },
            {
                path: 'manage-products',
                component: ManageProductsComponent,
                ...AdminAccess
            }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardRoutingModule {}
