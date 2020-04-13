import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {managerComponents} from './components';
import {DashboardRoutingModule} from './dashboard-routing.module';


@NgModule({
    declarations: [
        ...managerComponents,
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule
    ]
})
export class DashBoardModule {}
