import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Contract } from '../contract';
import { ContractsApi } from '../contracts-api';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-contract-form',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './contract-form.html',
  styleUrl: './contract-form.css',
})
export class ContractForm {
  private api = inject(ContractsApi);

  protected farmer = '';
  protected amount = 0;
  protected termMonths = 0;
  protected monthlyRate = 0;
  protected preview = signal<Contract | null>(null);
  protected result = signal<Contract | null>(null);
  protected error = signal<string | null>(null);
  protected errors = signal<Record<string, string>>({});

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
        this.result.set(null);
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
        this.result.set(contract);
      },
      error: (response: HttpErrorResponse) => {
        this.result.set(null);
        this.errors.set(response.error?.fields ?? {});
        this.error.set(response.error?.detail ?? 'Could not issue the contract');
      },
    });
  }
}
