import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductsAddComponent } from './manage-products-add.component';

describe('ManageProductsAddComponent', () => {
  let component: ManageProductsAddComponent;
  let fixture: ComponentFixture<ManageProductsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageProductsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
