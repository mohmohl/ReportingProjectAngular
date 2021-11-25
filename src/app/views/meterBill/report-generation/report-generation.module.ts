import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { ReportGenerationRoutingModule } from './report-generation-routing.module';
import { ReportGenerationComponent } from './report-generation.component';

@NgModule({
  imports: [
    CommonModule,
    ReportGenerationRoutingModule,
    SharedModule
  ],
  declarations: [ReportGenerationComponent]
})
export class ReportGenerationModule { }
