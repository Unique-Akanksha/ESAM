import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HolidayCalendarPage } from './holiday-calendar.page';

describe('HolidayCalendarPage', () => {
  let component: HolidayCalendarPage;
  let fixture: ComponentFixture<HolidayCalendarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HolidayCalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
