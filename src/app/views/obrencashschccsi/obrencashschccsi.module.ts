import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule,MatFormFieldModule } from '@angular/material';
import {SharedModule} from '../../shared/shared.module';
import { OBREncashSchCCSIRoutingModule } from './obrencashschccsi-routing.module';
import { ObrencashschccsiComponent } from './obrencashschccsi.component';

@NgModule({
  imports: [
    CommonModule,
    OBREncashSchCCSIRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [ObrencashschccsiComponent]
})
export class OBREncashSchCCSIModule { }