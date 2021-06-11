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
      },
     {
        path: 'simple-page',
        loadChildren: () => import('./simple-page/simple-page.module').then(m => m.SimplePageModule), canActivate:[AuthGuard]
      }, 
      {
        path: 'access-denied',
        loadChildren: () => import('./views/access-denied/access-denied.module').then(m => m.AccessDeniedModule)
      }, 
      {
        path: 'search-user',
        loadChildren: () => import('./views/UserAccount/search-user/search-user.module').then(m => m.SearchUserModule),canActivate:[AuthGuard]
      }, 
      {
        path: 'user-registration/:userId',
        loadChildren: () => import('./views/UserAccount/user-registration/user-registration.module').then(m => m.UserRegistrationModule)
      },
      {
        path: 'welcome',
        loadChildren: () => import('./views/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: 'ccsoutward',
        loadChildren: () => import('./views/ccs-report/ccsoutward/ccs-outward.module').then(m => m.CCSOutwardModule)
      },
      {
         path: 'ccsinward',
         loadChildren: () => import('./views/ccs-report/ccsinward/ccs-inward.module').then(m => m.CCSInwardModule)
      },
      {
        path: 'bank-statement',
        loadChildren: () => import('./views/BankStatement/bank-statement.module').then(m => m.BankStatementModule)
      },
      {
        path: 'loanContract',
        loadChildren: () => import('./views/loan-contract/loan-contract.module').then(m => m.LoanContractModule),canActivate:[AuthGuard]
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
