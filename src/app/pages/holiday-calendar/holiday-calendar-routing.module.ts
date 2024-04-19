import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HolidayCalendarPage } from './holiday-calendar.page';

const routes: Routes = [
  {
    path: '',
    component: HolidayCalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HolidayCalendarPageRoutingModule {}
