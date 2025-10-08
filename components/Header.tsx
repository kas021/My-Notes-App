
import React from 'react';

interface HeaderProps {
  onNewNote: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewNote }) => {
  return (
    <header className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📝</span>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              QuickNotes
            </h1>
          </div>
          <button
            onClick={onNewNote}
            className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
          >
            New Note
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
