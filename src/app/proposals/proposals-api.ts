import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Proposal } from './proposal';

@Injectable({
  providedIn: 'root',
})
export class ProposalsApi {
  private http = inject(HttpClient);

  list() {
    return this.http.get<Proposal[]>('/proposals');
  }

  get(id: string) {
    return this.http.get<Proposal>(`/proposals/${id}`);
  }

  create(proposal: Omit<Proposal, 'id'>) {
    return this.http.post<Proposal>('/proposals', proposal);
  }
}
