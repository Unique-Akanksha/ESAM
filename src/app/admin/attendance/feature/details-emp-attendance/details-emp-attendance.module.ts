import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsEmpAttendancePageRoutingModule } from './details-emp-attendance-routing.module';

import { DetailsEmpAttendancePage } from './details-emp-attendance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsEmpAttendancePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DetailsEmpAttendancePage]
})
export class DetailsEmpAttendancePageModule {}
