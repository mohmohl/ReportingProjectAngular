import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { MfiuBranchEmailSetupComponent } from './mfiu-branch-email-setup.component';
import { MFIUBranchEmailSetupRoutingModule } from './mfiu-branch-email-setup-routing.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
@NgModule({
  imports: [
    CommonModule,
    MFIUBranchEmailSetupRoutingModule,
    SharedModule,
    AngularEditorModule
  ],
  declarations: [MfiuBranchEmailSetupComponent]
})
export class  MFIUBranchEmailSetupModule { }
