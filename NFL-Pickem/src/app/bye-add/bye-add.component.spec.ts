import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAddComponent } from './bye-add.component';

describe('ByeAddComponent', () => {
  let component: ByeAddComponent;
  let fixture: ComponentFixture<ByeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
