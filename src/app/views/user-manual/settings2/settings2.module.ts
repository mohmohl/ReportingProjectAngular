import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { Settings2RoutingModule } from './settings2-routing.module';
import { Settings2Component } from './settings2.component';


@NgModule({
  imports: [
    CommonModule,
    Settings2RoutingModule,
    SharedModule
  ],
  declarations: [Settings2Component]
})
export class Settings2Module { }