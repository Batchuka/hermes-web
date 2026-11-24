import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalList } from './proposal-list';

describe('ProposalList', () => {
  let component: ProposalList;
  let fixture: ComponentFixture<ProposalList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalList],
    }).compileComponents();

    fixture = TestBed.createComponent(ProposalList);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('proposals', []);
    await fixture.whenStable();
  });

  it('should show one line per proposal', async () => {
    fixture.componentRef.setInput('proposals', [
      { id: '1', farmer: 'Joao', equipment: 'Trator', amount: 10, termMonths: 12 },
    ]);
    await fixture.whenStable();
    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(1);
  });
});
