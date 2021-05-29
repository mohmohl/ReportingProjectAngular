import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import {AdminComponent} from './layouts/admin/admin.component';
import {AuthComponent} from './layouts/auth/auth.component';
import { SimplePageComponent } from './simple-page/simple-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
     
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }, {
        path: 'basic',
        loadChildren: () => import('./components/basic/basic.module').then(m => m.BasicModule)
      }, {
        path: 'notifications',
        loadChildren: () => import('./components/advance/notifications/notifications.module').then(m => m.NotificationsModule)
      }, {
        path: 'forms',
        loadChildren: () => import('./components/forms/basic-elements/basic-elements.module').then(m => m.BasicElementsModule)
      }, {
        path: 'bootstrap-table',
        loadChildren: () => import('./components/tables/bootstrap-table/basic-bootstrap/basic-bootstrap.module').then(m => m.BasicBootstrapModule),
      }, {
        path: 'map',
        loadChildren: () => import('./map/google-map/google-map.module').then(m => m.GoogleMapModule),
      }, {
        path: 'simple-page',
        loadChildren: () => import('./simple-page/simple-page.module').then(m => m.SimplePageModule)
      },
      {
        path: 'welcome',
        loadChildren: () => import('./views/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: 'searchPDF',
        loadChildren: () => import('./views/search-pdf/search-pdf.module').then(m => m.SearchPDFModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
