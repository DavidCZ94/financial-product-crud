import { TestBed } from '@angular/core/testing';

import { ErrorHandlerService } from './error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should notify error through errorNotifier', (done) => {
  const testError = new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error' });

  service.errorNotifier.subscribe((error: HttpErrorResponse) => {
    expect(error).toEqual(testError);
    done();
  });

  service.throwError(testError);
  });
});
