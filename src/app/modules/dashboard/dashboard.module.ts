import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {TranslateModule} from '@ngx-translate/core';

import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';

import * as fromComponents from './components';

@NgModule({
    declarations: [...fromComponents.dashboardComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        TranslateModule,
        MatSelectModule
    ],
    entryComponents: [fromComponents.ManageOrderRowComponent]
})
export class DashBoardModule {}
