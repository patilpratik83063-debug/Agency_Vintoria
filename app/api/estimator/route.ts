import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      projectType = 'Autonomous AI & Full-Stack Platform',
      techRequirements = [],
      timeline = '6-8 Weeks (Accelerated Sprint)',
      budgetTier = 'Growth Tier ($25k - $50k)',
      projectDescription = '',
    } = body;

    // Check if Gemini API is available for real-time generative scope analysis
    const ai = getAIClient();

    let aiGeneratedInsights: string | null = null;
    let customArchitecture = '';

    if (ai && projectDescription.trim().length > 10) {
      try {
        const prompt = `You are the Principal Solutions Architect at Vintoria, a world-class digital engineering studio.
A prospective client requested an engineering architecture and technical scope analysis for:
- Project Type: ${projectType}
- Selected Capabilities: ${techRequirements.join(', ') || 'Custom Full-Stack Architecture'}
- Timeline Target: ${timeline}
- Target Budget: ${budgetTier}
- Client Brief: "${projectDescription}"

Provide a concise, razor-sharp technical summary in JSON format with:
{
  "executiveSummary": "2 punchy sentences on how Vintoria will architect and deliver this system",
  "recommendedStack": ["Tech1", "Tech2", "Tech3", "Tech4", "Tech5"],
  "architectureHighlights": ["Architecture bullet 1", "Architecture bullet 2", "Architecture bullet 3"],
  "riskMitigations": "Key technical edge-case handled proactively"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const text = response.text || '';
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          aiGeneratedInsights = parsed.executiveSummary;
          customArchitecture = parsed.riskMitigations;
        }
      } catch (err) {
        console.warn('Gemini generative scope fallback to deterministic engine:', err);
      }
    }

    // Comprehensive deterministic engineering spec
    const sprintWeeks = timeline.includes('4-6') ? 5 : timeline.includes('8-12') ? 10 : 7;

    const milestones = [
      {
        phase: 'Sprint 01: Architecture & Vector Data Plane',
        duration: '1.5 Weeks',
        deliverables: [
          'High-throughput system architecture & ERD schema definition',
          'Distributed auth & security perimeter setup (SOC2 ready)',
          'API contract specification & headless microservice scaffold',
        ],
      },
      {
        phase: 'Sprint 02: Core Engine, AI Pipelines & Business Logic',
        duration: `${Math.round(sprintWeeks * 0.4)} Weeks`,
        deliverables: [
          'Core domain logic implementation with zero-leakage type safety',
          'AI agent tool calling, structured JSON output validation & RAG integration',
          'Database optimization, connection pooling & transactional consistency',
        ],
      },
      {
        phase: 'Sprint 03: 60fps Micro-Interactions & Client Tier',
        duration: `${Math.round(sprintWeeks * 0.3)} Weeks`,
        deliverables: [
          'Sub-second first contentful paint with Next.js App Router & edge rendering',
          'Pixel-precise, fluid UI physics with motion & responsive layout systems',
          'Real-time WebSocket synchronization & optimistic UI state mutation',
        ],
      },
      {
        phase: 'Sprint 04: Stress Testing, Global Edge CDN & Handover',
        duration: '1.5 Weeks',
        deliverables: [
          'Automated E2E smoke tests, penetration checks & chaos simulation',
          'Global multi-region edge deployment on Cloud Run with zero-downtime CI/CD',
          'Complete TypeScript SDK generation, executive documentation & training',
        ],
      },
    ];

    const recommendedStack = [
      'Next.js 15 (App Router & Server Actions)',
      'TypeScript 5.9 (Strict Type Discipline)',
      'Google Gemini 2.5 Flash / Pro (Intelligent Agent Tier)',
      'Tailwind CSS v4 & Motion (Fluid 60fps UI Physics)',
      'PostgreSQL / pgvector with Connection Pooling',
      'Redis & Edge Invalidation Tier',
      'Docker Containerized Microservices on Cloud Run',
    ];

    const squad = [
      { role: 'Principal Solutions Architect', allocation: '100% Dedicated' },
      { role: 'Lead Full-Stack AI Engineer', allocation: '100% Dedicated' },
      { role: 'Senior Motion & Design Technologist', allocation: '75% Dedicated' },
      { role: 'DevOps & Cloud Security Specialist', allocation: '50% Dedicated' },
    ];

    return NextResponse.json({
      success: true,
      data: {
        specId: `VIN-SPEC-${Math.floor(100000 + Math.random() * 900000)}`,
        projectType,
        timeline,
        budgetTier,
        summary:
          aiGeneratedInsights ||
          `Vintoria will engineer a custom, hyper-performant ${projectType.toLowerCase()} leveraging zero-latency edge architecture, resilient AI orchestration, and production-hardened reliability.`,
        customArchitecture:
          customArchitecture ||
          'Sub-50ms API latency target, automated failovers, and enterprise-grade telemetry out of the box.',
        recommendedStack,
        milestones,
        squad,
        estimatedWeeks: sprintWeeks,
        slaGuarantee: '99.99% Availability SLA & 14-Day Post-Launch Hyper-Care',
      },
    });
  } catch (error) {
    console.error('Estimator API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate technical project specification' },
      { status: 500 }
    );
  }
}
