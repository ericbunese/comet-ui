import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { CometIntegrationService } from './comet-integration.service';

describe('CometIntegrationService', () => {
  let service: CometIntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    }).compileComponents();
    service = TestBed.inject(CometIntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
