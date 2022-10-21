import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { HOD9Component } from './cashinhand-hod9.component';
import { HOD9RoutingModule } from './cashinhand-hod9.routing.module';


@NgModule({
  declarations: [
    HOD9Component
  ],
  imports: [
    CommonModule,
    HOD9RoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule,
  ]
})
export class HOD9Module { }
