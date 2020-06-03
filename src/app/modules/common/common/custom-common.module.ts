import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {RoleDirective} from '../../../shared/directives/roles/role.directive';
import {DataLoaderComponent} from '../../../components/data-loader/data-loader.component';
import {EmptyDataComponent} from '../../../components/screens/empty-data/empty-data.component';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
    declarations: [
        RoleDirective,
        DataLoaderComponent,
        EmptyDataComponent
    ],
    imports: [
        ReactiveFormsModule,
        MatTabsModule,
        MatIconModule,
        MatInputModule,
        MatDialogModule,
        TranslateModule.forChild()
    ],
    exports: [
        ReactiveFormsModule,
        MatTabsModule,
        MatIconModule,
        MatInputModule,
        MatDialogModule,
        RoleDirective,
        DataLoaderComponent,
        EmptyDataComponent
    ],
    entryComponents: [DataLoaderComponent]
})
export class CustomCommonModule {}
