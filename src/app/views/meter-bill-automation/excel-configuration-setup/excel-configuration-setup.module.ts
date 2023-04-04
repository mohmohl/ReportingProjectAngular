import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {SharedModule} from '../../../shared/shared.module';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule } from '@angular/material';
import { ExcelConfigurationSetupComponent } from './excel-configuration-setup.component';
import { ExcelConfigurationSetupRoutingModule } from './excel-configuration-setup-routing.module';
import { ExcelColumnAddingModule } from '../excel-column-adding-dialog/excel-column-adding.module';

@NgModule({
  imports: [
    CommonModule,
    ExcelConfigurationSetupRoutingModule,
    SharedModule,
    ExcelColumnAddingModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule
  ],
  declarations: [ExcelConfigurationSetupComponent]
})
export class ExcelConfigurationSetupModule { }