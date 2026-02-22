'use client';

import { FormEvent, useState } from 'react';

type FormState = {
  message: string;
  tone: 'error' | 'success' | null;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function TakeawayForm() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [state, setState] = useState<FormState>({ message: '', tone: null });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailPattern.test(email.trim())) {
      setState({ message: 'Please enter a valid email address.', tone: 'error' });
      return;
    }

    try {
      setSubmitting(true);
      setState({ message: '', tone: null });
      await new Promise((resolve) => setTimeout(resolve, 360));
      setState({
        message: "You're on the list. (Demo - email delivery coming soon.)",
        tone: 'success',
      });
      setEmail('');

      // TODO: Integrate ConvertKit or Mailchimp API endpoint.
    } catch (_error) {
      setState({ message: 'Network error. Please try again.', tone: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <label htmlFor="email" className="text-sm font-medium text-tp-slate">
        Email
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-tp-line bg-white/80 px-4 py-3 text-base text-tp-ink placeholder:text-slate-400 dark:bg-slate-900/65 dark:placeholder:text-slate-500"
          placeholder="you@example.com"
          aria-describedby="takeaway-message"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="rounded-xl bg-tp-teal px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? 'Joining...' : 'Join'}
        </button>
      </div>
      {state.tone === 'success' ? (
        <div
          id="takeaway-message"
          role="status"
          className="flex items-start gap-2 rounded-xl border border-emerald-300/80 bg-emerald-50/80 px-3 py-2 text-sm text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
        >
          <span aria-hidden="true">✓</span>
          <span>{state.message}</span>
        </div>
      ) : (
        <p id="takeaway-message" role="status" className="min-h-6 text-sm">
          {state.message ? (
            <span className="text-red-600 dark:text-red-400">{state.message}</span>
          ) : (
            <span className="text-tp-muted">Enter your email to get this week's practical step.</span>
          )}
        </p>
      )}
    </form>
  );
}
