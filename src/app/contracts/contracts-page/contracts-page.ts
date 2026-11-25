import { Component, inject, signal } from '@angular/core';
import { Contract } from '../contract';
import { ContractsApi } from '../contracts-api';
import { ContractForm } from '../contract-form/contract-form';
import { ContractList } from '../contract-list/contract-list';

@Component({
  selector: 'app-contracts-page',
  imports: [ContractForm, ContractList],
  templateUrl: './contracts-page.html',
  styleUrl: './contracts-page.css',
})
export class ContractsPage {
  private api = inject(ContractsApi);

  protected contracts = signal<Contract[]>([]);

  constructor() {
    this.load();
  }

  protected load() {
    this.api.list().subscribe((list) => this.contracts.set(list));
  }
}
