import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MabDenoReportRoutingModule } from './mab-deno-report-routing.module';
import { MabDenoReportComponent } from './mab-deno-report.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MabDenoReportRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [MabDenoReportComponent]
})
export class MabDenoReportModule { }