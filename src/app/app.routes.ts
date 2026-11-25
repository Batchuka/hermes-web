import { Routes } from '@angular/router';
import { ProposalsPage } from './proposals/proposals-page/proposals-page';
import { AnalysesPage } from './analyses/analyses-page/analyses-page';
import { ContractsPage } from './contracts/contracts-page/contracts-page';

export const routes: Routes = [
  { path: 'sales', component: ProposalsPage },
  { path: 'credit', component: AnalysesPage },
  { path: 'contracts', component: ContractsPage },
  { path: '', redirectTo: 'sales', pathMatch: 'full' },
];
