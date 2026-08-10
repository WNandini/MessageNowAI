'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Zap, Settings, HelpCircle, Menu, X } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Automations', href: '/automation', icon: Zap },
  ];

  return (
    <>
      {/* Mobile Top Navigation Bar (Only visible on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[var(--bg-primary)] border-b border-[var(--border-color)] px-4 flex items-center justify-between z-30">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white">InstaAutomate</span>
        </div>

        <button
          onClick={() => setIsMobileOpen(true)}
          className="w-10 h-10 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-white shadow-md cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Backdrop for Mobile Drawer */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/75 backdrop-blur-sm animate-fadeIn"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`w-72 border-r border-[var(--border-color)] bg-[var(--bg-primary)] flex flex-col justify-between p-6 fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        
        {/* Top: Brand Logo, Close Button (Mobile), & Navigation */}
        <div className="flex flex-col space-y-8">
          
          {/* Logo & Mobile Close */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-white leading-tight">InstaAutomate</span>
                <span className="text-[10px] text-pink-400 font-semibold tracking-wider">PREMIUM SAAS</span>
              </div>
            </div>

            {/* Close button for mobile drawer */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden w-8 h-8 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Navigation Links */}
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[var(--bg-card)] text-white border border-[var(--border-color)] shadow-md'
                      : 'text-[var(--text-muted)] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-pink-500' : 'text-gray-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile Card */}
        <div className="flex flex-col space-y-6">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs overflow-hidden border border-pink-500/50 flex-shrink-0">
              N
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-semibold text-white truncate">@nandiniwd23</span>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] text-emerald-400 font-semibold tracking-wider">CONNECTED</span>
              </div>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
}