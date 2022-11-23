import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { RegionalDepositRoutingModule } from './regional-deposit-routing.module';
import { RegionalDepositComponent } from './regional-deposit.component';


@NgModule({
  declarations: [
    RegionalDepositComponent
  ],
  imports: [
    CommonModule,
    RegionalDepositRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ]
})
export class RegionalDepositModule { }
