import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { SummaryCards } from './components/SummaryCards';
import { Charts } from './components/Charts';
import { Transactions } from './components/Transactions';
import { Insights } from './components/Insights';
import { AddTransactionModal } from './components/AddTransactionModal';
import { EditTransactionModal } from './components/EditTransactionModal';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
import { SAMPLE_TRANSACTIONS } from './utils/sampleData';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem('userRole') || 'Viewer';
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : SAMPLE_TRANSACTIONS;
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Persist transactions to localStorage
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = async (newTransaction) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      setTransactions((prev) => [newTransaction, ...prev]);
      toast.success('Transaction added successfully!');
    } catch (error) {
      toast.error('Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  const handleEditTransaction = async (updatedTransaction) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      setTransactions((prev) =>
        prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
      );
      toast.success('Transaction updated successfully!');
    } catch (error) {
      toast.error('Failed to update transaction');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTransaction = async (id) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      toast.success('Transaction deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete transaction');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: darkMode ? '#1e293b' : '#ffffff',
              color: darkMode ? '#e2e8f0' : '#1f2937',
              border: `1px solid ${darkMode ? '#334155' : '#e5e7eb'}`,
            },
          }}
        />

        {/* Navbar */}
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          role={role}
          setRole={setRole}
        />

        {/* Main Content */}
        <main className="pt-24 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Add Transaction Button (Admin Only) */}
            {role === 'Admin' && (
              <div className="mb-8 flex justify-end">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  disabled={loading}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 disabled:transform-none disabled:cursor-not-allowed"
                >
                  <Plus size={20} />
                  <span>Add Transaction</span>
                </button>
              </div>
            )}

            {/* Summary Cards */}
            <SummaryCards transactions={transactions} loading={loading} />

            {/* Charts Section */}
            <Charts transactions={transactions} darkMode={darkMode} loading={loading} />

            {/* Insights Section */}
            <Insights transactions={transactions} loading={loading} />

            {/* Transactions Section */}
            <Transactions
              transactions={transactions}
              onEditTransaction={openEditModal}
              onDeleteTransaction={openDeleteModal}
              role={role}
              loading={loading}
            />
          </div>
        </main>

        {/* Modals */}
        <AddTransactionModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddTransaction={handleAddTransaction}
          loading={loading}
        />

        <EditTransactionModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onEditTransaction={handleEditTransaction}
          transaction={selectedTransaction}
          loading={loading}
        />

        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            if (selectedTransaction) {
              handleDeleteTransaction(selectedTransaction.id);
              setIsDeleteModalOpen(false);
            }
          }}
          transaction={selectedTransaction}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
