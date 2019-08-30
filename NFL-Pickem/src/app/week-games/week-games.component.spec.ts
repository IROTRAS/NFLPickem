import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekGamesComponent } from './week-games.component';

describe('WeekGamesComponent', () => {
  let component: WeekGamesComponent;
  let fixture: ComponentFixture<WeekGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
