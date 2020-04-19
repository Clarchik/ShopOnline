import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusTrackingComponent } from './order-status-tracking.component';

describe('OrderStatusTrackingComponent', () => {
  let component: OrderStatusTrackingComponent;
  let fixture: ComponentFixture<OrderStatusTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStatusTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
