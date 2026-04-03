import React from 'react';
import { X, Trash2, AlertTriangle } from 'lucide-react';

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, transaction, loading }) {
  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl dark:shadow-2xl w-full max-w-md border border-gray-100 dark:border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <AlertTriangle size={20} className="text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Delete Transaction
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X size={24} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center">
            <div className="mb-4">
              <Trash2 size={48} className="mx-auto text-red-500 dark:text-red-400 mb-4" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Are you sure you want to delete this transaction?
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This action cannot be undone. The transaction will be permanently removed from your records.
            </p>

            {/* Transaction Details */}
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p><strong>Title:</strong> {transaction.title}</p>
                <p><strong>Amount:</strong> ₹{transaction.amount.toLocaleString('en-IN')}</p>
                <p><strong>Category:</strong> {transaction.category}</p>
                <p><strong>Type:</strong> {transaction.type}</p>
                <p><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString('en-IN')}</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-lg transition-all transform hover:scale-105 active:scale-95 disabled:transform-none disabled:cursor-not-allowed"
            >
              {loading ? 'Deleting...' : 'Delete Transaction'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
