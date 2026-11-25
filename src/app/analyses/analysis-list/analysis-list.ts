import { Component, input } from '@angular/core';
import { Analysis } from '../analysis';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-analysis-list',
  imports: [MatTableModule],
  templateUrl: './analysis-list.html',
  styleUrl: './analysis-list.css',
})
export class AnalysisList {
  readonly analyses = input.required<Analysis[]>();
  protected columns = ['farmer', 'amount', 'score', 'decision', 'reason'];
}
