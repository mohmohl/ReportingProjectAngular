import { SharedModule } from './../../../shared/shared.module';
import { FormOneComponent } from './form-one.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormOneRoutingModule } from './form-one-routing.module';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';


@NgModule({
  declarations: [
    FormOneComponent
  ],
  imports: [
    CommonModule,
    FormOneRoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule,
  ]
})
export class FormOneModule { }
