import { TestBed } from '@angular/core/testing';

import { CometIntegrationService } from './comet-integration.service';

describe('CometIntegrationService', () => {
  let service: CometIntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CometIntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
