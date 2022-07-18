import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../shared/shared.module';
import { DWRMTOBREncashRoutingModule } from './dw_rmtobrencash-routing.module';
import { DwRmtobrencashComponent } from './dw-rmtobrencash.component';

@NgModule({
  imports: [
    CommonModule,
    DWRMTOBREncashRoutingModule,
    SharedModule
  ],
  declarations: [DwRmtobrencashComponent]
})
export class DWRMTOBREncashModule { }