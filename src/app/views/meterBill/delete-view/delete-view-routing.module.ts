import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { DeleteViewComponent } from './delete-view.component';

const routes: Routes = [
  {
    path: '', component: DeleteViewComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Delete View',
      icon: 'icofont icofont-file-document bg-c-pink',
      breadcrumb_caption: 'Delete View',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteViewRoutingModule { }
