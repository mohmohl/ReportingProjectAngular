import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { MebHOW6Component } from './meb-how6.component';
import { MEBHOW6RoutingModule } from './meb-how6-routing.module';




@NgModule({
  declarations: [
   MebHOW6Component
  ],
  imports: [
    CommonModule,
    MEBHOW6RoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule,
  ]
})
export class MEBHOW6Module { }
