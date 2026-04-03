import React, { useState, useMemo } from 'react';
import { Search, Filter, Trash2, Edit, Download, ArrowUpDown, ArrowUp, ArrowDown, Calendar } from 'lucide-react';
import { categoryIcons } from '../utils/categoryIcons';
import { format, parseISO, isWithinInterval } from 'date-fns';

export function Transactions({ transactions, onEditTransaction, onDeleteTransaction, role, loading }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(transactions.map((t) => t.category));
    return Array.from(cats).sort();
  }, [transactions]);

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions.filter((t) => {
      const matchSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = filterType === 'All' || t.type === filterType;
      const matchCategory = filterCategory === 'All' || t.category === filterCategory;

      // Date range filter
      let matchDateRange = true;
      if (dateRange.start && dateRange.end) {
        const transactionDate = parseISO(t.date);
        const startDate = parseISO(dateRange.start);
        const endDate = parseISO(dateRange.end);
        matchDateRange = isWithinInterval(transactionDate, { start: startDate, end: endDate });
      }

      return matchSearch && matchType && matchCategory && matchDateRange;
    });

    // Sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'category':
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [transactions, searchTerm, filterType, filterCategory, dateRange, sortBy, sortOrder]);

  const getCategoryIcon = (category) => {
    return categoryIcons[category] || '📁';
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return <ArrowUpDown size={16} className="text-gray-400" />;
    return sortOrder === 'asc' ? <ArrowUp size={16} className="text-blue-600" /> : <ArrowDown size={16} className="text-blue-600" />;
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Title', 'Category', 'Type', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...filteredAndSortedTransactions.map(t => [
        format(parseISO(t.date), 'yyyy-MM-dd'),
        `"${t.title}"`,
        t.category,
        t.type,
        t.amount
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(filteredAndSortedTransactions, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_${format(new Date(), 'yyyy-MM-dd')}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Transactions
          </h2>

          {/* Export Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={exportToCSV}
              className="flex items-center space-x-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Download size={16} />
              <span>CSV</span>
            </button>
            <button
              onClick={exportToJSON}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Download size={16} />
              <span>JSON</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
            >
              <Filter size={16} />
              <span className="text-sm font-medium">Filters</span>
            </button>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filteredAndSortedTransactions.length} of {transactions.length} transactions
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all"
                >
                  <option value="All">All Types</option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all"
                >
                  <option value="All">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range Start */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  From Date
                </label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all"
                />
              </div>

              {/* Date Range End */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  To Date
                </label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-8">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex space-x-4">
                  <div className="h-4 bg-gray-200 dark:bg-slate-600 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-slate-600 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-slate-600 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-slate-600 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        ) : filteredAndSortedTransactions.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-700 border-b dark:border-slate-600">
              <tr>
                <th
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Title</span>
                    {getSortIcon('title')}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Category</span>
                    {getSortIcon('category')}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Amount</span>
                    {getSortIcon('amount')}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Date</span>
                    {getSortIcon('date')}
                  </div>
                </th>
                {role === 'Admin' && (
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedTransactions.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className={`border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors ${
                    index % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-gray-50 dark:bg-slate-750'
                  }`}
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {transaction.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                          transaction.type === 'Income'
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">
                        {getCategoryIcon(transaction.category)}
                      </span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {transaction.category}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p
                      className={`text-lg font-bold ${
                        transaction.type === 'Income'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {transaction.type === 'Income' ? '+' : '-'}₹
                      {transaction.amount.toLocaleString('en-IN', {
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {format(parseISO(transaction.date), 'dd MMM yyyy')}
                  </td>
                  {role === 'Admin' && (
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onEditTransaction(transaction)}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                          aria-label="Edit transaction"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => onDeleteTransaction(transaction)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                          aria-label="Delete transaction"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 flex flex-col items-center justify-center">
            <div className="text-6xl mb-4">
              {searchTerm || filterType !== 'All' || filterCategory !== 'All' || dateRange.start || dateRange.end
                ? '🔍'
                : '📋'
              }
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-center text-lg font-medium mb-2">
              {searchTerm || filterType !== 'All' || filterCategory !== 'All' || dateRange.start || dateRange.end
                ? 'No transactions found'
                : 'No transactions yet'
              }
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-center text-sm">
              {searchTerm || filterType !== 'All' || filterCategory !== 'All' || dateRange.start || dateRange.end
                ? 'Try adjusting your search or filters'
                : 'Add your first transaction to get started'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
