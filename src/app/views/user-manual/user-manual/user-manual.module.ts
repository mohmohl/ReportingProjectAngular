import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManualRoutingModule } from './user-manual-routing.module';
import { UserManualComponent } from './user-manual.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UserManualRoutingModule,
    SharedModule
  ],
  declarations: [UserManualComponent]
})
export class UserManualModule { }