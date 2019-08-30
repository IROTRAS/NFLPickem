import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekByeComponent } from './week-bye.component';

describe('WeekByeComponent', () => {
  let component: WeekByeComponent;
  let fixture: ComponentFixture<WeekByeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekByeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekByeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
