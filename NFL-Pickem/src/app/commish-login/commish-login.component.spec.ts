import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommishLoginComponent } from './commish-login.component';

describe('CommishLoginComponent', () => {
  let component: CommishLoginComponent;
  let fixture: ComponentFixture<CommishLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommishLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommishLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
