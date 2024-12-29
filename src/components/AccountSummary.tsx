import React from 'react';
import { Wallet } from 'lucide-react';

interface AccountSummaryProps {
  accountDetails: {
    name: string;
    accountNumber: string;
    balance: number;
  };
}

export function AccountSummary({ accountDetails }: AccountSummaryProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Wallet className="h-8 w-8" />
          <div>
            <h2 className="text-xl font-bold">{accountDetails.name}</h2>
            <p className="text-sm opacity-80">Account: {accountDetails.accountNumber}</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-sm opacity-80">Available Balance</p>
        <p className="text-3xl font-bold">${accountDetails.balance.toFixed(2)}</p>
      </div>
    </div>
  );
}