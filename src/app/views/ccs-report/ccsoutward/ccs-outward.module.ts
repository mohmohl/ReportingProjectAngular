import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CCSOutwardRoutingModule} from './ccs-outward-routing.module';
import {CcsoutwardComponent } from './ccsoutward.component';
import {SharedModule} from '../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CCSReportService } from 'src/services/CCSReportService';

@NgModule({
  imports: [
    CommonModule,
    CCSOutwardRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  declarations: [
      CcsoutwardComponent
  ],
  providers:[
    CCSReportService
  ]
})
export class CCSOutwardModule { }