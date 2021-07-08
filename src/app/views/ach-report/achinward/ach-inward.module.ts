import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import {SharedModule} from '../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { AchinwardComponent } from './achinward.component';
import { ACHInwardRoutingModule } from './ach-inward-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ACHInwardRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    AchinwardComponent
  ]
})
export class ACHInwardModule { }