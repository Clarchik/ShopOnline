import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrderRowComponent } from './manage-order-row.component';

describe('ManageOrderRowComponent', () => {
  let component: ManageOrderRowComponent;
  let fixture: ComponentFixture<ManageOrderRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageOrderRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOrderRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
