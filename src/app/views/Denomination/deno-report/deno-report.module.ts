import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DenoReportRoutingModule } from './deno-report-routing.module';
import { DenoReportComponent } from './deno-report.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    DenoReportRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [DenoReportComponent]
})
export class DenoReportModule { }