import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contract } from './contract';

type ContractData = Omit<Contract, 'id' | 'installment' | 'schedule'>;

@Injectable({ providedIn: 'root' })
export class ContractsApi {
  private http = inject(HttpClient);

  create(contract: ContractData) {
    return this.http.post<Contract>('/contracts', contract);
  }

  preview(contract: ContractData) {
    return this.http.post<Contract>('/contracts/preview', contract);
  }
}
