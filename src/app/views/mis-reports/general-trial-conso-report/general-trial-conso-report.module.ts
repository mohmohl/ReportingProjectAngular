import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { GeneralTrialConsoReportComponent } from './general-trial-conso-report.component';
import { GeneralTrialConsoReportRoutingModule } from './general-trial-conso-report-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  imports: [
    CommonModule,
    GeneralTrialConsoReportRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [GeneralTrialConsoReportComponent]
})
export class GeneralTrialConsoReportModule { }