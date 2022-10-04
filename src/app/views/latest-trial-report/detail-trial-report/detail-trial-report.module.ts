import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { DetailTrialReportRoutingModule } from './detail-trial-report-routing.module';
import { DetailTrialReportComponent } from './detail-trial-report.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  imports: [
    CommonModule,
    DetailTrialReportRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [DetailTrialReportComponent]
})
export class DetailTrialReportModule { }