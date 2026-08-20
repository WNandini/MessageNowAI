'use client';

import { useEffect, useState } from 'react';
import { LayoutDashboard, Zap, Grid, Activity, Heart, MessageCircle, Plus, Check } from 'lucide-react';
import CreateAutomationModal from '@/app/components/CreateAutomationModel';
import { useGetInstagramPostsQuery } from '@/app/store/api/instagramApi';
import { useGetAutomationsQuery } from "@/app/store/api/automationApi";

export default function PostsPage() {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isAutomationModalOpen, setIsAutomationModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: posts, isLoading, error } = useGetInstagramPostsQuery();
  const { data: automationsResponse, isLoading: automationsLoading, } = useGetAutomationsQuery();

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname
      );
    }
  }, []);

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

  const automations = automationsResponse?.data || [];

  // Function that runs when the user clicks "Create Automation" inside the modal
  const handleCreateAutomation = (data: { keyword: string; message: string }) => {
    // You can add your API call or state update logic here to save the automation!
  };

  return (
    <div className="flex-1 p-8 lg:p-10 flex flex-col space-y-8 bg-[var(--bg-primary)]">
      {/* Header Section */}
      <div className="flex flex-col space-y-1">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          Your Instagram Posts
        </h1>
        <p className="text-xs text-zinc-400">
          Choose a post and turn comments into automatic DMs.
        </p>
      </div>

      {/* Posts Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {posts?.map((post) => {
          const automation = automations.find(
            (item: any) => item.instagramPostId === post.id
          );
          return (
            <div
              key={post.id}
              className="bg-[#121215] border border-zinc-800/80 rounded-2xl p-4 flex flex-col justify-between space-y-4 shadow-xl"
            >
              {/* Image */}
              <div className="relative w-full h-72 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                <img
                  src={post.media_url}
                  alt="Instagram post"
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg flex items-center space-x-1.5 shadow-md">
                  <Grid className="w-3 h-3 text-white" />

                  <span className="text-[10px] font-bold tracking-wider text-white">
                    {post.media_type === "VIDEO" ? "REEL" : "POST"}
                  </span>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center justify-end px-1">
                <span className="text-[11px] text-zinc-500">
                  {new Date(post.timestamp).toLocaleDateString()}
                </span>
              </div>

              {/* Automation */}
              <div className="bg-[#18181b] border border-zinc-800/80 rounded-xl p-3.5">

                {automation ? (
                  <div className="flex flex-col space-y-2.5">
                    <div className="flex items-center space-x-2 text-emerald-400">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-xs font-bold tracking-tight">Automation Active</span>
                    </div>
                    <div className="flex items-center justify-between text-xs bg-[#121215] border border-zinc-800 px-3 py-2 rounded-lg">
                      <span className="text-[11px] text-zinc-400">Keyword:</span>
                      <span className="bg-zinc-800/80 border border-zinc-700/60 px-2 py-0.5 rounded text-[11px] font-bold tracking-wider text-white">
                        {automation.keyword}
                      </span>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => {
                    setSelectedPost(post);
                    setIsAutomationModalOpen(true);
                  }}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold py-2.5 rounded-lg"
                  >
                    + Create Automation
                  </button>
                )}
              </div>
            </div>)
        }
        )}


      </div>

      {/* </main> */}
      <CreateAutomationModal
        isOpen={isAutomationModalOpen}
        post={selectedPost}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateAutomation}
      />
    </div>
  );
}