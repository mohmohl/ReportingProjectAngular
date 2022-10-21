import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PassbookPrintingComponent } from './passbook-printing.component';


const routes: Routes = [
  {
    path: '',
    component: PassbookPrintingComponent,
    //canActivate: [AuthGuard],
    data: {
      breadcrumb: 'PASSBOOK PRINTING',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'PASSBOOK PRINTING',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassbookPrintingRoutingModule { }
