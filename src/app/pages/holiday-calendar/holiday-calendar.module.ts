import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HolidayCalendarPageRoutingModule } from './holiday-calendar-routing.module';

import { HolidayCalendarPage } from './holiday-calendar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HolidayCalendarPageRoutingModule
  ],
  declarations: [HolidayCalendarPage]
})
export class HolidayCalendarPageModule {}
