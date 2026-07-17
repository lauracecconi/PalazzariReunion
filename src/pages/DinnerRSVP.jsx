import React, { useState } from 'react';

// Fill these in once the Google Form is created (see setup notes below).
const FORM_URL = 'PASTE_DINNER_FORM_RESPONSE_URL_HERE';
const FORM_ENTRIES = {
  familyName: 'PASTE_ENTRY_ID',
  guestCount: 'PASTE_ENTRY_ID',
  pastaNight: 'PASTE_ENTRY_ID',
  lobsterBake: 'PASTE_ENTRY_ID',
  dietaryNotes: 'PASTE_ENTRY_ID',
};

const isConfigured = !FORM_URL.startsWith('PASTE');

export default function DinnerRSVP() {
  const [familyName, setFamilyName] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [pastaNight, setPastaNight] = useState(true);
  const [lobsterBake, setLobsterBake] = useState(true);
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!familyName) {
      setError('Please enter your name or family name');
      return;
    }
    setError('');
    setSaving(true);

    if (isConfigured) {
      try {
        const body = new URLSearchParams({
          [FORM_ENTRIES.familyName]: familyName,
          [FORM_ENTRIES.guestCount]: String(guestCount),
          [FORM_ENTRIES.pastaNight]: pastaNight ? 'Yes' : 'No',
          [FORM_ENTRIES.lobsterBake]: lobsterBake ? 'Yes' : 'No',
          [FORM_ENTRIES.dietaryNotes]: dietaryNotes,
        });
        await fetch(FORM_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body,
        });
      } catch (err) {
        // Don't block the RSVP on a network hiccup
      }
    }

    setSaving(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-20 text-center">
        <div className="text-6xl mb-4">🍝</div>
        <h1 className="font-display italic font-semibold text-3xl text-tomato">Grazie!</h1>
        <p className="text-ink/70 mt-3">Your dinner RSVP is in. See you at the table!</p>
        {!isConfigured && (
          <p className="text-xs text-ink/40 mt-6">
            (Dev note: FORM_URL isn't configured yet, so this submission wasn't actually saved anywhere.)
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-14">
      <span className="postmark text-tomato">Dinner Nights</span>
      <h1 className="font-display italic font-semibold text-4xl text-tomato mt-4">RSVP</h1>
      <p className="text-ink/70 mt-3">
        Let us know who's coming to Pasta Night and the Lobster Bake, so we can plan for the right numbers.
      </p>

      <div className="paper-card rounded-2xl p-6 mt-8 space-y-5">
        <div>
          <label className="block text-sm font-bold text-ink mb-1">Your Name / Family Name</label>
          <input
            type="text"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-tomato"
            placeholder="e.g. The Palazzari-Smiths"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-ink mb-1">Number of Guests</label>
          <input
            type="number"
            min="1"
            value={guestCount}
            onChange={(e) => setGuestCount(Math.max(1, Number(e.target.value)))}
            className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-tomato"
          />
        </div>

        <div className="flex items-center justify-between border-2 border-ink/10 rounded-xl p-4">
          <div>
            <p className="font-bold text-sm">Pasta Night</p>
            <p className="text-xs text-ink/60">No additional cost</p>
          </div>
          <input
            type="checkbox"
            checked={pastaNight}
            onChange={(e) => setPastaNight(e.target.checked)}
            className="w-5 h-5 accent-basil"
          />
        </div>

        <div className="flex items-center justify-between border-2 border-ink/10 rounded-xl p-4">
          <div>
            <p className="font-bold text-sm">Lobster Bake</p>
            <p className="text-xs text-ink/60">Additional cost applies</p>
          </div>
          <input
            type="checkbox"
            checked={lobsterBake}
            onChange={(e) => setLobsterBake(e.target.checked)}
            className="w-5 h-5 accent-tomato"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-ink mb-1">Dietary Notes (optional)</label>
          <textarea
            value={dietaryNotes}
            onChange={(e) => setDietaryNotes(e.target.value)}
            rows={3}
            className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-tomato"
            placeholder="Allergies, vegetarian, etc."
          />
        </div>

        {error && <p className="text-tomato text-sm font-bold text-center">{error}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="w-full bg-tomato text-parchment font-bold py-3 rounded-full hover:bg-tomatoDark transition disabled:opacity-60"
        >
          {saving ? 'Sending...' : 'Send RSVP'}
        </button>
      </div>
    </div>
  );
}
