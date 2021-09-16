import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
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
     /* {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },*/
      
     {
        path: 'home',
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
        path: 'search-registered-user',
        loadChildren: () => import('./views/UserAccount/search-registered-user/user-permission.module').then(m => m.UserPermissionModule),canActivate:[AuthGuard]
      }, 
      {
        path: 'change-password',
        loadChildren: () => import('./views/change-password/change-password.module').then(m => m.ChangePasswordModule)
      },
      {
        path: 'welcome',
        loadChildren: () => import('./views/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: 'ccsoutward',
        loadChildren: () => import('./views/ccs-report/ccsoutward/ccs-outward.module').then(m => m.CCSOutwardModule),canActivate:[AuthGuard]
      },
      {
         path: 'ccsinward',
         loadChildren: () => import('./views/ccs-report/ccsinward/ccs-inward.module').then(m => m.CCSInwardModule),canActivate:[AuthGuard]
      },
      {
        path: 'achoutward',
        loadChildren: () => import('./views/ach-report/achoutward/ach-outward.module').then(m => m.ACHOutwardModule)
      },
      {
         path: 'achinward',
         loadChildren: () => import('./views/ach-report/achinward/ach-inward.module').then(m => m.ACHInwardModule)
      },
      {
        path: 'bank-statement',
        loadChildren: () => import('./views/BankStatement/bank-statement.module').then(m => m.BankStatementModule)
      },
      {
        path: 'loanContract',
        loadChildren: () => import('./views/loan-contract/loan-contract.module').then(m => m.LoanContractModule),canActivate:[AuthGuard]
      },
      {
        path: 'mpuist',
        loadChildren: () => import('./views/mpuist/mpuist.module').then(m => m.MPUISTModule),canActivate:[AuthGuard]
      }
      ,
      {
        path: 'gt-trial-report',
        loadChildren: () => import('./views/TrialReport/trial-report/trial-report.module').then(m => m.TrialReportModule),canActivate:[AuthGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
