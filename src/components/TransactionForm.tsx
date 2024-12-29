import React, { useState } from 'react';
import { CreditCard, DollarSign } from 'lucide-react';

interface TransactionFormProps {
  balance: number;
  onTransaction: (type: 'credit' | 'debit', amount: number, description: string) => void;
}

export function TransactionForm({ balance, onTransaction }: TransactionFormProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleTransaction = (type: 'credit' | 'debit') => {
    const numAmount = parseFloat(amount);
    setError('');

    if (!amount) {
      setError('Please enter an amount');
      return;
    }

    if (numAmount <= 0) {
      setError('Amount must be greater than zero');
      return;
    }

    if (type === 'debit' && numAmount > balance) {
      setError('Insufficient balance');
      return;
    }

    onTransaction(type, numAmount, description);
    setAmount('');
    setDescription('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            name="amount"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="0.00"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="Enter transaction description"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => handleTransaction('credit')}
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Credit
        </button>
        <button
          onClick={() => handleTransaction('debit')}
          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Debit
        </button>
      </div>
    </div>
  );
}