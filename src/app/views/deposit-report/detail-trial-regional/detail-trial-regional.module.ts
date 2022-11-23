import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { DetailTrialRegionalComponent } from './detail-trial-regional.component';
import { DetailTrialRegionalRoutingModule } from './detail-trial-regional-routing.module';


@NgModule({
  declarations: [
    DetailTrialRegionalComponent
  ],
  imports: [
    CommonModule,
    DetailTrialRegionalRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ]
})
export class DetailTrialRegionalModule { }
