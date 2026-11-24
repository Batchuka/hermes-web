import { Component, inject, signal } from '@angular/core';
import { Proposal } from './proposals/proposal';
import { ProposalForm } from './proposals/proposal-form/proposal-form';
import { ProposalList } from './proposals/proposal-list/proposal-list';
import { ProposalsApi } from './proposals/proposals-api';
import { ProposalDetail } from './proposals/proposal-detail/proposal-detail';

@Component({
  selector: 'app-root',
  imports: [ProposalForm, ProposalList, ProposalDetail],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
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
