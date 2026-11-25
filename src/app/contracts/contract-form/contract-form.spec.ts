import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ContractForm } from './contract-form';

describe('ContractForm', () => {
  let fixture: ComponentFixture<ContractForm>;
  let http: HttpTestingController;
  let page: HTMLElement;

  const contract = {
    id: 7,
    farmer: 'Joao',
    amount: 10000,
    termMonths: 1,
    monthlyRate: 0.02,
    installment: 10200,
    schedule: [{ number: 1, dueDate: '2026-12-25', interest: 200, principal: 10000, balance: 0 }],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractForm],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    fixture = TestBed.createComponent(ContractForm);
    http = TestBed.inject(HttpTestingController);
    page = fixture.nativeElement;
    await fixture.whenStable();
  });

  afterEach(() => http.verify());

  function review() {
    page.querySelector('form')!.dispatchEvent(new Event('submit'));
  }

  function issue() {
    page.querySelector<HTMLButtonElement>('button[type=button]')!.click();
  }

  it('shows the schedule after the review', async () => {
    review();
    http.expectOne('/contracts/preview').flush(contract);
    await fixture.whenStable();
    expect(page.querySelectorAll('tr').length).toBe(2);
    expect(page.textContent).toContain('2026-12-25');
  });

  it('shows the message under the field the service refused', async () => {
    review();
    http
      .expectOne('/contracts/preview')
      .flush(
        { detail: 'Invalid contract', fields: { farmer: 'must not be blank' } },
        { status: 400, statusText: 'Bad Request' },
      );
    await fixture.whenStable();
    expect(page.querySelector('mat-error')?.textContent).toContain('must not be blank');
    expect(page.querySelector('table')).toBeNull();
  });

  it('shows the contract number and hides the schedule after issuing', async () => {
    review();
    http.expectOne('/contracts/preview').flush(contract);
    await fixture.whenStable();
    issue();
    http.expectOne('/contracts').flush(contract);
    await fixture.whenStable();
    expect(page.textContent).toContain('Contract number: 7');
    expect(page.querySelector('table')).toBeNull();
  });

  it('says that nothing was stored when issuing fails', async () => {
    review();
    http.expectOne('/contracts/preview').flush(contract);
    await fixture.whenStable();
    issue();
    http.expectOne('/contracts').flush({}, { status: 500, statusText: 'Server Error' });
    await fixture.whenStable();
    expect(page.textContent).toContain('Nothing was stored');
    expect(page.textContent).not.toContain('Contract number');
  });
});
