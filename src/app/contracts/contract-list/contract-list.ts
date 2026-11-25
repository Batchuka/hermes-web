import { Component, input } from '@angular/core';
import { Contract } from '../contract';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-contract-list',
  imports: [MatTableModule],
  templateUrl: './contract-list.html',
  styleUrl: './contract-list.css',
})
export class ContractList {
  readonly contracts = input.required<Contract[]>();

  protected columns = ['id', 'farmer', 'amount', 'termMonths', 'installment'];
}
