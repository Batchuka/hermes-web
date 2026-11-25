import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { ContractsPage } from './contracts-page';

describe('ContractsPage', () => {
  let component: ContractsPage;
  let fixture: ComponentFixture<ContractsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractsPage],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('loads the contracts when it opens', async () => {
    TestBed.inject(HttpTestingController).expectOne('/contracts').flush([]);
    await fixture.whenStable();
    expect(component).toBeTruthy();
  });
});
