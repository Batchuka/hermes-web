import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Proposal } from '../proposal';
import { ProposalsApi } from '../proposals-api';

@Component({
  selector: 'app-proposal-form',
  imports: [FormsModule],
  templateUrl: './proposal-form.html',
  styleUrl: './proposal-form.css',
})
export class ProposalForm {
  private api = inject(ProposalsApi);

  protected farmer = '';
  protected equipment = '';
  protected amount = 0;
  protected termMonths = 0;
  protected saved = signal<Proposal | null>(null);
  readonly registered = output<Proposal>();

  protected register() {
    this.api
      .create({
        farmer: this.farmer,
        equipment: this.equipment,
        amount: this.amount,
        termMonths: this.termMonths,
      })
      .subscribe((proposal) => {
        this.saved.set(proposal);
        this.registered.emit(proposal);
      });
  }
}
