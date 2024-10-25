import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAllPage } from './edit-all.page';

describe('EditAllPage', () => {
  let component: EditAllPage;
  let fixture: ComponentFixture<EditAllPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
