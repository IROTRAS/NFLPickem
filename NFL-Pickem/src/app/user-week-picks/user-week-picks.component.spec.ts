import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWeekPicksComponent } from './user-week-picks.component';

describe('UserWeekPicksComponent', () => {
  let component: UserWeekPicksComponent;
  let fixture: ComponentFixture<UserWeekPicksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWeekPicksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWeekPicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
