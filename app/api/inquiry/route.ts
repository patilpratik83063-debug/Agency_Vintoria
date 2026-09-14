import { NextRequest, NextResponse } from 'next/server';

interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  company: string;
  timeline: string;
  budget: string;
  message: string;
  preferredDate?: string;
  createdAt: string;
}

// In-memory store for active session records
const recentInquiries: InquiryRecord[] = [
  {
    id: 'VIN-8942-X',
    name: 'Julian Vance',
    email: 'j.vance@solaris-labs.io',
    company: 'Solaris Systems',
    timeline: 'Within 30 Days',
    budget: '$50k - $100k',
    message: 'Looking for a custom multi-agent document analysis platform with real-time audit trail.',
    preferredDate: 'Thursday, 2:00 PM EST',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'VIN-8931-E',
    name: 'Claire Moreau',
    email: 'claire@novus-fintech.eu',
    company: 'Novus Capital',
    timeline: '6-8 Weeks',
    budget: '$25k - $50k',
    message: 'Re-engineering our customer onboarding dashboard to Next.js 15 with sub-second latency.',
    preferredDate: 'Friday, 10:00 AM CET',
    createdAt: new Date(Date.now() - 3600000 * 22).toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    inquiries: recentInquiries.slice(0, 5),
    totalCount: recentInquiries.length,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company = 'Confidential', timeline = 'Flexible', budget = '$25k - $50k', message = '', preferredDate } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required to schedule an engineering brief.' },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid business email address.' },
        { status: 400 }
      );
    }

    const newRecord: InquiryRecord = {
      id: `VIN-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company.trim() || 'Independent / Startup',
      timeline,
      budget,
      message: message.trim(),
      preferredDate: preferredDate || 'Earliest available slot',
      createdAt: new Date().toISOString(),
    };

    // Store in-memory
    recentInquiries.unshift(newRecord);
    if (recentInquiries.length > 20) {
      recentInquiries.pop();
    }

    return NextResponse.json({
      success: true,
      message: 'Brief accepted. A Principal Architect will review your specifications and reach out within 4 business hours.',
      inquiry: newRecord,
    });
  } catch (error) {
    console.error('Inquiry API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal system error processing consultation brief.' },
      { status: 500 }
    );
  }
}
