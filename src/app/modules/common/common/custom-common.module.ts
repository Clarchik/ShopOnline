import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {RoleDirective} from '../../../shared/directives/roles/role.directive';
import {DataLoaderComponent} from '../../../components/data-loader/data-loader.component';



@NgModule({
    declarations: [
        RoleDirective,
        DataLoaderComponent
    ],
    imports: [
        ReactiveFormsModule,
        MatTabsModule,
        MatIconModule,
        MatInputModule,
        MatDialogModule
    ],
    exports: [ReactiveFormsModule, MatTabsModule, MatIconModule, MatInputModule, MatDialogModule, RoleDirective, DataLoaderComponent],
    entryComponents: [DataLoaderComponent]
})
export class CustomCommonModule {}
