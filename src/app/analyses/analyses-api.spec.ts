import { TestBed } from '@angular/core/testing';

import { AnalysesApi } from './analyses-api';

describe('AnalysesApi', () => {
  let service: AnalysesApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalysesApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
