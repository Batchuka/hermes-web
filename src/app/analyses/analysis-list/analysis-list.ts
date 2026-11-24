import { Component, input } from '@angular/core';
import { Analysis } from '../analysis';

@Component({
  selector: 'app-analysis-list',
  imports: [],
  templateUrl: './analysis-list.html',
  styleUrl: './analysis-list.css',
})
export class AnalysisList {
  readonly analyses = input.required<Analysis[]>();
}
