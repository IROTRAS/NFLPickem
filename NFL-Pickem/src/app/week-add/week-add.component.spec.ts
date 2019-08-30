import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekAddComponent } from './week-add.component';

describe('WeekAddComponent', () => {
  let component: WeekAddComponent;
  let fixture: ComponentFixture<WeekAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
