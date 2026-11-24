import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Analysis } from './analysis';

@Injectable({
  providedIn: 'root',
})
export class AnalysesApi {
  private http = inject(HttpClient);
  create(analysis: Omit<Analysis, 'id' | 'score' | 'creditLimit'>) {
    return this.http.post<Analysis>('/analyses', analysis);
  }
}
