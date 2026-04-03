import React, { useMemo } from 'react';
import { TrendingUp, Award, Zap } from 'lucide-react';

export function Insights({ transactions, loading }) {
  const insights = useMemo(() => {
    // Highest spending category
    const categorySpending = {};
    transactions
      .filter((t) => t.type === 'Expense')
      .forEach((t) => {
        categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
      });

    const highestCategory = Object.entries(categorySpending).sort(
      ([, a], [, b]) => b - a
    )[0];

    // Monthly spending trend
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const currentMonthExpenses = transactions
      .filter((t) => {
        const tDate = new Date(t.date);
        return (
          t.type === 'Expense' &&
          tDate.getMonth() === currentMonth &&
          tDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const lastMonthExpenses = transactions
      .filter((t) => {
        const tDate = new Date(t.date);
        return (
          t.type === 'Expense' &&
          tDate.getMonth() === (currentMonth - 1 + 12) % 12 &&
          tDate.getFullYear() === (currentMonth === 0 ? currentYear - 1 : currentYear)
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const spendingChange =
      lastMonthExpenses === 0
        ? 0
        : ((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100;

    // Total income vs expenses ratio
    const totalIncome = transactions
      .filter((t) => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const savingsRate = totalIncome === 0 ? 0 : ((totalIncome - totalExpenses) / totalIncome) * 100;

    return {
      highestCategory,
      currentMonthExpenses,
      lastMonthExpenses,
      spendingChange,
      savingsRate,
    };
  }, [transactions]);

  const InsightCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg dark:shadow-xl border border-gray-100 dark:border-slate-700 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden group">
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 to-purple-100/0 dark:from-purple-900/0 dark:to-purple-800/0 group-hover:from-purple-50/50 group-hover:to-purple-100/30 dark:group-hover:from-purple-900/20 dark:group-hover:to-purple-800/10 transition-all duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2 transition-colors duration-300">
              {title}
            </h3>
            <p className={`text-3xl font-bold ${color} transition-all duration-300 group-hover:scale-105`}>
              {value}
            </p>
          </div>
          <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
            color.includes('green')
              ? 'bg-green-100 dark:bg-green-900'
              : color.includes('blue')
              ? 'bg-blue-100 dark:bg-blue-900'
              : 'bg-purple-100 dark:bg-purple-900'
          }`}>
            <Icon className={`w-6 h-6 transition-colors duration-300 ${
              color.includes('green')
                ? 'text-green-600 dark:text-green-400'
                : color.includes('blue')
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-purple-600 dark:text-purple-400'
            }`} />
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
          {subtitle}
        </p>
      </div>
    </div>
  );

  const InsightSkeleton = () => (
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

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Financial Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InsightSkeleton />
          <InsightSkeleton />
          <InsightSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Financial Insights
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.highestCategory && (
          <InsightCard
            icon={Award}
            title="Highest Spending"
            value={insights.highestCategory[0]}
            subtitle={`₹${insights.highestCategory[1].toLocaleString('en-IN', {
              maximumFractionDigits: 0,
            })} this month`}
            color="text-blue-600 dark:text-blue-400"
          />
        )}

        <InsightCard
          icon={TrendingUp}
          title="Monthly Spending"
          value={`${Math.abs(insights.spendingChange).toFixed(1)}%`}
          subtitle={`${insights.spendingChange > 0 ? 'Increased' : 'Decreased'} from last month`}
          color={insights.spendingChange > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}
        />

        <InsightCard
          icon={Zap}
          title="Savings Rate"
          value={`${insights.savingsRate.toFixed(1)}%`}
          subtitle={`Of total income saved this month`}
          color="text-purple-600 dark:text-purple-400"
        />
      </div>
    </div>
  );
}
