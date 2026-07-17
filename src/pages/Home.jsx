import React from 'react';

function StampBadge({ children, color = 'text-tomato' }) {
  return <span className={`postmark ${color}`}>{children}</span>;
}

export default function Home({ setPage }) {
  return (
    <div>
      {/* Draft notice */}
      <div className="bg-limoncello/25 border-b-2 border-limoncello/60 text-center py-2 px-4 text-sm font-body font-bold text-ink">
        🚧 Details still being finalized — dates and pricing TBD. Not final yet!
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-5 pt-16 pb-14 text-center">
        <StampBadge>Save the Date &middot; York Beach, Maine</StampBadge>
        <h1 className="font-display italic font-semibold text-5xl sm:text-7xl text-tomato mt-6 leading-[1.05]">
          Buongiorno,<br />Famiglia!
        </h1>
        <p className="font-body text-lg sm:text-xl text-ink/80 mt-6 max-w-2xl mx-auto">
          The Palazzari family is heading to the Maine coast — beginning of August (dates coming soon).
          Sun, sand, pasta, and way too many cousins in one place. Ci vediamo presto!
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="paper-card rounded-2xl p-5">
            <p className="font-display font-semibold text-lg text-ink">Night 1</p>
            <p className="text-ink/70 text-sm mt-2">Arrival — no dinner planned. Grab a bite on your own and settle in.</p>
          </div>
          <div className="paper-card rounded-2xl p-5">
            <p className="font-display font-semibold text-lg text-ink">Pasta Night</p>
            <p className="text-ink/70 text-sm mt-2">One of our two group dinner nights — included, no extra cost.</p>
          </div>
          <div className="paper-card rounded-2xl p-5">
            <p className="font-display font-semibold text-lg text-ink">Lobster Bake</p>
            <p className="text-ink/70 text-sm mt-2">Our other group dinner night — a true Maine classic. Additional cost applies.</p>
          </div>
          <div className="paper-card rounded-2xl p-5">
            <p className="font-display font-semibold text-lg text-ink">Last Night</p>
            <p className="text-ink/70 text-sm mt-2">Everyone's on their own — explore, relax, or find your favorite spot one more time.</p>
          </div>
        </div>
        <p className="text-ink/60 text-sm mt-4 italic">
          Exact order of pasta night vs. lobster bake still to be worked out once dates are set.
        </p>
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

      {/* Dates */}
      <section className="max-w-5xl mx-auto px-5 pb-20">
        <StampBadge color="text-limoncello">Dates</StampBadge>
        <div className="paper-card rounded-2xl p-6 mt-6">
          <p className="text-ink/80">
            Aiming for <strong>beginning of August</strong> — exact dates aren't locked in yet. A couple of things
            that affect cost:
          </p>
          <ul className="mt-3 space-y-2 text-ink/80">
            <li className="flex gap-2"><span className="text-tomato font-bold">•</span> Thursday through Monday raises the cost.</li>
            <li className="flex gap-2"><span className="text-basil font-bold">•</span> Sunday through Thursday (skipping Saturday) keeps cost lower.</li>
          </ul>
          <p className="text-ink/60 text-sm mt-4 italic">
            Once dates are settled, Jule and I will call The Ocean Sands directly as the "Palazzari Reunion" —
            more on that on the Accommodations page.
          </p>
        </div>
      </section>
    </div>
  );
}
