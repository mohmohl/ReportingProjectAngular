import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { MfiuEmailTemplateComponent } from './mfiu-email-template.component';
import { MFIUEmailTemplateRoutingModule } from './mfiu-email-template-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MFIUEmailTemplateRoutingModule,
    SharedModule
  ],
  declarations: [MfiuEmailTemplateComponent]
})
export class  MFIUEmailTemplateModule { }
