import React, { useState } from 'react';

// Fill these in once the Google Form is created (see setup notes below).
const TSHIRT_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdbmX6JWgqyjY-ayfUpquvtKVRNhiNqFFnqvSBLke02ki4Xow/formResponse';
const TSHIRT_FORM_ENTRIES = {
  lastName: 'entry.1657202184',
  firstName: 'entry.1831017839',
  size: 'entry.534534677',
  quantity: 'entry.395871381',
};

const tshirtConfigured = !TSHIRT_FORM_URL.startsWith('PASTE');

const SIZES = ['Youth S', 'Youth M', 'Youth L', 'Adult S', 'Adult M', 'Adult L', 'Adult XL', 'Adult 2XL', 'Adult 3XL'];

let nextOrderId = 1;
const makeOrder = () => ({
  id: nextOrderId++,
  firstName: '',
  size: '',
  quantity: 1,
});

export default function TShirtOrder() {
  const [lastName, setLastName] = useState('');
  const [orders, setOrders] = useState([makeOrder()]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateOrder = (id, field, value) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, [field]: value } : o)));
  };

  const addOrder = () => setOrders((prev) => [...prev, makeOrder()]);

  const removeOrder = (id) => {
    setOrders((prev) => (prev.length > 1 ? prev.filter((o) => o.id !== id) : prev));
  };

  const handleSubmit = async () => {
    if (!lastName) {
      setError('Please enter your last name');
      return;
    }
    for (const o of orders) {
      if (!o.firstName || !o.size) {
        setError('Please enter a first name and size for every order');
        return;
      }
    }
    setError('');
    setSaving(true);

    if (tshirtConfigured) {
      try {
        for (const o of orders) {
          const body = new URLSearchParams({
            [TSHIRT_FORM_ENTRIES.lastName]: lastName,
            [TSHIRT_FORM_ENTRIES.firstName]: o.firstName,
            [TSHIRT_FORM_ENTRIES.size]: o.size,
            [TSHIRT_FORM_ENTRIES.quantity]: String(o.quantity),
          });
          await fetch(TSHIRT_FORM_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
          });
        }
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
        {!tshirtConfigured && (
          <p className="text-xs text-ink/40 mt-6">
            (Dev note: TSHIRT_FORM_URL isn't configured yet, so this submission wasn't actually saved anywhere.)
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
        Jule and Kathy are handling the family t-shirts — get everyone's size in below.
      </p>

      <div className="paper-card rounded-2xl p-6 mt-8">
        <label className="block text-sm font-bold text-ink mb-1">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-basil"
          placeholder="e.g. Palazzari"
        />
      </div>

      <div className="space-y-4 mt-4">
        {orders.map((o, index) => (
          <div key={o.id} className="paper-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="font-display font-semibold text-lg text-basil">Person {index + 1}</p>
              {orders.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeOrder(o.id)}
                  className="text-sm text-tomato hover:text-tomatoDark font-bold"
                >
                  Remove
                </button>
              )}
            </div>

            <label className="block text-sm font-bold text-ink mb-1">First Name</label>
            <input
              type="text"
              value={o.firstName}
              onChange={(e) => updateOrder(o.id, 'firstName', e.target.value)}
              className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-basil mb-4"
              placeholder="e.g. Maria"
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold text-ink mb-1">Size</label>
                <select
                  value={o.size}
                  onChange={(e) => updateOrder(o.id, 'size', e.target.value)}
                  className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-basil"
                >
                  <option value="">Select</option>
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
                  value={o.quantity}
                  onChange={(e) => updateOrder(o.id, 'quantity', Math.max(1, Number(e.target.value)))}
                  className="w-full border-2 border-ink/15 rounded-xl px-4 py-2.5 focus:outline-none focus:border-basil"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addOrder}
        className="w-full mt-4 border-2 border-dashed border-basil/40 text-basil py-2.5 rounded-xl font-bold hover:bg-basil/5 transition"
      >
        + Add Another Person
      </button>

      {error && <p className="text-tomato text-sm font-bold text-center mt-4">{error}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={saving}
        className="w-full bg-basil text-parchment font-bold py-3 rounded-full hover:bg-basilDark transition disabled:opacity-60 mt-4"
      >
        {saving ? 'Sending...' : 'Submit Order'}
      </button>
    </div>
  );
}
