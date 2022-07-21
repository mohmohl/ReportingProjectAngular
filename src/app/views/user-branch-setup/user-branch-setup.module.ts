import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserBranchSetupComponent } from './user-branch-setup.component';
import { UserBranchSetUpRoutingModule } from './user-branch-setup-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserBranchSetUpRoutingModule,
    SharedModule
  ],
  declarations: [UserBranchSetupComponent]
})
export class UserBranchSetupModule { }