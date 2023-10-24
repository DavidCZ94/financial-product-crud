import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should add authorId header to the request', () => {
    const authorId = '299';

    httpClient.get('/some-api').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpTestingController.expectOne('/some-api');
    expect(httpRequest.request.method).toBe('GET');

    expect(httpRequest.request.headers.get('authorId')).toBe(authorId);

    httpRequest.flush({ data: 'test response' });

    httpTestingController.verify();
  });
});
