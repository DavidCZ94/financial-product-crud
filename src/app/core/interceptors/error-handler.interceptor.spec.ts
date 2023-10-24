import { TestBed } from '@angular/core/testing';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ErrorHandlerService } from '../services/error-handler.service';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';

describe('ErrorHandlerInterceptor', () => {
  let interceptor: ErrorHandlerInterceptor;
  let errorHandlerService: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorHandlerInterceptor,
        {
          provide: ErrorHandlerService,
          useValue: {
            throwError: jasmine.createSpy('throwError')
          }
        },
      ],
    });

    interceptor = TestBed.inject(ErrorHandlerInterceptor);
    errorHandlerService = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should intercept and handle an HTTP error', () => {
    const httpErrorResponse = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });

    const request = new HttpRequest('GET', '/api/some-endpoint');
    const next = {
      handle: () => throwError(() => httpErrorResponse)
    } as HttpHandler;

    interceptor.intercept(request, next).subscribe(
      {
        next: () => {},
        error: (error) => {
          expect(errorHandlerService.throwError).toHaveBeenCalledWith(httpErrorResponse);
        },
      }
    );
  });

  it('should not intercept a successful HTTP response', () => {
    const httpResponse = new HttpResponse({ status: 200, statusText: 'OK' });

    const request = new HttpRequest('GET', '/api/some-endpoint');
    const next = {
      handle: () => of(httpResponse)
    } as HttpHandler;

    interceptor.intercept(request, next).subscribe((response: HttpEvent<any>) => {
      expect(response).toBe(httpResponse);
      expect(errorHandlerService.throwError).not.toHaveBeenCalled();
    });
  });
});
