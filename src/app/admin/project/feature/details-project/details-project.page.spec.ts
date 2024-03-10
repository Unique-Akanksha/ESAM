import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsProjectPage } from './details-project.page';

describe('DetailsProjectPage', () => {
  let component: DetailsProjectPage;
  let fixture: ComponentFixture<DetailsProjectPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailsProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
