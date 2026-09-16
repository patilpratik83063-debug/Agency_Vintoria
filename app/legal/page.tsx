'use client';

import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';

const sections = [
  {
    id: 'privacy',
    eyebrow: 'Data Handling',
    title: 'Privacy',
    body: [
      'Project briefs submitted through this website (name, email, company, budget and your message) are used solely to respond to your inquiry and scope the work you asked about. We do not sell, rent or share your details with third parties.',
      'Briefs are retained in our studio inbox for as long as needed to follow up and close the engagement conversation. Ask us by email and we delete them.',
      'This site loads its hero video and poster from Cloudinary and fonts from Google. No advertising or marketing trackers are embedded.',
    ],
  },
  {
    id: 'nda',
    eyebrow: 'Confidentiality',
    title: 'Security & NDA',
    body: [
      'Every engagement starts under confidentiality. We sign mutual NDAs before deep architectural or business disclosure, and our clients\u2019 code, designs and data remain their exclusive property under standard contract terms.',
      'Access to client repositories and environments is limited to the assigned squad, revocable at any time. Workstations use full-disk encryption and password managers; production secrets live in managed secret stores, never in chat threads.',
      'Want the full security posture document? Ask for it in your brief and we will share it directly.',
    ],
  },
  {
    id: 'terms',
    eyebrow: 'Engagement',
    title: 'Terms of Engagement',
    body: [
      'Scope, milestones and payment terms for each project are fixed in a written proposal or statement of work before work begins. Estimated ranges shown on this website (including estimator output) are indicative planning figures, not binding quotes.',
      'Intellectual property for delivered work transfers to the client on final payment. We retain the right to reuse generic patterns, tooling and techniques developed during engagements.',
      'These website terms are a summary; the signed proposal governs every engagement. Questions about contract structure are welcome on any discovery call.',
    ],
  },
];

export default function LegalPage() {
  return (
    <SiteShell>
      {() => (
        <div className="pt-28 sm:pt-32 pb-24 px-5 sm:px-8 md:px-12">
          <div className="mx-auto max-w-3xl">
            <Badge tone="muted" className="mb-6">Last updated: September 2026</Badge>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.08]">
              HOW WE HANDLE{' '}
              <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                YOUR DATA &amp; WORK.
              </span>
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-zinc-300">
              Plain-language commitments on privacy, confidentiality and the way we structure
              engagements. For anything specific, write to{' '}
              <a href="mailto:studio@vintoria.engineering" className="text-emerald-300 underline underline-offset-4">
                studio@vintoria.engineering
              </a>.
            </p>

            <div className="mt-14 space-y-10">
              {sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <GlassCard surface="standard" className="p-7 sm:p-9">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300 font-semibold">
                      {s.eyebrow}
                    </span>
                    <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {s.title}
                    </h2>
                    <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-200">
                      {s.body.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </GlassCard>
                </section>
              ))}
            </div>

            <div className="mt-14 text-center text-sm text-zinc-400">
              <Link href="/contact" className="text-white underline underline-offset-4 hover:text-emerald-300">
                Back to contact
              </Link>{' '}
              &middot;{' '}
              <Link href="/" className="text-white underline underline-offset-4 hover:text-emerald-300">
                Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </SiteShell>
  );
}
