import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected farmer = '';
  protected equipment = '';
  protected amount = 0;
  protected termMonths = 0;
  private http = inject(HttpClient);
  protected saved = signal<{ id: string } | null>(null);

  protected register() {
    this.http
      .post<{ id: string }>('/proposals', {
        farmer: this.farmer,
        equipment: this.equipment,
        amount: this.amount,
        termMonths: this.termMonths,
      })
      .subscribe((proposal) => this.saved.set(proposal));
  }
}
