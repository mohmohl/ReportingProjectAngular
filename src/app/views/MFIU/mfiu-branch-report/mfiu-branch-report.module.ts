import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { MfiuBranchReportComponent } from './mfiu-branch-report.component';
import { MFIUBranchReportRoutingModule } from './mfiu-branch-report-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MFIUBranchReportRoutingModule,
    SharedModule
  ],
  declarations: [MfiuBranchReportComponent]
})
export class MFIUBranchReportModule { }
