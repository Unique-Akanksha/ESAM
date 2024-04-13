import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'privacy-security',
    loadChildren: () => import('./pages/privacy-security/privacy-security.module').then( m => m.PrivacySecurityPageModule)
  },
  {
    path: 'contact-support',
    loadChildren: () => import('./pages/contact-support/contact-support.module').then( m => m.ContactSupportPageModule)
  },

  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'multiple-team',
    loadChildren: () => import('./pages/multiple-team/multiple-team.module').then( m => m.MultipleTeamPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesPageModule),
    canActivate: [AuthGuard]
  },
 
  {
    path: 'fill-attendance',
    loadChildren: () => import('./admin/attendance/feature/fill-attendance/fill-attendance.module').then( m => m.FillAttendancePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile-emp',
    loadChildren: () => import('./pages/profile-emp/profile-emp.module').then( m => m.ProfileEmpPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notification-setting',
    loadChildren: () => import('./pages/notification-setting/notification-setting.module').then( m => m.NotificationSettingPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'language-selection',
    loadChildren: () => import('./pages/language-selection/language-selection.module').then( m => m.LanguageSelectionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'details-employee',
    loadChildren: () => import('./admin/employee/feature/details-employee/details-employee.module').then( m => m.DetailsEmployeePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'show-emp-attendance',
    loadChildren: () => import('./admin/attendance/feature/show-emp-attendance/show-emp-attendance.module').then( m => m.ShowEmpAttendancePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'page-not-found',
    loadChildren: () => import('./pages/page-not-found/page-not-found.module').then( m => m.PageNotFoundPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-leave-history',
    loadChildren: () => import('./admin/leave/feature/admin-leave-history/admin-leave-history.module').then( m => m.AdminLeaveHistoryPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'approve-requests',
    loadChildren: () => import('./admin/leave/feature/approve-requests/approve-requests.module').then( m => m.ApproveRequestsPageModule),
    canActivate: [AuthGuard]
  },
  
  {
    path: 'add-edit-department',
    loadChildren: () => import('./admin/department/feature/add-edit-department/add-edit-department.module').then( m => m.AddEditDepartmentPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'show-department',
    loadChildren: () => import('./admin/department/feature/show-department/show-department.module').then( m => m.ShowDepartmentPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-edit-project',
    loadChildren: () => import('./admin/project/feature/add-edit-project/add-edit-project.module').then( m => m.AddEditProjectPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'show-project',
    loadChildren: () => import('./admin/project/feature/show-project/show-project.module').then( m => m.ShowProjectPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-edit-employee',
    loadChildren: () => import('./admin/employee/feature/add-edit-employee/add-edit-employee.module').then( m => m.AddEditEmployeePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'show-employee',
    loadChildren: () => import('./admin/employee/feature/show-employee/show-employee.module').then( m => m.ShowEmployeePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-edit-attendance',
    loadChildren: () => import('./admin/attendance/feature/add-edit-attendance/add-edit-attendance.module').then( m => m.AddEditAttendancePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'show-attendance',
    loadChildren: () => import('./admin/attendance/feature/show-attendance/show-attendance.module').then( m => m.ShowAttendancePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-edit-leave',
    loadChildren: () => import('./admin/leave/feature/add-edit-leave/add-edit-leave.module').then( m => m.AddEditLeavePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'show-leave',
    loadChildren: () => import('./admin/leave/feature/show-leave/show-leave.module').then( m => m.ShowLeavePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then( m => m.HelpPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'details-project',
    loadChildren: () => import('./admin/project/feature/details-project/details-project.module').then( m => m.DetailsProjectPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'details-emp-attendance',
    loadChildren: () => import('./admin/attendance/feature/details-emp-attendance/details-emp-attendance.module').then( m => m.DetailsEmpAttendancePageModule),
    canActivate: [AuthGuard]
  },

  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full'
  },
  
 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
