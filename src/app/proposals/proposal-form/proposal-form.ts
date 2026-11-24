import { Component, inject, output, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
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
  protected errors = signal<Record<string, string>>({});
  readonly registered = output<Proposal>();

  protected register() {
    this.api
      .create({
        farmer: this.farmer,
        equipment: this.equipment,
        amount: this.amount,
        termMonths: this.termMonths,
      })
      .subscribe({
        next: (proposal) => {
          this.errors.set({});
          this.saved.set(proposal);
          this.registered.emit(proposal);
        },
        error: (response: HttpErrorResponse) => {
          this.saved.set(null);
          this.errors.set(response.error?.fields ?? {});
        },
      });
  }
}
