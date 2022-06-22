import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../shared/shared.module';
import { DwIncomingmt103Component } from './dw-incomingmt103.component';
import { DWIncomingMT103RoutingModule } from './dw_incomingmt103-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DWIncomingMT103RoutingModule,
    SharedModule
  ],
  declarations: [DwIncomingmt103Component]
})
export class DWIncomingMT103Module { }