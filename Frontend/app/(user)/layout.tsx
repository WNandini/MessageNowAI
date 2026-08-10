import React from 'react';
import Sidebar from '@/app/components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] flex selection:bg-pink-500 selection:text-white overflow-x-hidden">
      {/* Persistent Sidebar for all dashboard pages */}
      <Sidebar />
      
      {/* Main content area where child pages are injected */}
      <main className="flex-1 md:pl-72 flex flex-col min-w-0">
        {children}
      </main>
    </div>
  );
}