import { Component, inject, signal } from '@angular/core';
import { Analysis } from '../analysis';
import { AnalysesApi } from '../analyses-api';
import { AnalysisForm } from '../analysis-form/analysis-form';
import { AnalysisList } from '../analysis-list/analysis-list';

@Component({
  selector: 'app-analyses-page',
  imports: [AnalysisForm, AnalysisList],
  templateUrl: './analyses-page.html',
  styleUrl: './analyses-page.css',
})
export class AnalysesPage {
  private api = inject(AnalysesApi);

  protected analyses = signal<Analysis[]>([]);

  constructor() {
    this.load();
  }

  protected load() {
    this.api.list().subscribe((list) => this.analyses.set(list));
  }
}
