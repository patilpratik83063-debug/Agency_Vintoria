'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Mail, Building, User, ArrowRight, Loader2, Clock } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { FounderAvatars, FounderCard } from './Founders';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
}

export function ConsultationModal({ isOpen, onClose, initialMessage = '' }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    timeline: 'Within 30 Days',
    budget: '$15k - $30k',
    preferredDate: 'Flexible / Next Available',
    message: initialMessage,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit booking brief');
      }

      setStatus('success');
      setReferenceId(data.inquiry?.id || 'VIN-CONFIRMED');
    } catch (err: unknown) {
      setStatus('error');
      const errMessage = err instanceof Error ? err.message : 'Error submitting brief. Please try again.';
      setErrorMessage(errMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="consultation-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="consultation-modal-dialog"
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/25 bg-[#0f0f11]/95 p-6 shadow-2xl backdrop-blur-2xl sm:p-8"
      >
        {/* Close Button */}
        <button
          id="modal-close-button"
          onClick={onClose}
          type="button"
          aria-label="Close dialog"
          className="absolute top-5 right-5 rounded-full p-2 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
        >
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex items-center justify-center gap-3">
              <FounderAvatars size="lg" />
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 size={32} />
              </div>
              <BrandLogo size="lg" />
            </div>
            <h3 className="text-2xl font-bold text-white">MESSAGE RECEIVED.</h3>
            <p className="mt-2 text-sm text-zinc-200">
              Your project details are on their way to Abhishek &amp; Pratik at Vintoria. Reference:{' '}
              <span className="font-mono text-emerald-400 font-bold">{referenceId}</span>.
            </p>
            <div className="mt-6 rounded-2xl border border-white/20 bg-black/60 p-4 text-left text-xs text-zinc-200">
              <div className="flex items-center gap-2 font-semibold text-white mb-1.5">
                <Clock size={14} className="text-emerald-400" />
                <span>Next Steps within 4 Business Hours:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-zinc-300 pl-1">
                <li>Direct review by Abhishek Kogle or Pratik Patil</li>
                <li>Strategic feasibility &amp; architecture scope check</li>
                <li>Calendar invitation for Google Meet discovery call</li>
              </ul>
            </div>
            <button
              onClick={() => {
                setStatus('idle');
                onClose();
              }}
              className="mt-6 w-full rounded-full bg-white py-3 text-sm font-bold text-black transition hover:bg-white/90"
            >
              Return to Vintoria →
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2.5 mb-3">
                <BrandLogo size="sm" />
                <div className="flex items-center gap-1.5">
                  <FounderAvatars size="xs" />
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-emerald-400 font-medium pl-1">
                  Connect with Founders
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">Start a Project with Vintoria</h3>
              <p className="mt-1 text-xs sm:text-sm text-zinc-200">
                Directly connect with Abhishek Kogle (Founder) &amp; Pratik Patil (Co-Founder).
              </p>
            </div>

            {status === 'error' && (
              <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/20 p-3 text-xs text-red-200">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-200 mb-1">Your Name *</label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-3 text-zinc-400" />
                    <input
                      required
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-white/20 bg-black/60 py-2 pl-9 pr-3 text-xs text-white placeholder-zinc-400 focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-200 mb-1">Work Email *</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-3 text-zinc-400" />
                    <input
                      required
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-white/20 bg-black/60 py-2 pl-9 pr-3 text-xs text-white placeholder-zinc-400 focus:border-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-200 mb-1">Company / Project</label>
                  <div className="relative">
                    <Building size={14} className="absolute left-3 top-3 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="e.g. Apex Dynamics"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full rounded-xl border border-white/20 bg-black/60 py-2 pl-9 pr-3 text-xs text-white placeholder-zinc-400 focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-200 mb-1">Target Budget</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full rounded-xl border border-white/20 bg-[#161619] py-2 px-3 text-xs text-white focus:border-white focus:outline-none"
                  >
                    <option value="$10k - $25k">$10k - $25k</option>
                    <option value="$25k - $50k">$25k - $50k</option>
                    <option value="$50k - $100k+">$50k - $100k+</option>
                    <option value="Flexible / Exploring Scope">Flexible / Exploring Scope</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-200 mb-1">Project Brief / Technical Goals</label>
                <textarea
                  rows={3}
                  placeholder="Tell us what you are looking to build (e.g. AI-driven financial copilot, ultra-fast web flagship, SaaS platform, workflow automation)..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-white/20 bg-black/60 p-3 text-xs text-white placeholder-zinc-400 focus:border-white focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-xs sm:text-sm font-bold text-black transition-all hover:bg-white/90 disabled:opacity-50 shadow-lg active:scale-95"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    <span>Transmitting to Founders...</span>
                  </>
                ) : (
                  <>
                    <span>START A PROJECT →</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
