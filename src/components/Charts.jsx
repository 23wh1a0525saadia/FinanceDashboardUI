import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, PieChart as PieChartIcon } from 'lucide-react';

export function Charts({ transactions, darkMode, loading }) {
  const lineChartData = useMemo(() => {
    const daily = {};
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });

    last30Days.forEach((date) => {
      daily[date] = 0;
    });

    transactions.forEach((t) => {
      const date = t.date.split('T')[0];
      if (daily.hasOwnProperty(date)) {
        daily[date] += t.type === 'Income' ? t.amount : -t.amount;
      }
    });

    let balance = 0;
    return last30Days.map((date) => {
      balance += daily[date];
      return {
        date: new Date(date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        balance,
      };
    });
  }, [transactions]);

  const expenseCategoryData = useMemo(() => {
    const categories = {};
    transactions
      .filter((t) => t.type === 'Expense')
      .forEach((t) => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    });

    return Object.entries(categories)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [transactions]);

  const COLORS = [
    '#3b82f6',
    '#ef4444',
    '#10b981',
    '#f59e0b',
    '#8b5cf6',
    '#ec4899',
  ];

  const chartBgColor = darkMode ? '#1e293b' : '#ffffff';
  const chartTextColor = darkMode ? '#e2e8f0' : '#1f2937';
  const gridColor = darkMode ? '#334155' : '#e5e7eb';

  const ChartSkeleton = ({ title, icon: Icon }) => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg dark:shadow-xl border border-gray-100 dark:border-slate-700">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200 dark:bg-slate-600 rounded-lg"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ChartSkeleton title="Balance Trend (30 Days)" icon={TrendingUp} />
        <ChartSkeleton title="Expense Categories" icon={PieChartIcon} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Balance Trend Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg dark:shadow-xl border border-gray-100 dark:border-slate-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Balance Trend (30 Days)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis stroke={chartTextColor} style={{ fontSize: '12px' }} />
            <YAxis stroke={chartTextColor} style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: chartBgColor,
                border: `1px solid ${gridColor}`,
                borderRadius: '8px',
                color: chartTextColor,
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Expense Categories Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg dark:shadow-xl border border-gray-100 dark:border-slate-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Expense Categories
        </h2>
        {expenseCategoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseCategoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ₹${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationDuration={800}
              >
                {expenseCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: chartBgColor,
                  border: `1px solid ${gridColor}`,
                  borderRadius: '8px',
                  color: chartTextColor,
                }}
                formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">No expense data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
