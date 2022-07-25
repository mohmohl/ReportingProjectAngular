import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsUserHomeBranchReportRoutingModule } from './bs-user-home-branch-report-routing.module';
import { BsUserHomeBranchReportComponent } from './bs-user-home-branch-report.component';

@NgModule({
  imports: [
    CommonModule,
    BsUserHomeBranchReportRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [BsUserHomeBranchReportComponent]
})
export class BsUserHomeBranchReportModule { }