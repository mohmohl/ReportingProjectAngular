import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { GeneralTrialReportRoutingModule } from './general-trial-report-routing.module';
import { GeneralTrialReportComponent } from './general-trial-report.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    GeneralTrialReportRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [GeneralTrialReportComponent]
})
export class GeneralTrialReportModule { }