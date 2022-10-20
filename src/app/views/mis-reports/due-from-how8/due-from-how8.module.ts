import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { DueFromHOW8RoutingModule } from './due-from-how8-routing.module';
import { DueFromHOW8Component } from './due-from-how8.component';


@NgModule({
  declarations: [
    DueFromHOW8Component
  ],
  imports: [
    CommonModule,
    DueFromHOW8RoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule,
  ]
})
export class DueFromHOW8Module { }
