import React from 'react';

export function Footer() {
  return (
    <footer className="w-full bg-slate-800 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-sm">
            &copy; {new Date().getFullYear()} <span className="text-indigo-400 font-semibold">Learnify</span>. All rights reserved.
          </span>
          <div className="flex gap-4 text-sm">
            <p className="hover:text-white cursor-pointer">Privacy</p>
            <p className="hover:text-white cursor-pointer">Terms</p>
            <p className="hover:text-white cursor-pointer">Contact</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
