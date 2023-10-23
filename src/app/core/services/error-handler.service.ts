import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  errorNotifier = new Subject<HttpErrorResponse>();

  constructor() { }

  trhowError(error: HttpErrorResponse) {
    this.errorNotifier.next(error);
  }
}
