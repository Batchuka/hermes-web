import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Analysis, Decision } from './analysis';

@Injectable({
  providedIn: 'root',
})
export class AnalysesApi {
  private http = inject(HttpClient);

  create(analysis: Omit<Analysis, 'id' | 'score' | 'creditLimit' | 'decision' | 'reason'>) {
    return this.http.post<Analysis>('/analyses', analysis);
  }

  decide(id: number, decision: Decision, reason: string) {
    return this.http.put<Analysis>(`/analyses/${id}/decision`, { decision, reason });
  }

  list() {
    return this.http.get<Analysis[]>('/analyses');
  }
}
