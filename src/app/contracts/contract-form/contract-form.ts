import { Component, inject, output, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Contract } from '../contract';
import { ContractsApi } from '../contracts-api';
import { DecimalPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { whenServerRefuses } from '../../server-error-matcher';

@Component({
  selector: 'app-contract-form',
  imports: [FormsModule, DecimalPipe, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './contract-form.html',
  styleUrl: './contract-form.css',
})
export class ContractForm {
  private api = inject(ContractsApi);
  private snackBar = inject(MatSnackBar);

  readonly issued = output<void>();

  protected farmer = '';
  protected amount = 0;
  protected termMonths = 0;
  protected monthlyRate = 0;
  protected preview = signal<Contract | null>(null);
  protected error = signal<string | null>(null);
  protected errors = signal<Record<string, string>>({});
  protected refuses = (field: string) => whenServerRefuses(() => !!this.errors()[field]);

  private data() {
    return {
      farmer: this.farmer,
      amount: this.amount,
      termMonths: this.termMonths,
      monthlyRate: this.monthlyRate,
    };
  }

  protected review() {
    this.api.preview(this.data()).subscribe({
      next: (contract) => {
        this.error.set(null);
        this.errors.set({});
        this.preview.set(contract);
      },
      error: (response: HttpErrorResponse) => {
        this.preview.set(null);
        this.errors.set(response.error?.fields ?? {});
        this.error.set(response.error?.detail ?? 'Could not review the contract');
      },
    });
  }

  protected issue() {
    this.api.create(this.data()).subscribe({
      next: (contract) => {
        this.error.set(null);
        this.errors.set({});
        this.preview.set(null);
        this.snackBar.open(`Contract ${contract.id} issued`, 'OK', { duration: 4000 });
        this.issued.emit();
      },
      error: (response: HttpErrorResponse) => {
        this.errors.set(response.error?.fields ?? {});
        this.error.set(
          response.status >= 500 || response.status === 0
            ? 'Nothing was stored. Please try again.'
            : (response.error?.detail ?? 'Could not issue the contract'),
        );
      },
    });
  }
}
