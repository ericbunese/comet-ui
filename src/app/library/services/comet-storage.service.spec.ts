import { TestBed } from '@angular/core/testing';

import { CometStorageService } from './comet-storage.service';

describe('CometStorageService', () => {
  let service: CometStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CometStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
