import React, { useState } from 'react';
import RollCallTicker, { addLocalSignup, getRollCallCount } from '../components/RollCallTicker.jsx';

// ─────────────────────────────────────────────────────────────
// SETUP NOTES (same pattern as the Dinner RSVP / Volunteer forms):
// 1. Create a new Google Form called something like "Palazzari Roll Call"
//    with these questions, IN THIS ORDER:
//      1. Last Name / Family Name         (Short answer)
//      2. Who's coming with you?          (Paragraph - "e.g. Maria, Tony, and the kids")
//      3. Total headcount                 (Short answer or Number)
//      4. Anything you want to shout out? (Paragraph, optional - "so excited!" etc.)
// 2. Click the Google Form's "Send" button, choose the "<>" (embed) tab,
//    and copy the form's action URL — OR right-click "Get pre-filled link"
//    on each question to find its entry.### ID.
// 3. Paste the form's response URL below (it should end in /formResponse),
//    and paste each entry.### ID into ROLLCALL_FORM_ENTRIES.
// ─────────────────────────────────────────────────────────────
const ROLLCALL_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScURju09h--lkuk-b64AGw05w_vm3VTcQbdP3Nt_udxTET-PA/formResponse';
const ROLLCALL_FORM_ENTRIES = {
  lastName: 'entry.630910888',
  whosComing: 'entry.1761996838',
  headcount: 'entry.351370835',
  shoutout: 'entry.871173450',
};

const rollcallConfigured = !ROLLCALL_FORM_URL.startsWith('PASTE');

export default function WhosComing() {
  const [lastName, setLastName] = useState('');
  const [whosComing, setWhosComing] = useState('');
  const [headcount, setHeadcount] = useState(1);
  const [shoutout, setShoutout] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!lastName) {
      setError('Please enter your family/last name');
      return;
    }
    setError('');
    setSaving(true);

    if (rollcallConfigured) {
      try {
        const body = new URLSearchParams({
          [ROLLCALL_FORM_ENTRIES.lastName]: lastName,
          [ROLLCALL_FORM_ENTRIES.whosComing]: whosComing,
          [ROLLCALL_FORM_ENTRIES.headcount]: String(headcount),
          [ROLLCALL_FORM_ENTRIES.shoutout]: shoutout,
        });
        await fetch(ROLLCALL_FORM_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body,
        });
      } catch (err) {
        // Don't block the sign-up on a network hiccup
      }
    }

    // Add this visitor's own sign-up to the (locally stored) ticker,
    // so it shows up immediately on their device too.
    addLocalSignup(`The ${lastName}s`);

    setSaving(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-5 py-20 text-center">
        <div className="text-6xl mb-4">🙋</div>
        <h1 className="font-display italic font-semibold text-3xl text-basil">Ci vediamo presto!</h1>
        <p className="text-ink/70 mt-3">
          You're on the roll call! Thanks for letting us know — see you in York Beach.
        </p>
        {!rollcallConfigured && (
          <p className="text-xs text-ink/40 mt-6">
            (Dev note: ROLLCALL_FORM_URL isn't configured yet, so this submission wasn't actually saved anywhere.)
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-14">
      <span className="postmark text-basil">Roll Call</span>
      <h1 className="font-display italic font-semibold text-4xl sm:text-5xl text-basil mt-4">
        Who's Coming?
      </h1>
      <p className="text-ink/70 mt-3 max-w-xl">
        Add your name to the list! No dinner details needed here — just a quick "we're in" so the
        whole family can see who to expect on the beach.
      </p>

      <div className="mt-6">
        <RollCallTicker variant="full" />
      </div>

      <p className="text-sm text-ink/50 font-bold mt-3 text-center">
        🎉 {getRollCallCount()}+ family members and counting
      </p>

      <div className="paper-card rounded-2xl p-6 mt-8">
        <label className="block text-sm font-bold text-ink mb-1">Last Name / Family Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-basil mb-4"
          placeholder="e.g. Cecconi"
        />

        <label className="block text-sm font-bold text-ink mb-1">Who's coming with you?</label>
        <textarea
          value={whosComing}
          onChange={(e) => setWhosComing(e.target.value)}
          rows={2}
          className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-basil mb-4"
          placeholder="e.g. Maria, Tony, and the kids"
        />

        <label className="block text-sm font-bold text-ink mb-1">Total Headcount</label>
        <input
          type="number"
          min="1"
          value={headcount}
          onChange={(e) => setHeadcount(Math.max(1, Number(e.target.value)))}
          className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-basil mb-4"
        />

        <label className="block text-sm font-bold text-ink mb-1">Shout Something Out! (optional)</label>
        <textarea
          value={shoutout}
          onChange={(e) => setShoutout(e.target.value)}
          rows={2}
          className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-basil"
          placeholder="So excited for this! / Can't wait to see everyone!"
        />

        {error && <p className="text-tomato text-sm font-bold text-center mt-4">{error}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="w-full bg-basil text-parchment font-bold py-3 rounded-full hover:bg-basilDark transition disabled:opacity-60 mt-5"
        >
          {saving ? 'Adding you...' : "Count Me In!"}
        </button>
      </div>

      <p className="text-ink/50 text-xs text-center mt-6">
        This is just a quick headcount — don't forget to RSVP for the Pizza Pool Party and Lobster
        Bake separately on the Dinner RSVP page!
      </p>
    </div>
  );
}
