import { Component, inject, output, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Analysis, Decision } from '../analysis';
import { AnalysesApi } from '../analyses-api';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-analysis-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './analysis-form.html',
  styleUrl: './analysis-form.css',
})
export class AnalysisForm {
  private api = inject(AnalysesApi);
  private snackBar = inject(MatSnackBar);

  readonly changed = output<void>();

  protected farmer = '';
  protected income: number | null = null;
  protected amount = 0;
  protected termMonths = 0;
  protected result = signal<Analysis | null>(null);
  protected reason = '';
  protected error = signal<string | null>(null);

  protected analyze() {
    this.api
      .create({
        farmer: this.farmer,
        income: this.income,
        amount: this.amount,
        termMonths: this.termMonths,
      })
      .subscribe({
        next: (analysis) => {
          this.error.set(null);
          this.result.set(analysis);
          this.changed.emit();
        },
        error: (response: HttpErrorResponse) => {
          this.result.set(null);
          this.error.set(response.error?.detail ?? 'Could not analyze the proposal');
        },
      });
  }

  protected decide(decision: Decision) {
    const analysis = this.result();
    if (!analysis) return;
    this.api.decide(analysis.id, decision, this.reason).subscribe((decided) => {
      this.result.set(decided);
      this.snackBar.open(`Analysis ${decided.id}: ${decided.decision}`, 'OK', { duration: 4000 });
      this.changed.emit();
    });
  }
}
