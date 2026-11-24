import { Routes } from '@angular/router';
import { ProposalsPage } from './proposals/proposals-page/proposals-page';
import { AnalysisForm } from './analyses/analysis-form/analysis-form';

export const routes: Routes = [
  { path: 'sales', component: ProposalsPage },
  { path: 'credit', component: AnalysisForm },
  { path: '', redirectTo: 'sales', pathMatch: 'full' },
];
