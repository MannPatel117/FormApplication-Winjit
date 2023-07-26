import { TestBed } from '@angular/core/testing';

import { DataModalServiceService } from './data-modal-service.service';

describe('DataModalServiceService', () => {
  let service: DataModalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataModalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
