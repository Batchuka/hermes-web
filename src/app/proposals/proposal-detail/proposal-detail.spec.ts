import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalDetail } from './proposal-detail';

describe('ProposalDetail', () => {
  let component: ProposalDetail;
  let fixture: ComponentFixture<ProposalDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(ProposalDetail);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('proposal', {
      id: '1',
      farmer: 'Joao',
      equipment: 'Trator',
      amount: 10,
      termMonths: 12,
    });
    await fixture.whenStable();
  });

  it('should show the farmer', () => {
    expect(fixture.nativeElement.textContent).toContain('Joao');
  });
});
