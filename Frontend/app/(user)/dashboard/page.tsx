'use client';

import { useState, useEffect } from 'react';
import { Zap, MessageSquare, Send, Sparkles, CheckCircle2, Info, ArrowUpRight, Bell, CheckCircle } from 'lucide-react';
import { useGetMeQuery } from "@/app/store/api/authApi";
import { useGetAutomationsQuery } from "@/app/store/api/automationApi";
import { useGetActivitiesQuery } from '@/app/store/api/instagramApi';
import StateCard from '@/app/components/StateCard'
import {formatTimeAgo} from '@/utils/formatTime';

export default function DashboardPage() {
  const { data, isLoading, error } = useGetMeQuery();
  const [showAllActivities, setShowAllActivities] = useState(false);
  const {
    data: automationData,
  } = useGetAutomationsQuery();

  const {
    data: activityData,
    isLoading: activityLoading,
  } = useGetActivitiesQuery();
  const activities = activityData?.data || [];

  const activeAutomationCount = automationData?.data.filter(
    (automation: any) => automation.isActive
  ).length;

  const commentReceivedCount = automationData?.data?.reduce(
    (total: number, automation: any) =>
      total + (automation.commentsReceived || 0),
    0
  );

  const dmSentCount = automationData?.data?.reduce(
    (total: number, automation: any) =>
      total + (automation.dmsSent || 0),
    0
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm font-medium">Loading posts...</p>
      </div>
    );
  }

  if (error) {
     return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <p className="text-red-500 text-sm font-medium">Failed to load posts</p>
        <button 
          onClick={() => window.location.reload()} 
          className="text-purple-500 hover:underline text-sm"
        >
          Try again
        </button>
      </div>
    );
  }

  const displayedActivities = showAllActivities
    ? activities
    : activities.slice(0, 3);

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname
      );
    }
  }, []);

  return (
    <div className="flex-1 p-8 lg:p-10 flex flex-col space-y-8 bg-[var(--bg-primary)]">
      {/* Top Header Row */}
      <header className="flex items-center justify-between">
        <div className="flex flex-col space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Good afternoon, {data?.user?.username}
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Manage your Instagram comment-to-DM automations.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 p-[1px]">
            <div className="w-full h-full bg-[var(--bg-card)] rounded-[11px] flex items-center justify-center text-xs font-bold text-white">
              {data?.user?.username
                ? data.user.username.charAt(0).toUpperCase()
                : null}
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Card 1 */}
        <StateCard 
        title="Active Automations" 
        value={activeAutomationCount} 
        icon={<Zap className="w-4 h-4" />} 
        iconColor="text-pink-500" 
        badgeType="success" 
      />

      <StateCard 
        title="Comments Received" 
        value={commentReceivedCount} 
        icon={<MessageSquare className="w-4 h-4" />} 
        iconColor="text-purple-400" 
        badgeType="muted" 
      />

      <StateCard 
        title="DMs Sent" 
        value={dmSentCount} 
        icon={<Send className="w-4 h-4" />} 
        iconColor="text-amber-400" 
        badgeType="success" 
      />

      </div>
      <div className="bg-[#121215] border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            Recent Activity
          </h2>

          {activities.length > 3 && (
            <button
              onClick={() => setShowAllActivities(!showAllActivities)}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {showAllActivities ? "Show Less" : "View All"}
            </button>
          )}
        </div>

        {/* Activities */}
        <div className="flex flex-col gap-4">

          {activityLoading ? (
            <div className="py-10 text-center text-sm text-zinc-500">
              Loading activity...
            </div>
          ) : displayedActivities.length === 0 ? (
            <div className="py-10 text-center text-sm text-zinc-500">
              No recent activity found.
            </div>
          ) : (
            displayedActivities.map((activity: any) => {

              const isSuccess = activity.status === "SUCCESS";

              return (
                <div
                  key={activity._id}
                  className="bg-[#1a1a1f] border border-zinc-800 rounded-2xl px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  {/* Left side */}
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0">

                    {/* Icon */}
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 ${isSuccess
                          ? "bg-emerald-500/10 border border-emerald-500/20"
                          : "bg-zinc-800/60 border border-zinc-700"
                        }`}
                    >
                      {isSuccess ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Info className="w-5 h-5 text-zinc-400" />
                      )}
                    </div>

                    {/* Activity details */}
                    <div className="min-w-0">

                      <p className="text-sm md:text-base font-semibold text-white break-words">
                        {activity.instagramUserName}{" "}commented{" "}

                        <span className="text-pink-400">
                          "{activity.commentText}"
                        </span>

                        {isSuccess && (
                          <>
                            {" "}→ DM sent
                          </>
                        )}
                      </p>

                      <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                        {formatTimeAgo(activity.createdAt)}{" "}•{" "}
                        {isSuccess
                          ? `Automation: ${activity.keyword}`
                          : "No matching keyword"}
                      </p>

                    </div>
                  </div>

                  {/* Status */}
                  <div
                    className={`self-start sm:self-auto shrink-0 px-4 py-2 rounded-full text-xs font-medium border ${isSuccess
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : "bg-zinc-800/60 border-zinc-700 text-zinc-400"
                      }`}
                  >
                    <span className="mr-1">●</span>

                    {isSuccess ? "Success" : "No Match"}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}