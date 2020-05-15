import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {TranslateModule} from '@ngx-translate/core';

import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button'

import {CustomCommonModule} from '../common/common/custom-common.module';

import * as fromComponents from './components';
import { ManageProductRowComponent } from './components/manage-product-row/manage-product-row.component';
@NgModule({
    declarations: [
        ...fromComponents.dashboardComponent,
        ManageProductRowComponent,
    ],
    imports: [
        CommonModule,
        CustomCommonModule,
        DashboardRoutingModule,
        TranslateModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    providers: [],
    entryComponents: [fromComponents.ManageOrderRowComponent],
})
export class DashBoardModule {}
