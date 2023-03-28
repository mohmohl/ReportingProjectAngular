import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { MfiuSetupComponent } from './mfiu-setup.component';
import { MFIUSetupRoutingModule } from './mfiu-setup-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MFIUSetupRoutingModule,
    SharedModule
  ],
  declarations: [MfiuSetupComponent]
})
export class  MFIUSetupModule { }
