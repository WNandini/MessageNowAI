'use client';

import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] flex flex-col justify-between selection:bg-pink-500 selection:text-white overflow-x-hidden">
      
      {/* Top Navigation Bar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <span className="font-bold text-lg tracking-tight text-white">
            MessageNowAI
          </span>
          <span className="hidden md:inline-block text-xs text-[var(--text-muted)] border-l border-[var(--border-color)] pl-4">
            Built for Instagram creators
          </span>
        </div>
        <Link 
  href="/auth"
  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 transition-all text-white text-sm font-medium px-4 py-2 rounded-full border border-white/10"
>
  <span>Get Started</span>
  <ArrowRight className="w-4 h-4" />
</Link>
      </header>

      {/* Hero Section */}
      <main className="w-full max-w-7xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow">
        
        {/* Left Column: Copy & Call-to-Action */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none">
            Turn Comments <br />
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Into DMs.
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-xl font-normal leading-relaxed">
            Automatically send the right message when someone comments on your Instagram post.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 pt-2">
            <button className="flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-pink-500/20">
              {/* <Instagram className="w-5 h-5" /> */}
              <span>Get Started with Instagram</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <span className="text-xs text-[var(--text-muted)] tracking-wide">
            Connect your Instagram account in seconds.
          </span>
        </div>

        {/* Right Column: Interactive UI Visualizer Simulation Card */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <div className="w-full max-w-md bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 shadow-2xl relative flex flex-col space-y-6">
            
            {/* Top Post / Comment Box */}
            <div className="bg-[var(--bg-card-inner)] border border-[var(--border-color)] rounded-2xl p-4 flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold text-white">
                  @
                </div>
                <span className="text-sm font-medium text-white">@creator</span>
              </div>
              <p className="text-sm text-gray-300">
                Comment <span className="font-semibold text-white">GUIDE</span> to get the free resource 👇
              </p>
              
              {/* User Reply Element */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
                  <span>@user</span>
                </div>
                <span className="text-xs font-bold tracking-wider text-white">GUIDE</span>
              </div>
            </div>

            {/* Connecting Flow Pill */}
            <div className="flex justify-center -my-2 relative z-10">
              <div className="bg-[var(--bg-card-inner)] border border-[var(--border-color)] text-white text-xs font-semibold px-4 py-1.5 rounded-full flex items-center space-x-2 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>MESSAGENOWAI</span>
              </div>
            </div>

            {/* Bottom Automated DM Box */}
            <div className="bg-[var(--bg-card-inner)] border border-[var(--border-color)] rounded-2xl p-4 flex flex-col space-y-3">
              <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>AUTOMATIC DM SENT</span>
              </div>
              
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 flex flex-col space-y-3">
                <p className="text-sm text-gray-200">
                  Hey! 👋 Here's your free guide:
                </p>
                <div className="w-full bg-[var(--bg-card-inner)] border border-[var(--border-color)] hover:border-gray-500 transition-colors py-2.5 rounded-lg text-center text-xs font-mono text-white cursor-pointer">
                  [ View Guide ]
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* Footer Section */}
      <footer className="w-full border-t border-[var(--border-color)] py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center space-y-4">
          <span className="font-bold text-white tracking-tight">MessageNowAI</span>
          
          <div className="flex items-center space-x-4 text-xs text-[var(--text-muted)] font-medium">
            <span>Simple</span>
            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
            <span>Secure</span>
            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
            <span>Built for Instagram</span>
          </div>
          
          <p className="text-xs text-gray-500 pt-2">
            © 2026 MessageNowAI. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}