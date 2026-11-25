import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ContractsApi } from './contracts-api';

describe('ContractsApi', () => {
  let api: ContractsApi;
  let http: HttpTestingController;
  const data = { farmer: 'Joao', amount: 10000, termMonths: 12, monthlyRate: 0.02 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    api = TestBed.inject(ContractsApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('preview posts the data to /contracts/preview', () => {
    api.preview(data).subscribe();
    const req = http.expectOne('/contracts/preview');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush({});
  });

  it('create posts the data to /contracts', () => {
    api.create(data).subscribe();
    const req = http.expectOne('/contracts');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush({});
  });
});
