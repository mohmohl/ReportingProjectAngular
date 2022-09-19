import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ManageRoleRoutingModule} from './manage-role-routing.module';
import {SharedModule} from  '../../../shared/shared.module';
import { ManageRoleComponent } from './manage-role.component';

@NgModule({
  imports: [
    CommonModule,
    ManageRoleRoutingModule,
    SharedModule
  ],
  declarations: [ManageRoleComponent]
})
export class ManageRoleModule { }