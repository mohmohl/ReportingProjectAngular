import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { ConsoLiabilitiesRoutingModule } from './conso-liabilities-routing.module';
import { ConsoLiabilitiesComponent } from './conso-liabilities.component';

@NgModule({
  imports: [
    CommonModule,
    ConsoLiabilitiesRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [ConsoLiabilitiesComponent]
})
export class ConsoLiabilitiesModule { }