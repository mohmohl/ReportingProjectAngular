import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { MfiuHoReportComponent } from './mfiu-ho-report.component';
import { MFIUHOReportRoutingModule } from './mfiu-ho-report-routing.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MFIUHOReportRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [MfiuHoReportComponent]
})
export class MFIUHOReportModule { }
