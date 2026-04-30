import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from './auth-service.service';
import { environment } from '../../../environments/environment';

const BASE_URL = `${environment.apiUrl}/register`;

const mockRequest = { name: 'Juan', email: 'juan@email.com', pasword: 'password123' };
const mockResponse = { token: 'token123', name: 'Juan', userId: '1' };

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should make a POST request to the register endpoint', () => {
    service.register(mockRequest).subscribe();
    const req = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should save token and user data to localStorage on success', () => {
    service.register(mockRequest).subscribe();
    const req = httpMock.expectOne(BASE_URL);
    req.flush(mockResponse);
    expect(localStorage.getItem('auth_token')).toBe('token123');
    expect(localStorage.getItem('user_name')).toBe('Juan');
    expect(localStorage.getItem('user_id')).toBe('1');
  });

  it('should return error message for 409 conflict', (done) => {
    service.register(mockRequest).subscribe({
      error: (err: Error) => {
        expect(err.message).toBe('El correo ya está registrado');
        done();
      },
    });
    const req = httpMock.expectOne(BASE_URL);
    req.flush({}, { status: 409, statusText: 'Conflict' });
  });

  it('should return error message for 500 server error', (done) => {
    service.register(mockRequest).subscribe({
      error: (err: Error) => {
        expect(err.message).toBe('Error interno del servidor');
        done();
      },
    });
    const req = httpMock.expectOne(BASE_URL);
    req.flush({}, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should return fallback message for unknown error status', (done) => {
    service.register(mockRequest).subscribe({
      error: (err: Error) => {
        expect(err.message).toBe('Error inesperado, intenta de nuevo');
        done();
      },
    });
    const req = httpMock.expectOne(BASE_URL);
    req.flush({}, { status: 503, statusText: 'Service Unavailable' });
  });

  it('getToken should return the stored token', () => {
    localStorage.setItem('auth_token', 'my-token');
    expect(service.getToken()).toBe('my-token');
  });

  it('getToken should return null when no token is stored', () => {
    expect(service.getToken()).toBeNull();
  });

  it('removeToken should delete the token from localStorage', () => {
    localStorage.setItem('auth_token', 'my-token');
    service.removeToken();
    expect(service.getToken()).toBeNull();
  });
});
