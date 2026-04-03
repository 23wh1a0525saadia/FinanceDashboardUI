import React, { useState, useEffect } from 'react';
import { Moon, Sun, ChevronDown } from 'lucide-react';

export function Navbar({ darkMode, setDarkMode, role, setRole }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-slate-900 shadow-lg dark:shadow-xl z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">₹</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block">
              Finance Dashboard
            </h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Role Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {role}
                </span>
                <ChevronDown size={16} className="text-gray-600 dark:text-gray-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-800 rounded-lg shadow-xl border dark:border-slate-700">
                  <button
                    onClick={() => {
                      setRole('Viewer');
                      setDropdownOpen(false);
                      localStorage.setItem('userRole', 'Viewer');
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      role === 'Viewer'
                        ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700'
                    } transition-colors`}
                  >
                    Viewer
                  </button>
                  <button
                    onClick={() => {
                      setRole('Admin');
                      setDropdownOpen(false);
                      localStorage.setItem('userRole', 'Admin');
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm border-t dark:border-slate-700 ${
                      role === 'Admin'
                        ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700'
                    } transition-colors`}
                  >
                    Admin
                  </button>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                localStorage.setItem('darkMode', !darkMode);
              }}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
