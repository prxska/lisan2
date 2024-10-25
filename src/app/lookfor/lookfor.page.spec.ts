import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LookforPage } from './lookfor.page';

describe('LookforPage', () => {
  let component: LookforPage;
  let fixture: ComponentFixture<LookforPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LookforPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
