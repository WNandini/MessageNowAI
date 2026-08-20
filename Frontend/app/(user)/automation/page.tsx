'use client';

import React, { useState } from 'react';
import { Plus, MessageSquare, Hash, GraduationCap, MoreVertical, ArrowRight, FileText } from 'lucide-react';
import { useGetAutomationsQuery } from "@/app/store/api/automationApi";

export default function AutomationPage() {
  const { data, isLoading, isError } = useGetAutomationsQuery();
  const automations = data?.data || data || [];
  const [expandedId, setExpandedId] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-[#09090b] text-white p-6 md:p-12 flex flex-col space-y-8">

      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-5xl w-full mx-auto">
        <div className="flex flex-col space-y-1">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Automations
          </h1>
          <p className="text-xs text-zinc-400">
            Turn Instagram comments into automatic DMs.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl w-full mx-auto flex flex-col space-y-4">

        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">
          Your Automations
        </h2>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 text-sm font-medium">Loading posts...</p>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <p className="text-red-500 text-sm font-medium">Failed to load posts</p>
            <button
              onClick={() => window.location.reload()}
              className="text-purple-500 hover:underline text-sm"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !isError && automations.length === 0 && (
          <div className="bg-[#121215] border border-zinc-800/80 rounded-2xl p-12 text-center">
            <div className="text-4xl mb-4">
              ⚡
            </div>

            <h3 className="text-lg font-semibold text-white">
              No automation created
            </h3>

            <p className="text-sm text-zinc-500 mt-2">
              Create an automation from one of your Instagram posts.
            </p>
          </div>
        )}

        {/* List of Automations */}
        {!isLoading && !isError && automations.length > 0 && (
          <div className="flex flex-col space-y-4">

            {automations.map((automation: any) => (
              <div
                key={automation._id}
                className="bg-[#121215] border border-zinc-800/80 rounded-2xl p-6 flex flex-col space-y-6 shadow-xl"
              >

                {/* Card Top Row */}
                <div className="flex items-start justify-between">

                  <div className="flex items-center space-x-3.5">

                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-inner flex-shrink-0">
                      <span className="text-xs font-bold">
                        📸
                      </span>
                    </div>

                    <div className="flex flex-col space-y-0.5">

                      <h3 className="text-sm font-bold tracking-wide text-white uppercase">
                        {automation.keyword}
                      </h3>

                      <span className="text-xs text-zinc-400">
                        Trigger Keyword
                      </span>

                    </div>

                  </div>

                  {/* Active Status */}
                  <div className="flex items-center space-x-3">

                    <div
                      className={`flex items-center space-x-1.5 px-3 py-1 rounded-full ${automation.isActive
                        ? "bg-emerald-500/10 border border-emerald-500/20"
                        : "bg-zinc-500/10 border border-zinc-500/20"
                        }`}
                    >

                      <div
                        className={`w-1.5 h-1.5 rounded-full ${automation.isActive
                          ? "bg-emerald-400 animate-pulse"
                          : "bg-zinc-500"
                          }`}
                      />

                      <span
                        className={`text-[10px] font-bold tracking-wider uppercase ${automation.isActive
                          ? "text-emerald-400"
                          : "text-zinc-500"
                          }`}
                      >
                        {automation.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Flow Preview Bar */}
                <div className="bg-[#18181b] border border-zinc-800/80 rounded-xl p-3.5 flex items-center space-x-3 text-xs overflow-x-auto">

                  {/* Keyword */}
                  <div className="flex items-center space-x-1.5 bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-lg text-white font-mono font-bold flex-shrink-0">

                    <Hash className="w-3.5 h-3.5 text-pink-400" />

                    <span>
                      "{automation.keyword.toUpperCase()}"
                    </span>

                  </div>

                  <ArrowRight className="w-4 h-4 text-zinc-500 flex-shrink-0" />

                  {/* Message */}
                  <div className="flex items-center space-x-2 text-zinc-300 truncate py-1">

                    <MessageSquare className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />

                    <span className="truncate">
                      {automation.message}
                    </span>

                    {/* Attachment */}
                    {automation.attachment && (
                      <FileText className="w-3.5 h-3.5 text-pink-400 flex-shrink-0 ml-1" />
                    )}

                  </div>

                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-xs">

                  <span className="text-[11px] text-zinc-500">
                    Created{" "}
                    {new Date(
                      automation.createdAt
                    ).toLocaleDateString()}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}