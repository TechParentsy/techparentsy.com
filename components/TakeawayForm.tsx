'use client';

import { FormEvent, useState } from 'react';

type FormState = {
  message: string;
  tone: 'error' | 'success' | null;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function TakeawayForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>({ message: '', tone: null });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailPattern.test(email.trim())) {
      setState({ message: 'Please enter a valid email address.', tone: 'error' });
      return;
    }

    setState({ message: 'You\'re on the list (demo).', tone: 'success' });
    setEmail('');

    // TODO: Connect to ConvertKit or Mailchimp API endpoint.
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
          className="rounded-xl bg-tp-teal px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-teal-700"
        >
          Join
        </button>
      </div>
      <p id="takeaway-message" role="status" className="min-h-6 text-sm">
        {state.message ? (
          <span className={state.tone === 'error' ? 'text-red-600' : 'text-emerald-700'}>{state.message}</span>
        ) : (
          <span className="text-tp-muted">One practical step each week. No spam. Unsubscribe anytime.</span>
        )}
      </p>
    </form>
  );
}
