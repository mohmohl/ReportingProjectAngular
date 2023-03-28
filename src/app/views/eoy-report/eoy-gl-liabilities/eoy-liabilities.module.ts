import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { EOYLiabilitiesRoutingModule } from './eoy-liabilities-routing.module';
import { EOYLiabilitiesComponent } from './eoy-liabilities.component';

@NgModule({
  imports: [
    CommonModule,
    EOYLiabilitiesRoutingModule,
    SharedModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [EOYLiabilitiesComponent]
})
export class EOYLiabilitiesModule { }