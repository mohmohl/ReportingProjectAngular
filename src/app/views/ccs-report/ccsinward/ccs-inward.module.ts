import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CCSInwardRoutingModule} from './ccs-inward-routing.module';
import {CcsinwardComponent } from './ccsinward.component';
import {SharedModule} from '../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { CCSReportService } from 'src/services/CCSReportService';

@NgModule({
  imports: [
    CommonModule,
    CCSInwardRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    CcsinwardComponent
  ],
  providers:[
    CCSReportService
  ]
})
export class CCSInwardModule { }