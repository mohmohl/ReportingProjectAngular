import { AllBranchDetailTrialComponent } from './all-branch-detail-trial.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllBranchDetailTrialRoutingModule } from './all-branch-detail-trial-routing.module';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AllBranchDetailTrialComponent
  ],
  imports: [
    CommonModule,
    AllBranchDetailTrialRoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule,
  ]
})
export class AllBranchDetailTrialModule { }
