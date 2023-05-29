import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { MfiuRemoveSendComponent } from './mfiu-remove-send.component';

const routes: Routes = [
  {
    path: '', component: MfiuRemoveSendComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'MFIU Remove Send',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'MFIU Remove Send',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MFIURemoveSendRoutingModule { }
