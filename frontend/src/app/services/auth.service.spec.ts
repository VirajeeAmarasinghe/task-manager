import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './AuthService';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatTabsModule,
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get token', () => {
    service.setToken('abc123');
    expect(service.getToken()).toBe('abc123');
  });

  it('should return true if logged in', () => {
    service.setToken('abc123');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return false if not logged in', () => {
    service.logout();
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should remove token on logout', () => {
    service.setToken('abc123');
    service.logout();
    expect(service.getToken()).toBeNull();
  });

  it('should call register API', () => {
    const dummyData = { email: 'test@test.com', password: '123456' };
    service.register(dummyData).subscribe();
    const req = httpMock.expectOne('http://localhost/api/register');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should call login API', () => {
    const dummyData = { email: 'test@test.com', password: '123456' };
    service.login(dummyData).subscribe();
    const req = httpMock.expectOne('http://localhost/api/login');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});
