import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { DenoImportComponent } from './deno-import.component';

const routes: Routes = [
  {
    path: '',
    component: DenoImportComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Loan Contract',
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
export class DenoImportRoutingModule { }
