import { Component, input, output } from '@angular/core';
import { Proposal } from '../proposal';

@Component({
  selector: 'app-proposal-list',
  imports: [],
  templateUrl: './proposal-list.html',
  styleUrl: './proposal-list.css',
})
export class ProposalList {
  readonly proposals = input.required<Proposal[]>();
  readonly selected = output<string>();
}
