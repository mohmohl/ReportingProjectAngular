import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../shared/shared.module';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ACHOutwardRoutingModule } from './ach-outward-routing.module';
import { AchoutwardComponent } from './achoutward.component';

@NgModule({
  imports: [
    CommonModule,
    ACHOutwardRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  declarations: [
    AchoutwardComponent
  ]
})
export class ACHOutwardModule { }