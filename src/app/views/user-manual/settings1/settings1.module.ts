import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { Settings1RoutingModule } from './settings1-routing.module';
import { Settings1Component } from './settings1.component';

@NgModule({
  imports: [
    CommonModule,
    Settings1RoutingModule,
    SharedModule
  ],
  declarations: [Settings1Component]
})
export class Settings1Module { }