import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage
  },
  {
    path: 'notification-setting',
    loadChildren: () => import('./notification-setting/notification-setting.module').then( m => m.NotificationSettingPageModule)
  },
  {
    path: 'language-selection',
    loadChildren: () => import('./language-selection/language-selection.module').then( m => m.LanguageSelectionPageModule)
  },
  {
    path: 'multiple-team',
    loadChildren: () => import('./multiple-team/multiple-team.module').then( m => m.MultipleTeamPageModule)
  },  {
    path: 'holiday-calendar',
    loadChildren: () => import('./holiday-calendar/holiday-calendar.module').then( m => m.HolidayCalendarPageModule)
  },




 

 
 

  

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
