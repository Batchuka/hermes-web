export type Decision = 'APPROVED' | 'REJECTED';

export interface Analysis {
  id: number;
  farmer: string;
  income: number | null;
  amount: number;
  termMonths: number;
  score: number;
  creditLimit: number;
  decision: Decision | null;
  reason: string | null;
}
