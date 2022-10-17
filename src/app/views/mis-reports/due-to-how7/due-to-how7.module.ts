import { SharedModule } from './../../../shared/shared.module';
import { DueToHOW7Component } from './due-to-how7.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DueToHOW7RoutingModule } from './due-to-how7-routing.module';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';


@NgModule({
  declarations: [
    DueToHOW7Component
  ],
  imports: [
    CommonModule,
    DueToHOW7RoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule,
  ]
})
export class DueToHOW7Module { }
