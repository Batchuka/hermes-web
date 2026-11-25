import { TestBed } from '@angular/core/testing';

import { ContractsApi } from './contracts-api';

describe('ContractsApi', () => {
  let service: ContractsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
