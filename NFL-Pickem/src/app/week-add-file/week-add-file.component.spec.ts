import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekAddFileComponent } from './week-add-file.component';

describe('WeekAddFileComponent', () => {
  let component: WeekAddFileComponent;
  let fixture: ComponentFixture<WeekAddFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekAddFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekAddFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
