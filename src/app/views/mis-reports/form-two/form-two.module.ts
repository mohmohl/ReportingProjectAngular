import { FormTwoComponent } from './form-two.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormTwoRoutingModule } from './form-two-routing.module';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FormTwoComponent
  ],
  imports: [
    CommonModule,
    FormTwoRoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule,
  ]
})
export class FormTwoModule { }
