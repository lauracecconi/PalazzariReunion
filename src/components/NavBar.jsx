import React, { useState } from 'react';

const NAV_ITEMS = [
  { id: 'home', label: 'Benvenuti' },
  { id: 'accommodations', label: 'Accommodations' },
  { id: 'dinner', label: 'Dinner RSVP' },
  { id: 'tshirts', label: 'T-Shirts' },
  { id: 'gallery', label: 'Photo Gallery' },
  { id: 'recipes', label: 'Family Recipes' },
];

export default function NavBar({ page, setPage }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-parchment/95 backdrop-blur border-b-2 border-ink/10">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
        <button
          onClick={() => {
            setPage('home');
            setOpen(false);
          }}
          className="font-display italic text-xl sm:text-2xl text-tomato font-semibold tracking-tight"
        >
          Palazzari <span className="text-ink not-italic font-normal text-base sm:text-lg">Reunion &apos;26</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`px-3 py-2 rounded-full text-sm font-body font-bold transition ${
                page === item.id
                  ? 'bg-tomato text-parchment'
                  : 'text-ink hover:bg-ink/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-ink font-bold text-2xl leading-none px-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? '×' : '☰'}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-ink/10 bg-parchment px-5 py-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setPage(item.id);
                setOpen(false);
              }}
              className={`text-left px-3 py-2 rounded-lg text-sm font-body font-bold ${
                page === item.id ? 'bg-tomato text-parchment' : 'text-ink hover:bg-ink/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
