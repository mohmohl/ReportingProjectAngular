import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { FcdbNewUserComponent } from './fcdb-new-user.component';
import { FcdbNewUserRoutingModule } from './fcdb-new-user-routing.module';


@NgModule({
  declarations: [
    FcdbNewUserComponent
  ],
  imports: [
    CommonModule,
    FcdbNewUserRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ]
})
export class FcdbNewUserModule { }
