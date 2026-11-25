import { Component, input, output } from '@angular/core';
import { Proposal } from '../proposal';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-proposal-list',
  imports: [MatTableModule],
  templateUrl: './proposal-list.html',
  styleUrl: './proposal-list.css',
})
export class ProposalList {
  readonly proposals = input.required<Proposal[]>();
  readonly selected = output<string>();

  protected columns = ['farmer', 'equipment', 'amount', 'termMonths'];
}
