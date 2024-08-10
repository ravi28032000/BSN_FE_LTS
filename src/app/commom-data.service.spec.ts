import { TestBed } from '@angular/core/testing';

import { CommomDataService } from './commom-data.service';

describe('CommomDataService', () => {
  let service: CommomDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommomDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
