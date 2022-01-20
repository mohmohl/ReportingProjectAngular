import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { SearchPDFReportRoutingModule} from './search-pdf-report-routing.module';
import {SearchPdfReportComponent } from './search-pdf-report.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SearchPDFReportRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [SearchPdfReportComponent]
})
export class SearchPDFReportModule { }