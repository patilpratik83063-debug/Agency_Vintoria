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

const STUDIO_EMAIL = process.env.INQUIRY_TO_EMAIL || 'studio@vintoria.engineering';
const WHATSAPP_NUMBER = '918766033979';

function makeId(): string {
  return `VIN-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
}

/**
 * Deliver the inquiry to the founders via Resend when configured
 * (RESEND_API_KEY env var). Without a key the submission is still
 * accepted — the response includes a pre-filled WhatsApp deep-link so
 * the client can hand the lead to the founders instantly.
 */
async function emailFounders(record: InquiryRecord): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from = process.env.INQUIRY_FROM_EMAIL || 'Vintoria Website <onboarding@resend.dev>';
  const body = [
    `<h2>New project brief — ${record.id}</h2>`,
    `<ul>`,
    `<li><b>Name:</b> ${record.name}</li>`,
    `<li><b>Email:</b> ${record.email}</li>`,
    `<li><b>Company:</b> ${record.company}</li>`,
    `<li><b>Timeline:</b> ${record.timeline}</li>`,
    `<li><b>Budget:</b> ${record.budget}</li>`,
    `<li><b>Preferred date:</b> ${record.preferredDate || 'Earliest available'}</li>`,
    `</ul>`,
    `<h3>Brief</h3><p>${record.message.replace(/\n/g, '<br/>')}</p>`,
  ].join('');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [STUDIO_EMAIL],
        reply_to: record.email,
        subject: `New brief ${record.id} — ${record.company || record.name}`,
        html: body,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error('Resend delivery failed:', err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      company = 'Confidential',
      timeline = 'Flexible',
      budget = '$25k - $50k',
      message = '',
      preferredDate,
    } = body;

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

    const record: InquiryRecord = {
      id: makeId(),
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      company: String(company).trim() || 'Independent / Startup',
      timeline: String(timeline),
      budget: String(budget),
      message: String(message).trim(),
      preferredDate: preferredDate || 'Earliest available slot',
      createdAt: new Date().toISOString(),
    };

    console.info('[inquiry] new brief', JSON.stringify(record));
    const emailed = await emailFounders(record);

    const waText = encodeURIComponent(
      `New brief ${record.id}\n\nName: ${record.name}\nEmail: ${record.email}\nCompany: ${record.company}\nTimeline: ${record.timeline}\nBudget: ${record.budget}\n\n${record.message}`
    );

    return NextResponse.json({
      success: true,
      delivered: emailed,
      message: emailed
        ? 'Brief accepted. A Principal Architect will review your specifications and reach out within 4 business hours.'
        : 'Brief recorded. Reach the founders instantly on WhatsApp to fast-track your response.',
      whatsappFallbackUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`,
      inquiry: record,
    });
  } catch (error) {
    console.error('Inquiry API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal system error processing consultation brief.' },
      { status: 500 }
    );
  }
}
