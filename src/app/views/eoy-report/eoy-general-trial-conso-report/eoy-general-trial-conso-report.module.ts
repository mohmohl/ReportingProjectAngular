import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EOYGeneralTrialConsoReportRoutingModule } from './eoy-general-trial-conso-report-routing.module';
import { EOYGeneralTrialConsoReportComponent } from './eoy-general-trial-conso-report.component';

@NgModule({
  imports: [
    CommonModule,
    EOYGeneralTrialConsoReportRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [EOYGeneralTrialConsoReportComponent]
})
export class EOYGeneralTrialConsoReportModule { }