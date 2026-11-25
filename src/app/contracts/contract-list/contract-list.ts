import { Component, input } from '@angular/core';
import { Contract } from '../contract';

@Component({
  selector: 'app-contract-list',
  imports: [],
  templateUrl: './contract-list.html',
  styleUrl: './contract-list.css',
})
export class ContractList {
  readonly contracts = input.required<Contract[]>();
}
