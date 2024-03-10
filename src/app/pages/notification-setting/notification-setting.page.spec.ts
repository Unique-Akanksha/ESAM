import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationSettingPage } from './notification-setting.page';

describe('NotificationSettingPage', () => {
  let component: NotificationSettingPage;
  let fixture: ComponentFixture<NotificationSettingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotificationSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
