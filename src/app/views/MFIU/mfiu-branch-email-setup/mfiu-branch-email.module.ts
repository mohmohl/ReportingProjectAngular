import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { MfiuBranchEmailSetupComponent } from './mfiu-branch-email-setup.component';
import { MFIUBranchEmailSetupRoutingModule } from './mfiu-branch-email-setup-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MFIUBranchEmailSetupRoutingModule,
    SharedModule
  ],
  declarations: [MfiuBranchEmailSetupComponent]
})
export class  MFIUBranchEmailSetupModule { }
