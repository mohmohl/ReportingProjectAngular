import {CustFcdbFcubsComponent } from './cust-fcdb-fcubs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustFcdbFcubsRoutingModule } from './cust-fcdb-fcubs-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';


@NgModule({
  declarations: [
    CustFcdbFcubsComponent
  ],
  imports: [
    CommonModule,
    CustFcdbFcubsRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ]
})
export class CustFcdbFcubsModule { }
