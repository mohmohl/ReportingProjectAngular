import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankCashRoutingModule } from './bank-cash-routing.module';
import { BankCashComponent } from './bank-cash.component';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [BankCashComponent],
  imports: [
    CommonModule,
    BankCashRoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule,
  ]
})
export class BankCashModule { }
