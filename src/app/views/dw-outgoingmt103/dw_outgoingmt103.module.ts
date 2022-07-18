import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../shared/shared.module';
import { DWOutgoingMT103RoutingModule } from './dw_outgoingmt103-routing.module';
import { DwOutgoingmt103Component } from './dw-outgoingmt103.component';

@NgModule({
  imports: [
    CommonModule,
    DWOutgoingMT103RoutingModule,
    SharedModule
  ],
  declarations: [DwOutgoingmt103Component]
})
export class DWOutgoingMT103Module { }