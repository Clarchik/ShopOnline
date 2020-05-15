import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductRowComponent } from './manage-product-row.component';

describe('ManageProductRowComponent', () => {
  let component: ManageProductRowComponent;
  let fixture: ComponentFixture<ManageProductRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageProductRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
