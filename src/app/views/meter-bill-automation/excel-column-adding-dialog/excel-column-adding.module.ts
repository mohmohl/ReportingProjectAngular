import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';


import {SharedModule} from '../../../shared/shared.module';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { ExcelColumnAddingComponent } from './excel-column-adding.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [ExcelColumnAddingComponent],
  entryComponents: [ExcelColumnAddingComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: []
})
export class ExcelColumnAddingModule {}
