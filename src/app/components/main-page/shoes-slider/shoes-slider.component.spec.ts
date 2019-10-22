import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoesSliderComponent } from './shoes-slider.component';

describe('ShoesSliderComponent', () => {
  let component: ShoesSliderComponent;
  let fixture: ComponentFixture<ShoesSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoesSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
