import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { DepositBalance1RoutingModule } from './deposit-balance-1-routing.module';
import { DepositBalance1Component } from './deposit-balance-1.component';


@NgModule({
  declarations: [DepositBalance1Component],
  imports: [
    CommonModule,
    DepositBalance1RoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule,
  ]
})
export class DepositBalance1Module { }
