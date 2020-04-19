import {Routes, RouterModule} from '@angular/router';
import {ManageOrdersComponent} from './components/manage-orders/manage-orders.component';
import {SyncGuardHelperGuard} from '../../guards/sync-guard-helper/sync-guard-helper.guard';
import {AuthGuard} from '../../guards/auth-guard/auth.guard';
import {RoleGuard} from '../../guards/role-guard/role.guard';
import {UserRoles} from '../../shared/interfaces/user/user-roles';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './components/dashboard/dashboard.component';

const customFields = {
    canActivate: [SyncGuardHelperGuard],
    data: {
        syncGuards: [AuthGuard, RoleGuard],
        expectedRole: [UserRoles.Admin, UserRoles.Manager]
    }
};

const routes: Routes = [
    {
        path: 'dashboard',
        children: [
            {path: '', component: DashboardComponent, ...customFields},
            {
                path: 'manage-orders',
                component: ManageOrdersComponent,
                ...customFields
            },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardRoutingModule {}
