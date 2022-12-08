import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import { InstrumentRoutingModule} from './instrument-routing.module';
import {InstrumentComponent } from './instrument.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    InstrumentRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [InstrumentComponent]
})
export class InstrumentModule { } 