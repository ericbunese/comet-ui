import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorizationService } from './authorization.service';

describe('AuthorizationService', () => {
  let service: AuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ]
    }).compileComponents();
    service = TestBed.inject(AuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', () => {
    service.logIn('admin', 'teste').subscribe({
      next: (token) => {
        expect(token.invalid).toBe(false);
      }
    })
  });

  it('should fail login', () => {
    service.logIn('user', 'teste').subscribe({
      next: (token) => {

      },
      error: (token) => {
        expect(token.invalid).toBe(true);
      }
    })
  });
});
