import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RoleDirective} from '../../../shared/directives/roles/role.directive';
import {DataLoaderComponent} from '../../../components/data-loader/data-loader.component';



@NgModule({
  declarations: [
      RoleDirective,
      DataLoaderComponent
    ],
  imports: [
    ReactiveFormsModule
  ],
  exports: [ReactiveFormsModule, RoleDirective, DataLoaderComponent],
  entryComponents: [DataLoaderComponent]
})
export class CustomCommonModule { }
