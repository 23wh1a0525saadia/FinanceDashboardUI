import React from 'react';
import { TrendingUp, TrendingDown, Wallet, Plus, Minus } from 'lucide-react';

export function SummaryCards({ transactions, loading }) {
  const calculateTotals = () => {
    const income = transactions
      .filter((t) => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    // Calculate percentages (mock previous month for demo)
    const previousBalance = balance * 0.85;
    const incomeChange = ((income - income * 0.9) / (income * 0.9)) * 100;
    const expenseChange = ((expenses - expenses * 1.1) / (expenses * 1.1)) * 100;

    return {
      balance,
      income,
      expenses,
      incomeChange: incomeChange.toFixed(1),
      expenseChange: expenseChange.toFixed(1),
    };
  };

  const totals = calculateTotals();

  const CardSkeleton = () => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg dark:shadow-xl border border-gray-100 dark:border-slate-700">
      <div className="animate-pulse">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gray-200 dark:bg-slate-600 rounded-xl"></div>
          <div className="w-16 h-6 bg-gray-200 dark:bg-slate-600 rounded"></div>
        </div>
        <div className="w-24 h-4 bg-gray-200 dark:bg-slate-600 rounded mb-2"></div>
        <div className="w-32 h-8 bg-gray-200 dark:bg-slate-600 rounded mb-2"></div>
        <div className="w-20 h-3 bg-gray-200 dark:bg-slate-600 rounded"></div>
      </div>
    </div>
  );

  const Card = ({ icon: Icon, title, amount, change, isPositive, isIncome }) => (
    <div className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg dark:shadow-xl hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer border border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-700 relative overflow-hidden">
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-100/0 dark:from-blue-900/0 dark:to-blue-800/0 group-hover:from-blue-50/50 group-hover:to-blue-100/30 dark:group-hover:from-blue-900/20 dark:group-hover:to-blue-800/10 transition-all duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
            isIncome
              ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900'
              : 'bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900'
          }`}>
            <Icon className={`w-6 h-6 transition-colors duration-300 ${
              isIncome
                ? 'text-green-600 dark:text-green-400'
                : 'text-blue-600 dark:text-blue-400'
            }`} />
          </div>
          <div className={`flex items-center space-x-1 text-sm font-semibold transition-all duration-300 ${
            isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {isPositive ? <TrendingUp size={18} className="group-hover:scale-110 transition-transform duration-300" /> : <TrendingDown size={18} className="group-hover:scale-110 transition-transform duration-300" />}
            <span>{Math.abs(change)}%</span>
          </div>
        </div>

        <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-all duration-300 group-hover:scale-105">
          ₹{amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
        </p>

        <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
          {isPositive ? 'Increased' : 'Decreased'} from last month
        </p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <Card
        icon={Wallet}
        title="Total Balance"
        amount={totals.balance}
        change={5.2}
        isPositive={true}
        isIncome={false}
      />
      <Card
        icon={Plus}
        title="Total Income"
        amount={totals.income}
        change={totals.incomeChange}
        isPositive={parseFloat(totals.incomeChange) > 0}
        isIncome={true}
      />
      <Card
        icon={Minus}
        title="Total Expenses"
        amount={totals.expenses}
        change={totals.expenseChange}
        isPositive={parseFloat(totals.expenseChange) < 0}
        isIncome={false}
      />
    </div>
  );
}
