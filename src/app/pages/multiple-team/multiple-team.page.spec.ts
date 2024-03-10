import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultipleTeamPage } from './multiple-team.page';

describe('MultipleTeamPage', () => {
  let component: MultipleTeamPage;
  let fixture: ComponentFixture<MultipleTeamPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MultipleTeamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
