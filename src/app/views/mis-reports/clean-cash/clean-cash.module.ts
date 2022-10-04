import { CleanCashComponent } from './clean-cash.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CleanCashRoutingModule } from './clean-cash-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';


@NgModule({
  declarations: [
    CleanCashComponent
  ],
  imports: [
    CommonModule,
    CleanCashRoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule,
  ]
})
export class CleanCashModule { }
