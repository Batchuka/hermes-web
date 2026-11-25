import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractList } from './contract-list';

describe('ContractList', () => {
  let component: ContractList;
  let fixture: ComponentFixture<ContractList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractList],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractList);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('contracts', []);
    await fixture.whenStable();
  });

  it('shows one line per contract', async () => {
    fixture.componentRef.setInput('contracts', [
      {
        id: 1,
        farmer: 'Joao',
        amount: 10000,
        termMonths: 12,
        monthlyRate: 0.02,
        installment: 945.6,
        schedule: [],
      },
    ]);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('tr[mat-row]').length).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('Joao');
  });
});
