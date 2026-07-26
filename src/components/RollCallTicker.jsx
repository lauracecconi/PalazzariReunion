import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

// ─────────────────────────────────────────────────────────────
// REAL DATA: paste the "Roll Call" response Sheet's published CSV
// link here once it's set up (Google Sheet linked to the Roll Call
// form -> File -> Share -> Publish to web -> pick the responses
// tab -> CSV format -> paste that URL below).
// This is DIFFERENT from the form's own viewform/formResponse link —
// it's the URL of the spreadsheet where responses land.
// ─────────────────────────────────────────────────────────────
const ROLLCALL_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTVkmMvm2sSC6YhJgj6Ak-eC3TmDLPAiH1Raljfx0d85zRsJIDRcRp4GiJDIytHT6ZtYXUkeoU3PURl/pub?output=csv';
const csvConfigured = !ROLLCALL_CSV_URL.startsWith('PASTE');

// ─────────────────────────────────────────────────────────────
// FAKE "SOCIAL PROOF" SEED LIST
// These are just for fun/hype — edit freely! Once real sign-ups start
// coming in from the CSV above, they'll show up first, with these
// fake ones filling in the rest of the loop so it never feels empty.
// ─────────────────────────────────────────────────────────────
const FAKE_RECENT_SIGNUPS = [
  { emoji: '🍕', text: "The Cecconis just RSVP'd for the Pizza Pool Party!" },
  { emoji: '🦞', text: "Vinny's crew is in for the Lobster Bake!" },
  { emoji: '🎉', text: 'Jule just signed up — bringing the whole family!' },
  { emoji: '🏖️', text: 'Kathy confirmed 4 for the whole week!' },
  { emoji: '📸', text: "Lili's in — can't wait for the photos!" },
  { emoji: '🍝', text: 'The Palazzari cousins just claimed their spot!' },
  { emoji: '☀️', text: "Someone from Boston just said 'count us in!'" },
  { emoji: '👕', text: 'A t-shirt order just came in — get yours!' },
];

const LOCAL_KEY = 'palazzari-rollcall-local';

function getLocalSignups() {
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addLocalSignup(name) {
  try {
    const existing = getLocalSignups();
    const next = [{ emoji: '✅', text: `${name} just joined the roll call!` }, ...existing].slice(0, 10);
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
    return next;
  } catch {
    return [];
  }
}

// Turn a parsed CSV row into a ticker item. Tries a few likely column
// names since the exact header text comes from your Google Form's
// question wording.
function rowToSignup(row) {
  const name = row['Name'] || row['Last Name'] || row['Last Name / Family Name'] || '';
  const bringing = row['who are you bringing'] || row["Who's coming with you?"] || '';
  const count = row['Total Count'] || row['Total Headcount'] || row['Total headcount'] || '';
  const message = row['Roll Call message'] || row['Shout Something Out! (optional)'] || '';

  if (!name) return null;

  let text = `${name} is on the roll call`;
  if (count) text += ` — ${count} coming`;
  else if (bringing) text += ` with ${bringing}`;
  text += '!';
  if (message) text = `${name}: "${message}"`;

  return { emoji: '🎉', text };
}

function useRollCallSignups() {
  const [realSignups, setRealSignups] = useState([]);

  useEffect(() => {
    if (!csvConfigured) return;
    fetch(ROLLCALL_CSV_URL)
      .then((res) => res.text())
      .then((csvText) => {
        const { data } = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        const parsed = data.map(rowToSignup).filter(Boolean).reverse();
        setRealSignups(parsed);
      })
      .catch(() => {
        // If the fetch fails, we just fall back to local + fake signups below
      });
  }, []);

  return [...getLocalSignups(), ...realSignups, ...FAKE_RECENT_SIGNUPS];
}

export function getRollCallCount() {
  return FAKE_RECENT_SIGNUPS.length + getLocalSignups().length;
}

/**
 * variant="compact" -> single-line scrolling marquee (good for Home page)
 * variant="full"    -> larger card carousel (good for the Who's Coming page)
 */
export default function RollCallTicker({ variant = 'compact' }) {
  const items = useRollCallSignups();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (variant !== 'full') return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 3200);
    return () => clearInterval(id);
  }, [items.length, variant]);

  if (variant === 'full') {
    const current = items[index % items.length] ?? items[0];
    return (
      <div className="paper-card rounded-2xl px-6 py-5 flex items-center gap-4">
        <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-basil opacity-60" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-basil" />
        </span>
        <span className="text-2xl">{current.emoji}</span>
        <p className="font-body font-bold text-ink text-sm sm:text-base transition-all">
          {current.text}
        </p>
      </div>
    );
  }

  // compact scrolling marquee
  const loop = [...items, ...items];
  return (
    <div className="rounded-full border-2 border-basil/25 bg-basil/5 overflow-hidden py-2.5">
      <div className="flex items-center gap-8 whitespace-nowrap" style={{ animation: 'rollcall-marquee 28s linear infinite' }}>
        {loop.map((item, i) => (
          <span key={i} className="text-sm font-bold text-ink/80 flex items-center gap-2 flex-shrink-0">
            <span>{item.emoji}</span>
            {item.text}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes rollcall-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
