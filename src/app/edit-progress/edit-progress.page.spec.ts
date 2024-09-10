import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProgressPage } from './edit-progress.page';

describe('EditProgressPage', () => {
  let component: EditProgressPage;
  let fixture: ComponentFixture<EditProgressPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProgressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
