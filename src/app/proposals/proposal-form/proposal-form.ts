import { Component, inject, output, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { whenServerRefuses } from '../../server-error-matcher';
import { Proposal } from '../proposal';
import { ProposalsApi } from '../proposals-api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-proposal-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './proposal-form.html',
  styleUrl: './proposal-form.css',
})
export class ProposalForm {
  private api = inject(ProposalsApi);
  private snackBar = inject(MatSnackBar);

  protected farmer = '';
  protected equipment = '';
  protected amount = 0;
  protected termMonths = 0;
  protected errors = signal<Record<string, string>>({});
  protected refuses = (field: string) => whenServerRefuses(() => !!this.errors()[field]);
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
          this.snackBar.open(`Proposal ${proposal.id} registered`, 'OK', { duration: 4000 });
          this.registered.emit(proposal);
        },
        error: (response: HttpErrorResponse) => {
          this.errors.set(response.error?.fields ?? {});
        },
      });
  }
}
