import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {TranslateModule} from '@ngx-translate/core';

import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ReactiveFormsModule} from '@angular/forms';

import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button'

import * as fromComponents from './components';

@NgModule({
    declarations: [...fromComponents.dashboardComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        TranslateModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    providers: [],
    entryComponents: [fromComponents.ManageOrderRowComponent],
})
export class DashBoardModule {}
