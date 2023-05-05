import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { EOYConsoAssetsComponent } from './eoy-assets.component';
import { EOYConsoAssetsRoutingModule } from './eoy-assets-routing.module';



@NgModule({
  imports: [
    CommonModule,
    EOYConsoAssetsRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [EOYConsoAssetsComponent]
})
export class EOYConsoAssetsModule { }