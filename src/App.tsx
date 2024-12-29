import React, { useState } from 'react';
import { AccountSummary } from './components/AccountSummary';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import type { Transaction, AccountDetails } from './types';
import { CreditCard } from 'lucide-react';

function App() {
  const [accountDetails, setAccountDetails] = useState<AccountDetails>({
    name: 'John Doe',
    accountNumber: '1234 5678 9012 3456',
    balance: 5000.00
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleTransaction = (type: 'credit' | 'debit', amount: number, description: string) => {
    const newBalance = type === 'credit' 
      ? accountDetails.balance + amount 
      : accountDetails.balance - amount;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount,
      description,
      date: new Date().toLocaleDateString(),
      balance: newBalance
    };

    setTransactions([newTransaction, ...transactions]);
    setAccountDetails(prev => ({ ...prev, balance: newBalance }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Modern Bank</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-6">
          <AccountSummary accountDetails={accountDetails} />
          <TransactionForm 
            balance={accountDetails.balance}
            onTransaction={handleTransaction}
          />
          <TransactionList transactions={transactions} />
        </div>
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <p className="text-center text-gray-600">
            © 2024 Modern Bank. Created by Mahdi. Contact: mahdi@modernbank.com
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;