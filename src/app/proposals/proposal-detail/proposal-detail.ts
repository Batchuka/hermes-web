import { Component, input } from '@angular/core';
import { Proposal } from '../proposal';

@Component({
  selector: 'app-proposal-detail',
  imports: [],
  templateUrl: './proposal-detail.html',
  styleUrl: './proposal-detail.css',
})
export class ProposalDetail {
  readonly proposal = input.required<Proposal>();
}
