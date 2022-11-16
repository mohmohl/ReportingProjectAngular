import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DailyDenoRecordRoutingModule } from './daily-deno-record-routing.module';
import { DailyDenoRecordComponent } from './daily-deno-record.component';
import { SharedModule } from '../../shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    DailyDenoRecordRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [DailyDenoRecordComponent]
})
export class DailyDenoRecordModule { }