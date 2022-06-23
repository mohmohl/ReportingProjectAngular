import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { MABDocUploadComponent } from './mab-doc-upload.component';

const routes: Routes = [
  {
    path: '',
    component: MABDocUploadComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'MAB Doc Upload',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit - Sample Page',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MABDocUploadRoutingModule { }
