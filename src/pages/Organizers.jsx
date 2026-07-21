import React, { useState } from 'react';

// Change this any time - it's just a soft deterrent, not real security.
const ORGANIZER_PASSWORD = 'Palazzari2027';

const SHEETS = [
  {
    name: 'Dinner RSVP Responses',
    url: 'https://docs.google.com/spreadsheets/d/1oqt9ZMbc2tXytKh7ehLIJVSl6qdghAiMu6Oqz4kxaNs/edit',
    icon: '🍝',
  },
  {
    name: 'T-Shirt Order Responses',
    url: 'https://docs.google.com/spreadsheets/d/1wp4DT-1drCFVU1GDlC5Aiy10N3KRKcD6lu9LGr6QwcY/edit',
    icon: '👕',
  },
    {
    name: 'Volunteer Responses',
    url: 'https://docs.google.com/spreadsheets/d/1U8EdvE__WywExTvQWNV7UiNHcTAwxrt4AqbRqRAcf5c/edit?resourcekey=&gid=1804156388#gid=1804156388',
    icon: '☻',
  },
];

export default function Organizers() {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');

  const handleUnlock = () => {
    if (input === ORGANIZER_PASSWORD) {
      setError('');
      setUnlocked(true);
    } else {
      setError('That\'s not it - try again.');
    }
  };

  if (!unlocked) {
    return (
      <div className="max-w-md mx-auto px-5 py-24 text-center">
        <span className="postmark text-azzurro">Dietro le Quinte</span>
        <h1 className="font-display italic font-semibold text-3xl text-tomato mt-4">Behind the Scenes</h1>
        <p className="text-ink/70 mt-3">For the planning committee only - enter the password to continue.</p>

        <div className="paper-card rounded-2xl p-6 mt-8">
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
            className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 text-center focus:outline-none focus:border-azzurro"
            placeholder="Password"
          />
          {error && <p className="text-tomato text-sm font-bold mt-3">{error}</p>}
          <button
            type="button"
            onClick={handleUnlock}
            className="w-full bg-azzurro text-parchment font-bold py-3 rounded-full hover:opacity-90 transition mt-4"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <span className="postmark text-azzurro">Dietro le Quinte</span>
      <h1 className="font-display italic font-semibold text-3xl text-tomato mt-4">Organizer Links</h1>
      <p className="text-ink/70 mt-3">Quick access to the live response sheets.</p>

      <div className="space-y-3 mt-8">
        {SHEETS.map((sheet) => (
          <a
            key={sheet.name}
            href={sheet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="paper-card rounded-2xl p-5 flex items-center justify-between hover:bg-ink/5 transition"
          >
            <span className="font-body font-bold flex items-center gap-3">
              <span className="text-2xl">{sheet.icon}</span> {sheet.name}
            </span>
            <span className="text-tomato font-bold">Open →</span>
          </a>
        ))}
      </div>
    </div>
  );
}
