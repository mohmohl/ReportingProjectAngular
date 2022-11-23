import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { RegionalLoanRoutingModule } from './regional-loan-routing.module';
import { RegionalLoanComponent } from './regional-loan.component';


@NgModule({
  declarations: [
    RegionalLoanComponent
  ],
  imports: [
    CommonModule,
    RegionalLoanRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ]
})
export class RegionalLoanModule { }
