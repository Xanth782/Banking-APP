export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  balance: number;
}

export interface AccountDetails {
  name: string;
  accountNumber: string;
  balance: number;
}