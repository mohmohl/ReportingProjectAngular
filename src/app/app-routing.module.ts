import { TrialSheetComponent } from './views/mis-reports/trial-sheet/trial-sheet.component';
import { CleanCashModule } from './views/mis-reports/clean-cash/clean-cash.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthGuard } from 'src/helpers/auth.guard';
import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';

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
        loadChildren: () => import('./simple-page/simple-page.module').then(m => m.SimplePageModule), canActivate: [AuthGuard]
      },
      {
        path: 'access-denied',
        loadChildren: () => import('./views/access-denied/access-denied.module').then(m => m.AccessDeniedModule)
      },
      {
        path: 'search-user',
        loadChildren: () => import('./views/UserAccount/search-user/search-user.module').then(m => m.SearchUserModule), canActivate: [AuthGuard]
      },
      {
        path: 'manage-role',
        loadChildren: () => import('./views/UserAccount/manage-role/manage-role.moudle').then(m => m.ManageRoleModule)
      },
      {
        path: 'role-setup',
        loadChildren: () => import('./views/UserAccount/role-setup/role-setup.moudle').then(m => m.RoleSetupModule)
      },
      {
        path: 'user-registration',
        loadChildren: () => import('./views/UserAccount/user-registration/user-registration.module').then(m => m.UserRegistrationModule)
      },
      {
        path: 'search-registered-user',
        loadChildren: () => import('./views/UserAccount/search-registered-user/user-permission.module').then(m => m.UserPermissionModule), canActivate: [AuthGuard]
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
        loadChildren: () => import('./views/ccs-report/ccsoutward/ccs-outward.module').then(m => m.CCSOutwardModule), canActivate: [AuthGuard]
      },
      {
        path: 'ccsinward',
        loadChildren: () => import('./views/ccs-report/ccsinward/ccs-inward.module').then(m => m.CCSInwardModule), canActivate: [AuthGuard]
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
        loadChildren: () => import('./views/loan-contract/loan-contract.module').then(m => m.LoanContractModule), canActivate: [AuthGuard]
      },
      {
        path: 'mpuist',
        loadChildren: () => import('./views/mpuist/mpuist.module').then(m => m.MPUISTModule), canActivate: [AuthGuard]
      },      
      {
        path: 'bypass-account-list',
        loadChildren: () => import('./views/bypass/bypass-account-list/bypass-account-list-module').then(m => m.ByPassAccountListModule), canActivate: [AuthGuard]
      },
      {
        path: 'bypass-new-account',
        loadChildren: () => import('./views/bypass/bypass-new-account/bypass-new-account-module').then(m => m.ByPassNewAccountModule), canActivate: [AuthGuard]
      },
      {
        path: 'bypass-edit-account/:param1',
        loadChildren: () => import('./views/bypass/bypass-edit-account/bypass-edit-account.module').then(m => m.ByPassEditAccountModule), canActivate: [AuthGuard]
      },
      {
        path: 'bank-statement-view',
        loadChildren: () => import('./views/bank-statement-view/bank-statement-view.module').then(m => m.BankStatementViewModule)
      },
      {
        path: 'deno-import',
        loadChildren: () => import('./views/Denomination/deno-import/deno-import.module').then(m => m.DenoImportModule)
      },
      {
        path: 'deno-report',
        loadChildren: () => import('./views/Denomination/deno-report/deno-report.module').then(m => m.DenoReportModule)
      },
      {
        path: 'mab-survey-question',
        loadChildren: () => import('./views/MABQA/mab-survey-question/mab-survey-question.module').then(m => m.MABSurveyQuestionModule)
      },
      {
        path: 'mab-survey-form',
        loadChildren: () => import('./views/MABQA/mab-question-answer/mab-question-answer.module').then(m => m.MABQuestionAnswerModule)
      },
      {
        path: 'mab-survey-report',
        loadChildren: () => import('./views/MABQA/mab-answer-view/mab-answer-view.module').then(m => m.MABAnswerViewModule)
      },
      {
        path: 'mab-survey-setting',
        loadChildren: () => import('./views/MABQA/mab-survey-setting/mab-survey-setting.module').then(m => m.MABSurveySettingModule)
      },
      {
        path: 'meter-bill-upload',
        loadChildren: () => import('./views/meterBill/metre-bill-upload/metre-bill-upload.module').then(m => m.MetreBillUploadModule)
      },
      {
        path: 'vendor-registration',
        loadChildren: () => import('./views/meterBill/vendor-registration/vendor-registration.module').then(m => m.VendorRegistrationModule)
      },
      {
        path: 'vendor-meter-bill-upload',
        loadChildren: () => import('./views/meterBill/vendor-meter-bill-upload/vendor-meter-bill-upload.module').then(m => m.VendorMetreBillUploadModule)
      },
      {
        path: 'report-generation',
        loadChildren: () => import('./views/meterBill/report-generation/report-generation.module').then(m => m.ReportGenerationModule)
      },
      {

        path: 'mmcb-data-upload',
        loadChildren: () => import('./views/mmcb-data-upload/mmcb-data-upload.module').then(m => m.MMCBDataUploadModule)
      },
      {
        path: 'mab-doc-upload',
        loadChildren: () => import('./views/mab-doc-upload/upload-doc/mab-doc-upload.module').then(m => m.MABDocUploadModule)
      },
      {
        path: 'mab-doc-view',
        loadChildren: () => import('./views/mab-doc-upload/view-doc/mab-doc-view.module').then(m => m.MABDocViewModule)
      },
      {
        path: 'mab-doc-view-management',
        loadChildren: () => import('./views/mab-doc-upload/view-doc-management/mab-doc-view-management.module').then(m => m.MABDocViewManagementModule)
      },
      {
        path: 'meter-bill-view',
        loadChildren: () => import('./views/meterBill/meter-bill-view/metre-bill-view.module').then(m => m.MetreBillViewModule)
      },
      {
        path: 'vendor-meter-bill-view',
        loadChildren: () => import('./views/meterBill/vendor-meter-bill-view/vendor-meter-bill-view.module').then(m => m.VendorMetreBillViewModule)
      },
      {
        path: 'delete-view',
        loadChildren: () => import('./views/meterBill/delete-view/delete-view.module').then(m => m.DeleteViewModule)
      },
      {
        path: 'accrual_domestic_daybook',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data: { param: "Accrual Domestic Daybook" }
      },
      {
        path: 'accrual_transfer_scroll',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data: { param: "Accrual Transfer Scroll" }
      },
      {
        path: 'bank_cash',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data: { param: "Bank Cash Scroll" }
      },
      {
        path: 'clean_cash',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data: { param: "Clean Cash Scroll" }
      },
      {
        path: 'current_account_daybook',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data: { param: "Current Account Daybook" }
      },
      {
        path: 'domestic_daybook',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data: { param: "Daybook Domestic" }
      },
      {
        path: 'detail_trial',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data: { param: "Detail Trial" }
      },
      {
        path: 'general_trial',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data: { param: "General Trial" }
      },
      {
        path: 'od_account_daybook',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data: { param: "OD Account Daybook" }
      },
      {
        path: 'transfer_scroll',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data: { param: "Transfer Scroll" }
      },
      {
        path: 'trial_sheet',
        loadChildren: () => import('./views/back-date-report/search-pdf-report/search-pdf-report.module').then(m => m.SearchPDFReportModule),
        data: { param: "Trial Sheet" }
      },
      {
        path: 'bypass-new-bc-account',
        loadChildren: () => import('./views/bypass/bypass-new-bc-account/bypass-new-bc-account-module').then(m => m.ByPassNewBCAccountModule)
      },
      {
        path: 'bypass-bc-account-list',
        loadChildren: () => import('./views/bypass/bypass-bc-account-list/bypass-bs-account-list-module').then(m => m.ByPassBCAccountListModule)
      },
      {
        path: 'auth-forgot-password',
        loadChildren: () => import('./views/auth-forgot-password/auth-forgot-password.module').then(m => m.AuthForgotPasswordModule)
      },
      {
        path: 'add-menu',
        loadChildren: () => import('./views/add-menu/add-menu.module').then(m => m.AddMenuModule)
      },
      {
        path: 'add-category',
        loadChildren: () => import('./views/add-category/add-category.module').then(m => m.AddCategoryModule)
      },
      {

        path: 'duplicate-nrc-customer-list',
        loadChildren: () => import('./views/wrong-customer-nrc-update/view-wrong-customer-nrc/wrong-cust-nrc-view.module').then(m => m.WrongCustomerNRCViewModule)
      },
      {
        path: 'duplicate-nrc-customer-update',
        loadChildren: () => import('./views/wrong-customer-nrc-update/update-wrong-customer-nrc/wrong-cust-nrc-update.module').then(m => m.WrongCustomerNRCUpdateModule)
      },
      {
        path: 'user_manual',
        loadChildren: () => import('./views/user-manual/user-manual/user-manual.module').then(m => m.UserManualModule)
      },
      {
        path: 'subsidaryledger',
        loadChildren: () => import('./views/ft-transaction-reports/dw-subsiledger/dw_subsiledger.module').then(m => m.DWSubsiLedgerModule)
      },
      {
        path: 'domesticftransfer',
        loadChildren: () => import('./views/ft-transaction-reports/dw-domesticsfundtransfer/dw_domesticsfundtransfer.module').then(m => m.DWDomesticsFundTransferModule)
      },
      {
        path: 'domesticftransferreversal',
        loadChildren: () => import('./views/ft-transaction-reports/dw-domestictransferreversal/dw_domestictransferreversal.module').then(m => m.DWDomesticTransferReversalModule)
      }
      ,
      {
        path: 'file-directory',
        loadChildren: () => import('./views/user-manual/settings1/settings1.module').then(m => m.Settings1Module)
      },
      {
        path: 'role',
        loadChildren: () => import('./views/user-manual/settings2/settings2.module').then(m => m.Settings2Module)
      },
      {
        path: 'duplicate-channel-user',
        loadChildren: () => import('./views/fcdb/duplicate-channel-user/duplicate-channel-user.module').then(m => m.DuplicateChannelUserModule), canActivate: [AuthGuard]
      },
      {
        path: 'duplicate-channel-user-checker',
        loadChildren: () => import('./views/fcdb/duplicate-channel-user-checker/duplicate-channel-user-checker.module').then(m => m.DuplicateChannelUserCheckerModule), canActivate: [AuthGuard]
      },
      {
        path: 'fcdb-new-user',
        loadChildren: () => import('./views/fcdb/fcdb-new-user/fcdb-new-user.module').then(m => m.FcdbNewUserModule), canActivate: [AuthGuard]
      },
      {
        path: 'dailyftransfer',
        loadChildren: () => import('./views/ft-transaction-reports/dw-dailyfundtransfer/dw_dailyfundtransfer.module').then(m => m.DWDailyFundTransferModule)
      },
      {
        path: 'crossccytransfer',
        loadChildren: () => import('./views/ft-transaction-reports/dw-cctransfer/dw_cctransfer.module').then(m => m.DWCCTransferModule)
      },
      {
        path: 'obrencashccsi',
        loadChildren: () => import('./views/ft-transaction-reports/dw-obrencashccsi/dw_obrencashccsi.module').then(m => m.DWOBREncashCCSIModule)
      },
      {
        path: 'cctodrawing',
        loadChildren: () => import('./views/ft-transaction-reports/dw-cctodrawing/dw_cctodrawing.module').then(m => m.DWCCTODrawingModule)
      },
      {
        path: 'cctodrawingreversal',
        loadChildren: () => import('./views/ft-transaction-reports/dw-cctodrawingreversal/dw_cctodrawingreversal.module').then(m => m.DWCCTODrawingReversalModule)
      },
      {
        path: 'obrencashfpti',
        loadChildren: () => import('./views/ft-transaction-reports/dw-obrencashfpti/dw_obrencashfpti.module').then(m => m.DWOBREncashFPTIModule)
      },
      {

        path: 'cctoencash',
        loadChildren: () => import('./views/ft-transaction-reports/dw-cctoencashschedule/dw_cctoencashschedule.module').then(m => m.DWCCTOEncashScheduleModule)
      },
      {
        path: 'obrencashment',
        loadChildren: () => import('./views/ft-transaction-reports/dw-obrencashment/dw_obrencashment.module').then(m => m.DWObrEncashmentModule)
      },
      {
        path: 'obrencashtransfer',
        loadChildren: () => import('./views/ft-transaction-reports/dw-obrencashtransfer/dw_obrencashtransfer.module').then(m => m.DWObrEncashTransferModule)
      },
      {
        path: 'rmtobrdrawing',
        loadChildren: () => import('./views/ft-transaction-reports/dw-rmtobrdrawing/dw_rmtobrdrawing.module').then(m => m.DWRMTOBRDrawingModule)
      },
      {
        path: 'rmtobrencash',
        loadChildren: () => import('./views/ft-transaction-reports/dw-rmtobrencash/dw_rmtobrencash.module').then(m => m.DWRMTOBREncashModule)
      },
      {
        path: 'remittance',
        loadChildren: () => import('./views/ft-transaction-reports/dw-remittance/dw_remittance.module').then(m => m.DWRemittanceModule)
      },
      {
        path: 'incomingmt103',
        loadChildren: () => import('./views/ft-transaction-reports/dw-incomingmt103/dw_incomingmt103.module').then(m => m.DWIncomingMT103Module)
      },
      {
        path: 'outgoingmt103',
        loadChildren: () => import('./views/ft-transaction-reports/dw-outgoingmt103/dw_outgoingmt103.module').then(m => m.DWOutgoingMT103Module)
      }, {
        path: 'user-branch-setup',
        loadChildren: () => import('./views/user-branch-setup/user-branch-setup.module').then(m => m.UserBranchSetupModule)
      },
      {
        path: 'active-user-home-branch-report',
        loadChildren: () => import('./views/bs-user-home-branch-report/bs-user-home-branch-report.module').then(m => m.BsUserHomeBranchReportModule)
      },
      {
        path: 'question-form-submit/:param1',
        loadChildren: () => import('./views/question-form/question-form-submit/question-form-submit.module').then(m => m.QuestionFormSubmitModule)
      },
      {
        path: 'question-form-result/:param1',
        loadChildren: () => import('./views/question-form/question-form-result/question-form-result.module').then(m => m.QuestionFormResultModule)
      },
      {
        path: 'question-form-list',
        loadChildren: () => import('./views/question-form/question-form-list/question-form-list.module').then(m => m.QuestionFormListModule)
      },
      {
        path: 'question-report',
        loadChildren: () => import('./views/question-form/question-report/question-report.module').then(m => m.QuestionReportModule)
      },
      {
        path: 'topic-new',
        loadChildren: () => import('./views/question-form/topic-new/topic-new.module').then(m => m.TopicNewModule)
      },
      {
        path: 'topic-new/:param1',
        loadChildren: () => import('./views/question-form/topic-new/topic-new.module').then(m => m.TopicNewModule)
      },
      {
        path: 'topic-list',
        loadChildren: () => import('./views/question-form/topic-list/topic-list.module').then(m => m.TopicListModule)
      },
      {
        path: 'topic-role',
        loadChildren: () => import('./views/question-form/topic-role/topic-role.module').then(m => m.TopicRoleModule)
      },
      {
        path: 'active-user-home-branch-report',
        loadChildren: () => import('./views/bs-user-home-branch-report/bs-user-home-branch-report.module').then(m => m.BsUserHomeBranchReportModule)
      },
      //  {
      //   path: 'active-user-home-branch-report',
      //   loadChildren: () => import('./views/bs-user-report/bs-user-report.module').then(m => m.BsUserReportModule)
      //  },
      {
        path: 'clink-export-report',
        loadChildren: () => import('./views/clink-export/clink-export.module').then(m => m.CLinkExportModule)
      },
      {
        path: 'conso-asset',
        loadChildren: () => import('./views/mis-reports/conso-assets/conso-assets.module').then(m => m.ConsoAssetsModule)
      },
      {
        path: 'conso-liabilities',
        loadChildren: () => import('./views/mis-reports/conso-liabilities/conso-liabilities.module').then(m => m.ConsoLiabilitiesModule)
      },
      {
        path: 'hod2-report',
        loadChildren: () => import('./views/mis-reports/hod2-report/hod2.module').then(m => m.HOD2Module)
      },
      {
        path: 'hod3-report',
        loadChildren: () => import('./views/mis-reports/hod3-report/hod3.module').then(m => m.HOD3Module)
      },
      {
        path: 'fcubs-user-report',
        loadChildren: () => import('./views/bs-user-report/bs-user-report.module').then(m => m.BsUserReportModule)
      },
      {
        path: 'conso-trial-report',
        loadChildren: () => import('./views/mis-reports/conso-trial-report/conso-trial-report.module').then(m => m.ConsoTrialReportModule)
      },
      {
        path: 'conso-income',
        loadChildren: () => import('./views/mis-reports/conso-income/conso-income.module').then(m => m.ConsoIncomeModule)
      },
      {
        path: 'detail-trial-conso',
        loadChildren: () => import('./views/mis-reports/detail-trial-conso-report/detail-trial-conso-report.module').then(m => m.DetailTrialConsoReportModule)
      },
      {
        path: 'general-trial-conso',
        loadChildren: () => import('./views/mis-reports/general-trial-conso-report/general-trial-conso-report.module').then(m => m.GeneralTrialConsoReportModule)
      }, 
      {
        path: 'tagit-check-sum',
        loadChildren: () => import('./views/tagit/check-sum/check-sum.module').then(m => m.CheckSumModule)
      },
      {
        path: 'fcdb_fcubs_cust',
        loadChildren: () => import('./views/fcdb/cust-fcdb-fcubs/cust-fcdb-fcubs.module').then(m => m.CustFcdbFcubsModule)

      },

      {
        path: 'conso-expenditure',
        loadChildren: () => import('./views/mis-reports/conso-expenditure/conso-expenditure.module').then(m => m.ConsoExpenditureModule)
      },
      // ,
      // {
      //   path: 'fcdb_fcubs_cust',
      //   loadChildren: () => import('./views/fcdb/fcdb-info2/fcdb-info2.module').then(m => m.FcdbInfo2Module)
      // }
      {
        path: 'journal-listing',
        loadChildren: () => import('./views/journal-listing/journal-listing.module').then(m => m.JournalListingModule)
      },
      /*
      {
          path: 'gt-detail-trial-report',
         loadChildren: () => import('./views/TrialReport/detail-trial-report/trial-report.module').then(m => m.TrialReportModule), canActivate: [AuthGuard]
      },
      {
        path: 'general-trial-report',
          loadChildren: () => import('./views/TrialReport/general-trial-report/general-trial-report.module').then(m => m.GeneralTrialReportModule), canActivate: [AuthGuard]
        },
      */ 
      // /*
      {
        path: 'gt-detail-trial-report',
        loadChildren: () => import('./views/latest-trial-report/detail-trial-report/detail-trial-report.module').then(m => m.DetailTrialReportModule), canActivate: [AuthGuard]
      },
      {
        path: 'general-trial-report',
        loadChildren: () => import('./views/latest-trial-report/general-trial-report/general-trial-report.module').then(m => m.GeneralTrialReportModule), canActivate: [AuthGuard]
      },
      // */
      {
        path: 'mis-trial-report',
        loadChildren: () => import('./views/TrialReport/mis-trial-report/mis-trial-report.module').then(m => m.MisTrialReportModule)
      },
      {
        path: 'bank-cash',
        loadChildren: () => import('./views/mis-reports/bank-cash/bank-cash.module').then(m => m.BankCashModule)
      },
      {
        path: 'clean-cash',
        loadChildren: () => import('./views/mis-reports/clean-cash/clean-cash.module').then(m => m.CleanCashModule)
      },
      {
        path: 'transfer-scroll',
        loadChildren: () => import('./views/mis-reports/transfer-scroll/transfer-scroll.module').then(m => m.TransferScrollModule)
      },
      {
        path: 'trial-sheet',
        loadChildren: () => import('./views/mis-reports/trial-sheet/trial-sheet.module').then(m => m.TrialSheetModule)
      },
      {
        path: 'form-one',
        loadChildren: () => import('./views/mis-reports/form-one/form-one.module').then(m => m.FormOneModule)
      },
      {
        path: 'form-two',
        loadChildren: () => import('./views/mis-reports/form-two/form-two.module').then(m => m.FormTwoModule)
      },
      {
        path: 'all-branch-detail-trial',
        loadChildren: () => import('./views/mis-reports/all-branch-detail-trial/all-branch-detail-trial.module').then(m => m.AllBranchDetailTrialModule)
      },
      {
        path: 'dmd-report-one',
        loadChildren: () => import('./views/mis-reports/dmd-report-one/dmd-report-one.module').then(m => m.DmdReportOneModule)
      },
      {
        path: 'due-to-how7',
        loadChildren: () => import('./views/mis-reports/due-to-how7/due-to-how7.module').then(m => m.DueToHOW7Module)
      },
      {
        path: 'due-from-how8',
        loadChildren: () => import('./views/mis-reports/due-from-how8/due-from-how8.module').then(m => m.DueFromHOW8Module)
      },
      {
        path: 'meb-how6',
        loadChildren: () => import('./views/mis-reports/meb-how6/meb-how6.module').then(m => m.MEBHOW6Module)
      },
      {
        path: 'hod9',
        loadChildren: () => import('./views/mis-reports/cashinhand-hod9/cashinhand-hod9.module').then(m => m.HOD9Module)
      },

      {
        path: 'migration-export-report',
        loadChildren: () => import('./views/migration/migration-report/migration-report.module').then(m => m.MigrationReportModule)
      },
      {
        path: 'passbook-printing',
        loadChildren: () => import('./views/passbook-printing/passbook-printing.module').then(m => m.PassbookPrintingModule)
      },
      {
        path: 'monthlysummarycash',
        loadChildren: () => import('./views/mis-reports/monthly-summary-cash/monthly-summary-cash.module').then(m => m.MonthlySummaryCashTrModule)
      },
      {
        path: 'automation-rpt',
        loadChildren: () => import('./views/mis-reports/automation-report/automation-report.module').then(m => m.AutomationReportModule)
      },
      {
        path: 'depositbalance1',
        loadChildren: () => import('./views/mis-reports/deposit-balance-1/deposit-balance-1.module').then(m => m.DepositBalance1Module)
      },
      {
        path: 'daily_deno_record',
        loadChildren: () => import('./views/Mab-Deno/daily-deno-record/daily-deno-record.module').then(m => m.DailyDenoRecordModule)
      },
      {
        path: 'mab_deno_report',
        loadChildren: () => import('./views/Mab-Deno/mab-deno-report/mab-deno-report.module').then(m => m.MabDenoReportModule)
      },
      {
        path: 'voucher_printing',
        loadChildren: () => import('./views/DE_Printing/voucher_printing/voucher-print.module').then(m => m.VoucherPrintModule)
      },
      {
        path: 'po_number_record',
        loadChildren: () => import('./views/DE_Printing/po-invoice/po-invoice-record.module').then(m => m.PoInvoiceModule)
      }
     
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
