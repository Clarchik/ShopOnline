import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchdumbbedComponent } from './searchdumbbed.component';

describe('SearchdumbbedComponent', () => {
  let component: SearchdumbbedComponent;
  let fixture: ComponentFixture<SearchdumbbedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchdumbbedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchdumbbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
