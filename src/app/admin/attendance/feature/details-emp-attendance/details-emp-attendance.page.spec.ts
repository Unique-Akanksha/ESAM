import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsEmpAttendancePage } from './details-emp-attendance.page';

describe('DetailsEmpAttendancePage', () => {
  let component: DetailsEmpAttendancePage;
  let fixture: ComponentFixture<DetailsEmpAttendancePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailsEmpAttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
