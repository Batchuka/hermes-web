export interface Installment {
  number: number;
  dueDate: string;
  interest: number;
  principal: number;
  balance: number;
}

export interface Contract {
  id: number;
  farmer: string;
  amount: number;
  termMonths: number;
  monthlyRate: number;
  installment: number;
  schedule: Installment[];
}
