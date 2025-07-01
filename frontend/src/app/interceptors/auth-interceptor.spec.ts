import { TestBed } from '@angular/core/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';
import { AuthService } from '../services/AuthService';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let next: jasmine.SpyObj<HttpHandler>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getToken',
      'logout',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    next = jasmine.createSpyObj('HttpHandler', ['handle']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        AuthInterceptor,
      ],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatTabsModule,
      ],
    });

    interceptor = TestBed.inject(AuthInterceptor);
  });

  it('should add Authorization header if token exists', () => {
    authServiceSpy.getToken.and.returnValue('test-token');
    const req = new HttpRequest('GET', '/test');
    next.handle.and.returnValue(of(new HttpResponse({ status: 200 })));

    interceptor.intercept(req, next).subscribe();

    const calledReq = next.handle.calls.mostRecent().args[0];
    expect(calledReq.headers.get('Authorization')).toBe('Bearer test-token');
  });

  it('should redirect to login on 401 error', () => {
    authServiceSpy.getToken.and.returnValue('test-token');
    const req = new HttpRequest('GET', '/test');
    const errorResponse = new HttpErrorResponse({
      status: 401,
      statusText: 'Unauthorized',
    });
    next.handle.and.returnValue(throwError(() => errorResponse));

    interceptor.intercept(req, next).subscribe({
      error: () => {
        expect(authServiceSpy.logout).toHaveBeenCalled();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
      },
    });
  });
});
