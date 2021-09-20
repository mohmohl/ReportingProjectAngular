import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import {BankStatementViewComponent} from './bank-statement-view.component';

const routes: Routes = [
  {
    path: '',
    component: BankStatementViewComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Bank Statement View',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Bank Statement View',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankStatementViewRoutingModule { }
