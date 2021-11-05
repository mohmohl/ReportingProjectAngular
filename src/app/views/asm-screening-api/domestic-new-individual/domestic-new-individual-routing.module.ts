import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { DomesticNewIndividualComponent } from './domestic-new-individual.component';

const routes: Routes = [
  {
    path: '',
    component: DomesticNewIndividualComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Domestic New Individual',
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
export class DomesticNewIndividualRoutingModule { }