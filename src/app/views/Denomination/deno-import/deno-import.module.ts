import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DenoImportRoutingModule } from './deno-import-routing.module';
import { DenoImportComponent } from './deno-import.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    DenoImportRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [DenoImportComponent]
})
export class DenoImportModule { }