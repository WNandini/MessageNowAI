'use client';

import React from 'react';
import { Zap, MessageSquare, Send, Sparkles, CheckCircle2, Info, ArrowUpRight, Bell } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex-1 p-8 lg:p-10 flex flex-col space-y-8 bg-[var(--bg-primary)]">
      
      {/* Top Header Row */}
      <header className="flex items-center justify-between">
        <div className="flex flex-col space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Good afternoon, Nandini
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Manage your Instagram comment-to-DM automations.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <button className="w-10 h-10 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-gray-300 hover:text-white hover:border-gray-500 transition-all relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-pink-500 rounded-full"></span>
          </button>
          
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 p-[1px]">
            <div className="w-full h-full bg-[var(--bg-card)] rounded-[11px] flex items-center justify-center text-xs font-bold text-white">
              N
            </div>
          </div>
        </div>
      </header>

      {/* Action / CTA Header row */}
      <div className="flex justify-end">
        <button className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-pink-500/20 cursor-pointer">
          <Sparkles className="w-4 h-4" />
          <span>Create Automation</span>
        </button>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
          <div className="flex items-center justify-between text-[var(--text-muted)]">
            <span className="text-xs font-semibold tracking-wider uppercase">Active Automations</span>
            <div className="w-8 h-8 rounded-lg bg-[var(--bg-card-inner)] border border-[var(--border-color)] flex items-center justify-center text-pink-500">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-4xl font-extrabold text-white">5</span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1 bg-emerald-500/10 px-2 py-1 rounded-md">
              <span>↑ 2 New</span>
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
          <div className="flex items-center justify-between text-[var(--text-muted)]">
            <span className="text-xs font-semibold tracking-wider uppercase">Comments Received</span>
            <div className="w-8 h-8 rounded-lg bg-[var(--bg-card-inner)] border border-[var(--border-color)] flex items-center justify-center text-purple-400">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-4xl font-extrabold text-white">128</span>
            <span className="text-xs text-[var(--text-muted)]">Last 7 days</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl">
          <div className="flex items-center justify-between text-[var(--text-muted)]">
            <span className="text-xs font-semibold tracking-wider uppercase">DMs Sent</span>
            <div className="w-8 h-8 rounded-lg bg-[var(--bg-card-inner)] border border-[var(--border-color)] flex items-center justify-center text-amber-400">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-4xl font-extrabold text-white">96</span>
            <span className="text-xs font-semibold text-emerald-400">75% Conv.</span>
          </div>
        </div>

      </div>

      {/* Lower Grid: Recent Activity & Build New Flow Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Recent Activity Section */}
        <div className="lg:col-span-8 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-xl flex flex-col space-y-6">
          
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight">Recent Activity</h2>
            <button className="text-xs text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer">View All</button>
          </div>

          <div className="flex flex-col space-y-3">
            
            {/* Activity Item 1 */}
            <div className="bg-[var(--bg-card-inner)] border border-[var(--border-color)] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium text-white">
                    @creator123 commented <span className="font-bold text-pink-400">“GUIDE”</span> → DM sent
                  </p>
                  <span className="text-xs text-[var(--text-muted)]">2 minutes ago • Automation: Lead Magnet</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Success</span>
              </span>
            </div>

            {/* Activity Item 2 */}
            <div className="bg-[var(--bg-card-inner)] border border-[var(--border-color)] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium text-white">
                    @user456 commented <span className="font-bold text-pink-400">“COURSE”</span> → DM sent
                  </p>
                  <span className="text-xs text-[var(--text-muted)]">10 minutes ago • Automation: Course Promo</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Success</span>
              </span>
            </div>

            {/* Activity Item 3 */}
            <div className="bg-[var(--bg-card-inner)] border border-[var(--border-color)] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gray-500/10 border border-gray-500/20 flex items-center justify-center text-gray-400">
                  <Info className="w-4 h-4" />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium text-white">
                    @user789 commented <span className="font-bold text-gray-300">“hello”</span>
                  </p>
                  <span className="text-xs text-[var(--text-muted)]">18 minutes ago • No matching keyword</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-gray-400 bg-gray-500/10 border border-gray-500/20 px-3 py-1 rounded-full flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                <span>No Match</span>
              </span>
            </div>

          </div>

        </div>

        {/* Build New Flow Sidebar Card */}
        <div className="lg:col-span-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8 shadow-xl flex flex-col items-center text-center space-y-6 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/30">
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-bold text-white tracking-tight">Build New Flow</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Create your first complex automation rule to capture more leads automatically.
            </p>
          </div>

          <button className="w-full flex items-center justify-center space-x-2 bg-[var(--bg-card-inner)] hover:bg-white/10 border border-[var(--border-color)] transition-all text-white font-medium py-3 rounded-xl text-xs tracking-wide cursor-pointer shadow-sm">
            <span>Start Building</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

        </div>

      </div>

    </div>
  );
}