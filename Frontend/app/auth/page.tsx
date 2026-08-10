'use client';

import React from 'react';
import Link from 'next/link';
import { Lock, ArrowRight, User } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] flex flex-col justify-between px-6 py-6 selection:bg-pink-500 selection:text-white overflow-x-hidden">
      
      {/* Top Header with Link Navigation back to home */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight text-white hover:opacity-80 transition-opacity">
          MessageNowAI
        </Link>
      </header>

      {/* Main Login Card Section */}
      <main className="w-full max-w-xl mx-auto flex flex-col items-center justify-center flex-grow py-12">
        <div className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col items-center text-center space-y-8 relative">
          
          {/* Top Icons Header */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--bg-card-inner)] border border-[var(--border-color)] flex items-center justify-center font-bold text-white text-lg shadow-md">
              M
            </div>
            <div className="w-8 h-[1px] bg-[var(--border-color)]"></div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 p-[1px] shadow-md">
              <div className="w-full h-full bg-[var(--bg-card-inner)] rounded-[11px] flex items-center justify-center text-pink-500">
                <svg 
                  className="w-6 h-6" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </div>
            </div>
          </div>

          {/* Titles */}
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Connect your Instagram
            </h1>
            <p className="text-sm text-[var(--text-muted)] max-w-sm leading-relaxed">
              Connect your Instagram account to start automatically sending DMs when people comment on your posts.
            </p>
          </div>

          {/* Connection Visualizer Box */}
          <div className="w-full bg-[var(--bg-card-inner)] border border-[var(--border-color)] rounded-2xl p-5 flex flex-col items-center space-y-3">
            <div className="flex items-center space-x-2 text-xs font-medium text-gray-300">
              <User className="w-3.5 h-3.5 text-gray-400" />
              <span>@youraccount</span>
            </div>
            <div className="w-[1px] h-6 bg-[var(--border-color)]"></div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-white">
              <span className="w-4 h-4 rounded bg-white text-black flex items-center justify-center text-[10px] font-bold">M</span>
              <span>MessageNowAI</span>
            </div>
          </div>

          {/* Continue Button */}
          <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 hover:opacity-90 transition-opacity text-white font-semibold py-4 rounded-xl shadow-lg shadow-pink-500/20 cursor-pointer">
            <span>Continue with Instagram</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secure Connection Footnote */}
          <div className="flex flex-col items-center space-y-1 text-xs text-[var(--text-muted)] pt-2">
            <span>Secure connection powered by Instagram</span>
            <div className="flex items-center space-x-1.5 text-gray-500">
              <Lock className="w-3.5 h-3.5" />
              <span>Your credentials are never stored.</span>
            </div>
          </div>

        </div>
      </main>

      {/* Page Footer */}
      <footer className="w-full text-center py-4">
        <p className="text-xs text-[var(--text-muted)]">
          By continuing, you agree to our <Link href="#" className="underline hover:text-white transition-colors">Terms</Link> & <Link href="#" className="underline hover:text-white transition-colors">Privacy Policy</Link>.
        </p>
      </footer>

    </div>
  );
}