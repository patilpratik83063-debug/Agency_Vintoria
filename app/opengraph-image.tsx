import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Vintoria — Digital Product Studio';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0a0a0a',
          padding: '72px',
          color: '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              border: '2px solid rgba(255,255,255,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            V
          </div>
          <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>
            VINTORIA&reg;
          </div>
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              fontSize: 20,
              color: '#34d399',
              fontFamily: 'monospace',
              letterSpacing: 2,
            }}
          >
            EST. 2020
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', fontSize: 88, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
            BUILD WHAT&apos;S NEXT.
          </div>
          <div style={{ display: 'flex', fontSize: 30, color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>
            Digital product studio — strategy, design, engineering,
          </div>
          <div style={{ display: 'flex', fontSize: 30, color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>
            AI, automation and growth under one accountable team.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.15)',
            paddingTop: 28,
            fontSize: 22,
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'monospace',
            letterSpacing: 3,
          }}
        >
          <div style={{ display: 'flex' }}>VINTORIA.STUDIO</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', color: '#34d399' }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#34d399', display: 'flex' }} />
            ACCEPTING BRIEFS
          </div>
        </div>
      </div>
    ),
    size
  );
}
