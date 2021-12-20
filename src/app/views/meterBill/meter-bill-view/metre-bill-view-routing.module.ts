import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { MeterBillViewComponent } from './meter-bill-view.component';

const routes: Routes = [
  {
    path: '', component: MeterBillViewComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Mertre Bill View',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Merter Bill Upload',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetreBillViewRoutingModule { }
