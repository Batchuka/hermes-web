import { Component, inject, signal } from '@angular/core';
import { Proposal } from '../proposal';
import { ProposalForm } from '../proposal-form/proposal-form';
import { ProposalList } from '../proposal-list/proposal-list';
import { ProposalsApi } from '../proposals-api';
import { ProposalDetail } from '../proposal-detail/proposal-detail';

@Component({
  selector: 'app-proposals-page',
  imports: [ProposalForm, ProposalList, ProposalDetail],
  templateUrl: './proposals-page.html',
  styleUrl: './proposals-page.css',
})
export class ProposalsPage {
  private api = inject(ProposalsApi);

  protected proposals = signal<Proposal[]>([]);
  protected selected = signal<Proposal | null>(null);

  constructor() {
    this.load();
  }

  protected load() {
    this.api.list().subscribe((list) => this.proposals.set(list));
  }

  protected select(id: string) {
    this.api.get(id).subscribe((proposal) => this.selected.set(proposal));
  }
}
