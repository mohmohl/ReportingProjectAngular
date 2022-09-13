import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { FcdbInfo2Component } from './fcdb-info2.component';
import { FcdbInfo2RoutingModule } from './fcdb-info2-routing.module';


@NgModule({
  declarations: [
    FcdbInfo2Component
  ],
  imports: [
    CommonModule,
    FcdbInfo2RoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ]
})
export class FcdbInfo2Module { }
