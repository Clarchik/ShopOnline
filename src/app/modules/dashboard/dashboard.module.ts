import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {dashboardComponent} from './components';
import {DashboardRoutingModule} from './dashboard-routing.module';


@NgModule({
    declarations: [
        ...dashboardComponent,
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule
    ]
})
export class DashBoardModule {}
