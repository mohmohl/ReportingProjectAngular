import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { VendorRegistrationRoutingModule } from './vendor-registration-routing.module';
import { VendorRegistrationComponent } from './vendor-registration.component';

@NgModule({
  imports: [
    CommonModule,
    VendorRegistrationRoutingModule,
    SharedModule
  ],
  declarations: [VendorRegistrationComponent]
})
export class VendorRegistrationModule { }
