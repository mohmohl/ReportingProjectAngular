import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { BsUserReportComponent } from './bs-user-report.component';
import { BsUserReportRoutingModule } from './bs-user-report-routing.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BsUserReportRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [BsUserReportComponent]
})
export class BsUserReportModule { }