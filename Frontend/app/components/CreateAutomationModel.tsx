'use client';

import React, { useState } from 'react';
import { X, Sparkles, FileText, Eye, Info, Upload, CheckCircle2 } from 'lucide-react';
import { useCreateAutomationMutation, useUploadFileMutation } from '../store/api/automationApi';

interface CreateAutomationModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: any;
  onSubmit: (data: { keyword: string; message: string; file: File | null }) => void;
}

export default function CreateAutomationModal({ isOpen, onClose, post, onSubmit }: CreateAutomationModalProps) {
  const [keyword, setKeyword] = useState('');
  const [message, setMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [createAutomation] = useCreateAutomationMutation();
const [uploadFile] = useUploadFileMutation();

  if (!isOpen) return null;

  // Check if both fields have text entered
  const isFilled = keyword.trim().length > 0 && message.trim().length > 0;

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (
      !file.type.startsWith("image/") &&
      !file.type.startsWith("video/") &&
      !file.type.startsWith("audio/")
    ) {
      setErrorMessage("Only image, video, and audio files are allowed.");

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);

      e.target.value = "";
      return;
    }

    setAttachedFile(file);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!post) return;

  try {
    let attachment = null;

    if (attachedFile) {
      const uploadResponse = await uploadFile(attachedFile).unwrap();

      attachment = uploadResponse.data;

    }
    await createAutomation({
      instagramPostId: post.id,
      keyword,
      message,
      isActive: true,
      attachment,
    }).unwrap();

    setShowSuccessAlert(true);

    setTimeout(() => {
      setShowSuccessAlert(false);
      setKeyword("");
      setMessage("");
      setAttachedFile(null);
      onClose();
    }, 1500);

  } catch (error) {
    console.error("Failed to create automation:", error);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-4 overflow-y-auto animate-fadeIn">

      {/* Modal Box: Scrollable wrapper for mobile screens */}
      <div className={`w-full my-auto bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-300 relative max-h-[92vh] ${isFilled ? 'max-w-4xl' : 'max-w-xl'
        }`}>

        {/* Success Alert Overlay / Banner */}
        {showSuccessAlert && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 animate-fadeIn p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="text-base font-bold text-white tracking-wide">Automation Created Successfully!</h3>
            <p className="text-xs text-[var(--text-muted)]">Your Instagram flow is now active and ready.</p>
          </div>
        )}
        {errorMessage && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 animate-fadeIn p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shadow-lg shadow-red-500/20">
              <X className="w-8 h-8" />
            </div>

            <h3 className="text-base font-bold text-white tracking-wide">
              Unsupported File
            </h3>

            <p className="text-xs text-[var(--text-muted)] max-w-xs">
              Please upload an image, video, or audio file.
            </p>
          </div>
        )}

        {/* Left Form Section (Scrollable inside modal) */}
        <div className="flex-1 p-5 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">

          <div className="flex flex-col space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">Create Automation</h2>
                <p className="text-xs text-[var(--text-muted)]">Turn a comment into an automatic DM.</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl bg-[var(--bg-card-inner)] border border-[var(--border-color)] flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form id="automation-form" onSubmit={handleSubmit} className="flex flex-col space-y-6">

              {/* Step 1: When Someone Comments */}
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm flex-shrink-0">1</span>
                  <label className="text-xs font-bold tracking-wider text-white uppercase">
                    When someone comments
                  </label>
                </div>

                <div className="bg-[var(--bg-card-inner)] border border-[var(--border-color)] rounded-2xl p-4 flex flex-col space-y-2">
                  <span className="text-[11px] font-medium text-[var(--text-muted)]">Comment keyword</span>
                  <input
                    type="text"
                    required
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="e.g. GUIDE"
                    className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors uppercase font-bold tracking-wider"
                  />
                  <p className="text-[11px] text-[var(--text-muted)] pt-1">
                    Use the word or phrase your audience will comment.
                  </p>
                </div>
              </div>

              {/* Step 2: Send Them */}
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm flex-shrink-0">2</span>
                  <label className="text-xs font-bold tracking-wider text-white uppercase">
                    Send them
                  </label>
                </div>

                <div className="bg-[var(--bg-card-inner)] border border-[var(--border-color)] rounded-2xl p-4 flex flex-col space-y-3">
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your automated message..."
                    className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors resize-none leading-relaxed"
                  />

                  {/* Dynamic File Attachment Area */}
                  {attachedFile ? (
                    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 flex items-center justify-between">
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <div className="w-9 h-9 rounded-lg bg-[var(--bg-card-inner)] border border-[var(--border-color)] flex items-center justify-center text-pink-400 flex-shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-xs font-bold text-white truncate">{attachedFile.name}</span>
                          <span className="text-[10px] text-[var(--text-muted)]">{formatFileSize(attachedFile.size)}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAttachedFile(null)}
                        className="w-7 h-7 rounded-lg bg-[var(--bg-card-inner)] border border-[var(--border-color)] flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-full border border-dashed border-[var(--border-color)] hover:border-pink-500/50 bg-[var(--bg-card)] rounded-xl p-3 flex items-center justify-center space-x-2 text-xs text-[var(--text-muted)] hover:text-white transition-all cursor-pointer text-center">
                      <Upload className="w-4 h-4 text-pink-400 flex-shrink-0" />
                      <span className="truncate">Attach any file (PDF, Image, Video, etc.)</span>
                      <input
                        type="file"
                        accept="image/*,video/*,audio/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

            </form>
          </div>

          {/* Action Buttons for Compact Mode (Mobile fallback view) */}
          <div className="flex md:hidden items-center justify-end space-x-3 pt-4 border-t border-[var(--border-color)]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[var(--bg-card-inner)] border border-[var(--border-color)] text-xs font-semibold text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="automation-form"
              className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-lg shadow-pink-500/25 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create Automation</span>
            </button>
          </div>

          {/* Action Buttons for Desktop Mode (When preview is hidden) */}
          {!isFilled && (
            <div className="hidden md:flex items-center justify-end space-x-3 pt-4 border-t border-[var(--border-color)]">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[var(--bg-card-inner)] border border-[var(--border-color)] text-xs font-semibold text-gray-300 hover:text-white transition-all cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="automation-form"
                className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-lg shadow-pink-500/25 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Create Automation</span>
              </button>
            </div>
          )}

        </div>

        {/* Right Live Preview Section (Hidden on mobile via 'hidden md:flex') */}
        {isFilled && (
          <div className="hidden md:flex w-[380px] bg-[var(--bg-card-inner)] border-l border-[var(--border-color)] p-6 flex-col justify-between space-y-6 overflow-y-auto animate-fadeIn">

            <div className="flex flex-col space-y-4">
              {/* Preview Top Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-[var(--text-muted)]">
                  <Eye className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold tracking-wider uppercase">Preview</span>
                </div>
              </div>

              {/* Mock Phone UI Wrapper */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 flex flex-col space-y-4 shadow-inner">

                {/* Instagram Account Header */}
                <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                      N
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-xs font-bold text-white leading-tight truncate">@nandiniwd23</span>
                      <span className="text-[9px] text-[var(--text-muted)]">Active now</span>
                    </div>
                  </div>
                  <Info className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </div>

                {/* Chat Thread */}
                <div className="flex flex-col space-y-3 pt-1">

                  {/* User Comment Bubble */}
                  <div className="self-end bg-[var(--bg-card-inner)] border border-[var(--border-color)] rounded-xl px-3.5 py-2 max-w-[85%] flex flex-col space-y-1">
                    <span className="text-[10px] font-extrabold text-white tracking-wider uppercase bg-gray-700/50 px-2 py-0.5 rounded w-fit truncate max-w-full">
                      {keyword}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">Commented on post</span>
                  </div>

                  {/* Automated Bot DM Bubble */}
                  <div className="self-start bg-blue-600/20 border border-blue-500/30 rounded-2xl rounded-tl-sm p-3.5 max-w-[90%] flex flex-col space-y-3 text-xs text-blue-100">
                    <p className="leading-relaxed whitespace-pre-wrap break-words">
                      {message}
                    </p>

                    {/* Attached File Preview Inside DM */}
                    {attachedFile && (
                      <div className="flex items-center space-x-2 bg-[var(--bg-card)] border border-[var(--border-color)] p-2.5 rounded-xl">
                        <div className="w-7 h-7 rounded-lg bg-[var(--bg-card-inner)] flex items-center justify-center text-pink-400 flex-shrink-0">
                          <FileText className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-[11px] font-bold text-white truncate">{attachedFile.name}</span>
                          <span className="text-[9px] text-[var(--text-muted)]">{formatFileSize(attachedFile.size)}</span>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* Fake Input Bar at bottom of chat */}
                <div className="pt-2">
                  <div className="w-full bg-[var(--bg-card-inner)] border border-[var(--border-color)] rounded-xl px-3.5 py-2.5 text-[11px] text-gray-500">
                    Message...
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer Action Buttons (When preview is shown on desktop) */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-semibold text-gray-300 hover:text-white transition-all cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                type="submit"
                form="automation-form"
                className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-lg shadow-pink-500/25 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Create Automation</span>
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}