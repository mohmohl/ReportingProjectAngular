import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserPermissionRoutingModule} from './user-permission-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import { UserPermissionComponent } from './user-permission.component';

@NgModule({
  imports: [
    CommonModule,
    UserPermissionRoutingModule,
    SharedModule
  ],
  declarations: [UserPermissionComponent]
})
export class UserPermissionModule { }