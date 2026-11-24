import { TestBed } from '@angular/core/testing';

import { ProposalsApi } from './proposals-api';

describe('ProposalsApi', () => {
  let service: ProposalsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProposalsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
