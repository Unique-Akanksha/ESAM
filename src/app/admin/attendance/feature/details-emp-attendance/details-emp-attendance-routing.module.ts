import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsEmpAttendancePage } from './details-emp-attendance.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsEmpAttendancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsEmpAttendancePageRoutingModule {}
