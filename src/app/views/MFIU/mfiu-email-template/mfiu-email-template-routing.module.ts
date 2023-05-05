import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { MfiuEmailTemplateComponent } from './mfiu-email-template.component';

const routes: Routes = [
  {
    path: '', component: MfiuEmailTemplateComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'MFIU Email Template',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'MFIU Email Template',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MFIUEmailTemplateRoutingModule { }
