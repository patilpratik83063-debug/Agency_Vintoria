'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, Loader2, Clock, User, Building, Mail, PhoneCall } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { FounderAvatars } from './Founders';
import { Button } from './ui/Button';
import { Input, Select, Textarea, FieldLabel } from './ui/Field';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
}

const BUDGET_OPTIONS = ['$10k - $25k', '$25k - $50k', '$50k - $100k+', 'Flexible / Exploring Scope'];

export function ConsultationModal({ isOpen, onClose, initialMessage = '' }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    timeline: 'Within 30 Days',
    budget: BUDGET_OPTIONS[0],
    preferredDate: 'Flexible / Next Available',
    message: initialMessage,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');

  // Escape closes + body scroll lock while open. The prefilled brief is
  // applied via remount key from SiteShell (see components/SiteShell.tsx),
  // so no state-sync effect is needed here.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

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
      setWhatsappUrl(data.whatsappFallbackUrl || '');
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-overlay-strong px-4 py-6 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="consultation-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-modal-title"
        className="relative max-h-[calc(100dvh-3rem)] w-full max-w-lg overflow-y-auto rounded-3xl border border-hairline-raised bg-elevated/95 p-6 shadow-glass-lg backdrop-blur-2xl sm:p-8"
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
            <div className="mt-6 rounded-2xl border border-hairline-raised bg-overlay p-4 text-left text-sm text-zinc-200">
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
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/15 py-2.5 text-sm font-semibold text-emerald-300 transition-colors hover:bg-emerald-400/25 hover:text-white"
              >
                <PhoneCall size={15} />
                <span>Fast-track: send this brief on WhatsApp</span>
              </a>
            )}
            <Button
              size="lg"
              className="mt-4 w-full"
              onClick={() => {
                setStatus('idle');
                onClose();
              }}
            >
              Return to Vintoria &rarr;
            </Button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2.5 mb-3">
                <BrandLogo size="sm" />
                <div className="flex items-center gap-1.5">
                  <FounderAvatars size="xs" />
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-emerald-300 font-medium pl-1">
                  Connect with Founders
                </span>
              </div>
              <h3 id="consultation-modal-title" className="text-2xl font-bold text-white">Start a Project with Vintoria</h3>
              <p className="mt-1 text-sm text-zinc-200">
                Directly connect with Abhishek Kogle (Founder) &amp; Pratik Patil (Co-Founder).
              </p>
            </div>

            {status === 'error' && (
              <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/20 p-3 text-sm text-red-200">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <FieldLabel htmlFor="modal-name">Your Name *</FieldLabel>
                  <div className="relative">
                    <User size={14} className="pointer-events-none absolute left-3.5 top-3.5 text-zinc-400" />
                    <Input
                      id="modal-name"
                      required
                      autoFocus
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel htmlFor="modal-email">Work Email *</FieldLabel>
                  <div className="relative">
                    <Mail size={14} className="pointer-events-none absolute left-3.5 top-3.5 text-zinc-400" />
                    <Input
                      id="modal-email"
                      required
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <FieldLabel htmlFor="modal-company">Company / Project</FieldLabel>
                  <div className="relative">
                    <Building size={14} className="pointer-events-none absolute left-3.5 top-3.5 text-zinc-400" />
                    <Input
                      id="modal-company"
                      type="text"
                      placeholder="e.g. Apex Dynamics"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel htmlFor="modal-budget">Target Budget</FieldLabel>
                  <Select
                    id="modal-budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    {BUDGET_OPTIONS.map((b) => (
                      <option key={b} value={b} className="bg-zinc-900 text-white">
                        {b}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div>
                <FieldLabel htmlFor="modal-message">Project Brief / Technical Goals</FieldLabel>
                <Textarea
                  id="modal-message"
                  rows={3}
                  placeholder="Tell us what you are looking to build (e.g. AI-driven financial copilot, ultra-fast web flagship, SaaS platform, workflow automation)..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="mt-2 w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    <span>Transmitting to Founders...</span>
                  </>
                ) : (
                  <>
                    <span>Start a Project</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
