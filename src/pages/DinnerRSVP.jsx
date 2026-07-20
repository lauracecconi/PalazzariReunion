import React, { useState } from 'react';

// Fill these in once the Google Form is created (see setup notes below).
const DINNER_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSedLQFNJD3KinorWh6bC5xXER1ou6VQKwEIGXEnFgTlO7W5nQ/formResponse';
const DINNER_FORM_ENTRIES = {
  lastName: 'entry.840693543',
  firstName: 'entry.1234910271',
  guestCount: 'entry.452450449',
  pastaNight: 'entry.2142211782',
  lobsterBake: 'entry.767682759',
  dietaryNotes: 'entry.136576836',
};

const dinnerConfigured = !DINNER_FORM_URL.startsWith('PASTE');

let nextGuestId = 1;
const makeGuest = () => ({
  id: nextGuestId++,
  firstName: '',
  guestCount: 1,
  pastaNight: true,
  lobsterBake: true,
  dietaryNotes: '',
});

export default function DinnerRSVP() {
  const [lastName, setLastName] = useState('');
  const [guests, setGuests] = useState([makeGuest()]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateGuest = (id, field, value) => {
    setGuests((prev) => prev.map((g) => (g.id === id ? { ...g, [field]: value } : g)));
  };

  const addGuest = () => setGuests((prev) => [...prev, makeGuest()]);

  const removeGuest = (id) => {
    setGuests((prev) => (prev.length > 1 ? prev.filter((g) => g.id !== id) : prev));
  };

  const handleSubmit = async () => {
    if (!lastName) {
      setError('Please enter your last name');
      return;
    }
    for (const g of guests) {
      if (!g.firstName) {
        setError('Please enter a first name for every guest');
        return;
      }
    }
    setError('');
    setSaving(true);

    if (dinnerConfigured) {
      try {
        for (const g of guests) {
          const body = new URLSearchParams({
            [DINNER_FORM_ENTRIES.lastName]: lastName,
            [DINNER_FORM_ENTRIES.firstName]: g.firstName,
            [DINNER_FORM_ENTRIES.guestCount]: String(g.guestCount),
            [DINNER_FORM_ENTRIES.pastaNight]: g.pastaNight ? 'Yes' : 'No',
            [DINNER_FORM_ENTRIES.lobsterBake]: g.lobsterBake ? 'Yes' : 'No',
            [DINNER_FORM_ENTRIES.dietaryNotes]: g.dietaryNotes,
          });
          await fetch(DINNER_FORM_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
          });
        }
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
        {!dinnerConfigured && (
          <p className="text-xs text-ink/40 mt-6">
            (Dev note: DINNER_FORM_URL isn't configured yet, so this submission wasn't actually saved anywhere.)
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
        Let us know who's coming to Pizza Night and the Lobster Bake, so we can plan for the right numbers.
      </p>

      <div className="paper-card rounded-2xl p-6 mt-8">
        <label className="block text-sm font-bold text-ink mb-1">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-tomato"
          placeholder="e.g. Palazzari"
        />
      </div>

      <div className="space-y-4 mt-4">
        {guests.map((g, index) => (
          <div key={g.id} className="paper-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="font-display font-semibold text-lg text-tomato">Guest {index + 1}</p>
              {guests.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeGuest(g.id)}
                  className="text-sm text-tomato hover:text-tomatoDark font-bold"
                >
                  Remove
                </button>
              )}
            </div>

            <label className="block text-sm font-bold text-ink mb-1">First Name</label>
            <input
              type="text"
              value={g.firstName}
              onChange={(e) => updateGuest(g.id, 'firstName', e.target.value)}
              className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-tomato mb-4"
              placeholder="e.g. Maria"
            />

            <label className="block text-sm font-bold text-ink mb-1">Number of Guests</label>
            <input
              type="number"
              min="1"
              value={g.guestCount}
              onChange={(e) => updateGuest(g.id, 'guestCount', Math.max(1, Number(e.target.value)))}
              className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-tomato mb-4"
            />

            <div className="flex items-center justify-between border-2 border-ink/10 rounded-xl p-4 mb-3">
              <div>
                <p className="font-bold text-sm">Pizza Night</p>
                <p className="text-xs text-ink/60">Group order from a local pizzeria — cost per person applies</p>
              </div>
              <input
                type="checkbox"
                checked={g.pastaNight}
                onChange={(e) => updateGuest(g.id, 'pastaNight', e.target.checked)}
                className="w-5 h-5 accent-basil"
              />
            </div>

            <div className="flex items-center justify-between border-2 border-ink/10 rounded-xl p-4 mb-4">
              <div>
                <p className="font-bold text-sm">Lobster Bake</p>
                <p className="text-xs text-ink/60">Additional cost applies</p>
              </div>
              <input
                type="checkbox"
                checked={g.lobsterBake}
                onChange={(e) => updateGuest(g.id, 'lobsterBake', e.target.checked)}
                className="w-5 h-5 accent-tomato"
              />
            </div>

            <label className="block text-sm font-bold text-ink mb-1">Dietary Notes (optional)</label>
            <textarea
              value={g.dietaryNotes}
              onChange={(e) => updateGuest(g.id, 'dietaryNotes', e.target.value)}
              rows={2}
              className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-tomato"
              placeholder="Allergies, vegetarian, etc."
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addGuest}
        className="w-full mt-4 border-2 border-dashed border-basil/40 text-basil py-2.5 rounded-xl font-bold hover:bg-basil/5 transition"
      >
        + Add Another Guest
      </button>

      {error && <p className="text-tomato text-sm font-bold text-center mt-4">{error}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={saving}
        className="w-full bg-tomato text-parchment font-bold py-3 rounded-full hover:bg-tomatoDark transition disabled:opacity-60 mt-4"
      >
        {saving ? 'Sending...' : 'Send RSVP'}
      </button>
    </div>
  );
}
