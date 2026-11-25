import { Component } from '@angular/core';
import { ContractForm } from '../contract-form/contract-form';

@Component({
  selector: 'app-contracts-page',
  imports: [ContractForm],
  templateUrl: './contracts-page.html',
  styleUrl: './contracts-page.css',
})
export class ContractsPage {}
