import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoleSetupRoutingModule} from './role-setup-routing.module';
import {SharedModule} from  '../../../shared/shared.module';
import { RoleSetupComponent } from './role-setup.component';

@NgModule({
  imports: [
    CommonModule,
    RoleSetupRoutingModule,
    SharedModule
  ],
  declarations: [RoleSetupComponent]
})
export class RoleSetupModule { }