import { TestBed } from '@angular/core/testing';

import { WeekDataService } from './week-data.service';

describe('WeekDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeekDataService = TestBed.get(WeekDataService);
    expect(service).toBeTruthy();
  });
});
