import { TrialSheetComponent } from './trial-sheet.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrialSheetRoutingModule } from './trial-sheet-routing.module';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TrialSheetComponent,
  ],
  imports: [
    CommonModule,
    TrialSheetRoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule,
  ]
})
export class TrialSheetModule { }
