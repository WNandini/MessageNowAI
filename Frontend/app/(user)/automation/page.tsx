'use client';

import React, { useState } from 'react';
import { Plus, MessageSquare, GraduationCap, MoreVertical, ArrowRight, FileText } from 'lucide-react';
import CreateAutomationModal from '@/app/components/CreateAutomationModel';

export default function AutomationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Function that runs when the user clicks "Create Automation" inside the modal
  const handleCreateAutomation = (data: { keyword: string; message: string }) => {
    console.log("New Automation Created:", data);
    // You can add your API call or state update logic here to save the automation!
  };

  return (
   <div className="flex-1 p-8 lg:p-10 flex flex-col space-y-8 bg-[var(--bg-primary)]">
      
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Automations
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Turn Instagram comments into automatic DMs.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity text-white text-xs font-bold tracking-wider uppercase px-5 py-3 rounded-xl shadow-lg shadow-pink-500/25 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Create Automation</span>
        </button>
      </div>

      {/* Section Title */}
      <h2 className="text-sm font-bold text-white tracking-wide pt-2">
        Your Automations
      </h2>

      {/* Automations List Container */}
      <div className="flex flex-col space-y-6">
        
        {/* Card 1: GUIDE Automation */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 sm:p-6 flex flex-col space-y-6 shadow-xl">
          
          {/* Card Top Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-card-inner)] border border-[var(--border-color)] flex items-center justify-center text-white flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-gray-300" />
              </div>
              <div className="flex flex-col truncate">
                <span className="text-sm font-extrabold text-white tracking-wider truncate">GUIDE</span>
                <span className="text-xs text-[var(--text-muted)] truncate">Trigger Keyword</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <div className="flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 sm:px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span className="text-[10px] font-bold text-emerald-400 tracking-wider">ACTIVE</span>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors cursor-pointer p-1">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Internal Flow Grid Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[var(--bg-card-inner)] border border-[var(--border-color)] rounded-xl p-4 sm:p-5">
            
            {/* When someone comments block */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 flex flex-col space-y-3">
              <span className="text-[10px] font-bold tracking-wider text-[var(--text-muted)] uppercase">
                When someone comments
              </span>
              <div className="bg-[var(--bg-card-inner)] border border-[var(--border-color)] rounded-lg px-4 py-3 flex items-center space-x-3 text-xs text-gray-300 font-medium">
                <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center text-[10px] text-white flex-shrink-0">👤</div>
                <span className="truncate">&ldquo;Send me the GUIDE&rdquo;</span>
              </div>
            </div>

            {/* Send automatic DM block */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 flex flex-col space-y-3">
              <span className="text-[10px] font-bold tracking-wider text-[var(--text-muted)] uppercase">
                Send automatic DM
              </span>
              <div className="bg-purple-950/20 border border-purple-500/20 rounded-lg p-3.5 flex flex-col space-y-3 text-xs text-purple-200">
                <p className="leading-relaxed">
                  Hey! 👋 Here is the guide you asked for. Let me know if you have any questions!
                </p>
                <div className="flex items-center space-x-2 bg-[var(--bg-card)] border border-[var(--border-color)] px-3 py-2 rounded-lg text-xs text-gray-300 w-fit max-w-full">
                  <FileText className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
                  <span className="font-medium truncate">Instagram_Guide.pdf</span>
                </div>
              </div>
            </div>

          </div>

          {/* Card Footer Row */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-[var(--text-muted)]">Created 12 days ago</span>
            <button className="flex items-center space-x-1 text-white hover:text-pink-400 font-semibold transition-colors cursor-pointer group">
              <span>Edit Flow</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>

        {/* Card 2: COURSE Automation */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 sm:p-6 flex flex-col space-y-6 shadow-xl">
          
          {/* Card Top Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg-card-inner)] border border-[var(--border-color)] flex items-center justify-center text-white flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-gray-300" />
              </div>
              <div className="flex flex-col truncate">
                <span className="text-sm font-extrabold text-white tracking-wider truncate">COURSE</span>
                <span className="text-xs text-[var(--text-muted)] truncate">Trigger Keyword</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <div className="flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 sm:px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span className="text-[10px] font-bold text-emerald-400 tracking-wider">ACTIVE</span>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors cursor-pointer p-1">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Internal Flow Grid Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[var(--bg-card-inner)] border border-[var(--border-color)] rounded-xl p-4 sm:p-5">
            
            {/* When someone comments block */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 flex flex-col space-y-3">
              <span className="text-[10px] font-bold tracking-wider text-[var(--text-muted)] uppercase">
                When someone comments
              </span>
              <div className="bg-[var(--bg-card-inner)] border border-[var(--border-color)] rounded-lg px-4 py-3 flex items-center space-x-3 text-xs text-gray-300 font-medium">
                <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center text-[10px] text-white flex-shrink-0">👤</div>
                <span className="truncate">&ldquo;I want the COURSE link!&rdquo;</span>
              </div>
            </div>

            {/* Send automatic DM block */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 flex flex-col space-y-3">
              <span className="text-[10px] font-bold tracking-wider text-[var(--text-muted)] uppercase">
                Send automatic DM
              </span>
              <div className="bg-purple-950/20 border border-purple-500/20 rounded-lg p-3.5 flex flex-col space-y-3 text-xs text-purple-200">
                <p className="leading-relaxed break-words">
                  Awesome! Check out the full course details and secure your spot here:<br />
                  <span className="text-pink-400 font-medium underline break-all">https://link.instaautomate.com/course</span> 🚀
                </p>
              </div>
            </div>

          </div>

          {/* Card Footer Row */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-[var(--text-muted)]">Created 45 days ago</span>
            <button className="flex items-center space-x-1 text-white hover:text-pink-400 font-semibold transition-colors cursor-pointer group">
              <span>Edit Flow</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>

      <CreateAutomationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateAutomation}
      />
    </div>
  );
}