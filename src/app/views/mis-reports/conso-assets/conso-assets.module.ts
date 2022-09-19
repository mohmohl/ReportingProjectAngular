import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoAssetsRoutingModule } from './conso-assets-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConsoAssetsComponent } from './conso-assets.component';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    ConsoAssetsRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [ConsoAssetsComponent]
})
export class ConsoAssetsModule { }