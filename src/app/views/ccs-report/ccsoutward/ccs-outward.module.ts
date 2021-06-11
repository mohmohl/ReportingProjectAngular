import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CCSOutwardRoutingModule} from './ccs-outward-routing.module';
import {CcsoutwardComponent } from './ccsoutward.component';
import {SharedModule} from '../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CCSOutwardRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  declarations: [
      CcsoutwardComponent
  ]
})
export class CCSOutwardModule { }