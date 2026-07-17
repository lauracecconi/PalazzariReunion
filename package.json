import React, { useState } from 'react';

// Fill these in once the Google Form is created (see setup notes below).
const FORM_URL = 'PASTE_TSHIRT_FORM_RESPONSE_URL_HERE';
const FORM_ENTRIES = {
  name: 'PASTE_ENTRY_ID',
  size: 'PASTE_ENTRY_ID',
  quantity: 'PASTE_ENTRY_ID',
};

const SIZES = ['Youth S', 'Youth M', 'Youth L', 'Adult S', 'Adult M', 'Adult L', 'Adult XL', 'Adult 2XL', 'Adult 3XL'];

const isConfigured = !FORM_URL.startsWith('PASTE');

export default function TShirtOrder() {
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!name || !size) {
      setError('Please enter your name and pick a size');
      return;
    }
    setError('');
    setSaving(true);

    if (isConfigured) {
      try {
        const body = new URLSearchParams({
          [FORM_ENTRIES.name]: name,
          [FORM_ENTRIES.size]: size,
          [FORM_ENTRIES.quantity]: String(quantity),
        });
        await fetch(FORM_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body,
        });
      } catch (err) {
        // Don't block the order on a network hiccup
      }
    }

    setSaving(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-20 text-center">
        <div className="text-6xl mb-4">👕</div>
        <h1 className="font-display italic font-semibold text-3xl text-basil">Order Received!</h1>
        <p className="text-ink/70 mt-3">Jule and Kathy have your order. Grazie!</p>
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
      <span className="postmark text-basil">Family Merch</span>
      <h1 className="font-display italic font-semibold text-4xl text-basil mt-4">T-Shirt Order</h1>
      <p className="text-ink/70 mt-3">
        Jule and Kathy are handling the family t-shirts — get your size in below.
      </p>

      <div className="paper-card rounded-2xl p-6 mt-8 space-y-5">
        <div>
          <label className="block text-sm font-bold text-ink mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-basil"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-ink mb-1">Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-basil"
          >
            <option value="">Select a size</option>
            {SIZES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-ink mb-1">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-basil"
          />
        </div>

        {error && <p className="text-tomato text-sm font-bold text-center">{error}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="w-full bg-basil text-parchment font-bold py-3 rounded-full hover:bg-basilDark transition disabled:opacity-60"
        >
          {saving ? 'Sending...' : 'Submit Order'}
        </button>
      </div>
    </div>
  );
}
