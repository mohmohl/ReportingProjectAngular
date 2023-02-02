
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { FinancialPositionComponent } from './financial-position.component';
import { FinancialPositionRoutingModule } from './financial-position-routing.module';


@NgModule({
  declarations: [
    FinancialPositionComponent
  ],
  imports: [
    CommonModule,
    FinancialPositionRoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule,
  ]
})
export class FinancialPositionModule { }
