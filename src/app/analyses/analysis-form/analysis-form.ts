import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Analysis, Decision } from '../analysis';
import { AnalysesApi } from '../analyses-api';

@Component({
  selector: 'app-analysis-form',
  imports: [FormsModule],
  templateUrl: './analysis-form.html',
  styleUrl: './analysis-form.css',
})
export class AnalysisForm {
  private api = inject(AnalysesApi);

  protected farmer = '';
  protected income: number | null = null;
  protected amount = 0;
  protected termMonths = 0;
  protected result = signal<Analysis | null>(null);
  protected reason = '';

  protected analyze() {
    this.api
      .create({
        farmer: this.farmer,
        income: this.income,
        amount: this.amount,
        termMonths: this.termMonths,
      })
      .subscribe((analysis) => this.result.set(analysis));
  }

  protected decide(decision: Decision) {
    const analysis = this.result();
    if (!analysis) return;
    this.api
      .decide(analysis.id, decision, this.reason)
      .subscribe((decided) => this.result.set(decided));
  }
}
