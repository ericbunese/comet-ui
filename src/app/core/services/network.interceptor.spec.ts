import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NetworkInterceptor } from './network.interceptor';

describe('NetworkInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NetworkInterceptor
    ],
    imports: [
      RouterTestingModule, HttpClientModule
    ]
  }).compileComponents());

  it('should be created', () => {
    const interceptor: NetworkInterceptor = TestBed.inject(NetworkInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
