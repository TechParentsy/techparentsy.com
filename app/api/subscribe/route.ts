import { NextResponse } from 'next/server';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getEnv(name: string): string | null {
  const value = process.env[name];
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body?.email?.trim().toLowerCase() ?? '';

    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const formId = getEnv('CONVERTKIT_FORM_ID');
    const apiKey = getEnv('CONVERTKIT_API_KEY');
    if (!formId || !apiKey) {
      return NextResponse.json(
        { error: 'Newsletter service is not configured yet.' },
        { status: 500 }
      );
    }

    const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        api_key: apiKey,
        email,
      }),
      cache: 'no-store',
    });

    const text = await response.text();
    let data: {
      error?: string;
      message?: string;
      subscription?: { state?: string };
    } = {};
    try {
      data = text
        ? (JSON.parse(text) as {
            error?: string;
            message?: string;
            subscription?: { state?: string };
          })
        : {};
    } catch (_error) {
      data = {};
    }

    if (!response.ok || data.error) {
      const message = data.error || data.message || 'Could not subscribe right now. Please try again.';
      return NextResponse.json({ error: message }, { status: 502 });
    }

    const state = data.subscription?.state?.toLowerCase();
    if (state && state !== 'active') {
      return NextResponse.json({
        ok: true,
        message: 'Almost done. Check your email to confirm your subscription.',
      });
    }

    return NextResponse.json({ ok: true, message: "You're on the list." });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again in a moment.' },
      { status: 500 }
    );
  }
}
