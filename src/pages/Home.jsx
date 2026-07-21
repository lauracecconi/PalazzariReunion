import React, { useState } from 'react';

function StampBadge({ children, color = 'text-tomato' }) {
  return <span className={`postmark ${color}`}>{children}</span>;
}

// Fill these in once the Google Form is created (see setup notes below).
const VOLUNTEER_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe5oNU1UluaXv9_rfkH_qIXXlBPtgB8qNhZSm7w_ZcTJXLMgA/formResponse';
const VOLUNTEER_FORM_ENTRIES = {
  name: 'entry.1927771640',
  message: 'entry.794936153',
  contact: 'entry.29485194',
};

const volunteerConfigured = !VOLUNTEER_FORM_URL.startsWith('PASTE');

function VolunteerSignup() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!name || !message) {
      setError('Please fill in your name and a note about how you\'d like to help');
      return;
    }
    setError('');
    setSaving(true);

    if (volunteerConfigured) {
      try {
        const body = new URLSearchParams({
          [VOLUNTEER_FORM_ENTRIES.name]: name,
          [VOLUNTEER_FORM_ENTRIES.message]: message,
          [VOLUNTEER_FORM_ENTRIES.contact]: contact,
        });
        await fetch(VOLUNTEER_FORM_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body,
        });
      } catch (err) {
        // Don't block on a network hiccup
      }
    }

    setSaving(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="paper-card rounded-2xl p-6 mt-6 text-center">
        <div className="text-4xl mb-2">🙌</div>
        <p className="font-display font-semibold text-lg text-basil">Grazie mille!</p>
        <p className="text-ink/70 text-sm mt-1">We've got your note and will be in touch.</p>
        {!volunteerConfigured && (
          <p className="text-xs text-ink/40 mt-4">
            (Dev note: VOLUNTEER_FORM_URL isn't configured yet, so this submission wasn't actually saved anywhere.)
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="paper-card rounded-2xl p-6 mt-6">
      <label className="block text-sm font-bold text-ink mb-1">Your Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-basil mb-4"
        placeholder="e.g. Brad Cecconi"
      />
      <label className="block text-sm font-bold text-ink mb-1">Have an idea, or want to help?</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-basil mb-4"
        placeholder="An activity idea, help organizing something, day-of setup, whatever it is!"
      />
      <label className="block text-sm font-bold text-ink mb-1">Contact Information</label>
      <textarea
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        rows={2}
        className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-basil"
        placeholder="Email, Phone Number"
      />
      {error && <p className="text-tomato text-sm font-bold mt-3">{error}</p>}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={saving}
        className="w-full bg-basil text-parchment font-bold py-3 rounded-full hover:bg-basilDark transition disabled:opacity-60 mt-4"
      >
        {saving ? 'Sending...' : 'Count Me In'}
      </button>
    </div>
  );
}

export default function Home({ setPage }) {
  return (
    <div>
      {/* Draft notice */}
      <div className="bg-limoncello/25 border-b-2 border-limoncello/60 text-center py-2 px-4 text-sm font-body font-bold text-ink">
        🚧 Dates are locked in — a few other details (final pricing, exact dinner order) still being finalized.
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-5 pt-16 pb-14 text-center">
        <StampBadge>Save the Date &middot; York Beach, Maine</StampBadge>
        <h1 className="font-display italic font-semibold text-5xl sm:text-7xl text-tomato mt-6 leading-[1.05]">
          Buongiorno,<br />Famiglia!
        </h1>
        <p className="font-body text-lg sm:text-xl text-ink/80 mt-6 max-w-2xl mx-auto">
          The Palazzari family is heading to the Maine coast — <strong>August 1st&ndash;5th, 2027</strong>.
          Sun, sand, pizza, and way too many cousins in one place. Ci vediamo presto!
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-9">
          <button
            onClick={() => setPage('dinner')}
            className="bg-tomato text-parchment font-body font-bold px-6 py-3 rounded-full hover:bg-tomatoDark transition"
          >
            RSVP for Dinners
          </button>
          <button
            onClick={() => setPage('tshirts')}
            className="bg-basil text-parchment font-body font-bold px-6 py-3 rounded-full hover:bg-basilDark transition"
          >
            Order a T-Shirt
          </button>
          <button
            onClick={() => setPage('accommodations')}
            className="bg-white text-ink border-2 border-ink/15 font-body font-bold px-6 py-3 rounded-full hover:bg-ink/5 transition"
          >
            Where to Stay
          </button>
        </div>
      </section>

      {/* Itinerary */}
      <section className="max-w-5xl mx-auto px-5 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <StampBadge color="text-azzurro">The Itinerary (so far)</StampBadge>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="paper-card rounded-2xl p-5">
            <p className="font-display font-semibold text-lg text-ink">Day 1</p>
            <p className="text-ink/60 text-xs mt-0.5">Sun, Aug 1</p>
            <p className="text-ink/70 text-sm mt-2">Arrival — no dinner planned. Grab a bite on your own and settle in.</p>
          </div>
          <div className="paper-card rounded-2xl p-5">
            <p className="font-display font-semibold text-lg text-ink">Day 2</p>
            <p className="text-ink/60 text-xs mt-0.5">Mon, Aug 2</p>
            <p className="text-ink/70 text-sm mt-2">
              Pizza Pool Party — a group order from a local pizzeria for anyone interested, hanging out
              by the pool. Additional cost applies.
            </p>
          </div>
          <div className="paper-card rounded-2xl p-5">
            <p className="font-display font-semibold text-lg text-ink">Day 3</p>
            <p className="text-ink/60 text-xs mt-0.5">Tue, Aug 3</p>
            <p className="text-ink/70 text-sm mt-2">Lobster Bake — our group dinner night, a true Maine classic. Additional cost applies.</p>
          </div>
          <div className="paper-card rounded-2xl p-5">
            <p className="font-display font-semibold text-lg text-ink">Day 4</p>
            <p className="text-ink/60 text-xs mt-0.5">Wed, Aug 4</p>
            <p className="text-ink/70 text-sm mt-2">Open day — explore, relax, or plan your own dinner. </p>
          </div>
          <div className="paper-card rounded-2xl p-5">
            <p className="font-display font-semibold text-lg text-ink">Day 5</p>
            <p className="text-ink/60 text-xs mt-0.5">Thu, Aug 5</p>
            <p className="text-ink/70 text-sm mt-2">Departure — everyone's on their own to head out or find a favorite spot one more time.</p>
          </div>
        </div>
      </section>

      {/* Who's doing what */}
      <section className="max-w-5xl mx-auto px-5 pb-16">
        <StampBadge color="text-basil">Who's Doing What</StampBadge>
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <div className="paper-card rounded-2xl p-6 flex items-start gap-4">
            <span className="text-3xl">📸</span>
            <div>
              <p className="font-display font-semibold text-lg">Photography</p>
              <p className="text-ink/70 text-sm mt-1">Lili is arranging our photographer — more details soon.</p>
            </div>
          </div>
          <div className="paper-card rounded-2xl p-6 flex items-start gap-4">
            <span className="text-3xl">👕</span>
            <div>
              <p className="font-display font-semibold text-lg">Family T-Shirts</p>
              <p className="text-ink/70 text-sm mt-1">Jule and Kathy are running the t-shirt order — use the button above to get your size in.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer sign-up */}
      <section className="max-w-5xl mx-auto px-5 pb-16">
        <StampBadge color="text-azzurro">Want to Help?</StampBadge>
        <h2 className="font-display font-semibold text-2xl mt-3">Have an Idea? Want to Help Out?</h2>
        <p className="text-ink/70 mt-2 max-w-2xl">
          Whether it's an activity idea, a hand organizing something, or just being willing to pitch in day-of —
          let us know below.
        </p>
        <VolunteerSignup />
      </section>

      {/* Dates */}
      <section className="max-w-5xl mx-auto px-5 pb-20">
        <StampBadge color="text-limoncello">Dates</StampBadge>
        <div className="paper-card rounded-2xl p-6 mt-6">
          <p className="text-ink/80">
            The reunion is set for <strong>August 1st–5th, 2027</strong>.
          </p>
          <p className="text-ink/60 text-sm mt-4 italic">
            Jule and Lili will call The Ocean Sands directly as the "Palazzari Reunion" —
            more on that on the Accommodations page.
          </p>
        </div>
      </section>
    </div>
  );
}
