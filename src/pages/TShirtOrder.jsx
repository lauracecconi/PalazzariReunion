import React from 'react';

// Fill in once Jule and Kathy pick a t-shirt company and share the order link.
const TSHIRT_ORDER_URL = 'PASTE_TSHIRT_ORDER_LINK_HERE';

const isConfigured = !TSHIRT_ORDER_URL.startsWith('PASTE');

export default function TShirtOrder() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-14">
      <span className="postmark text-basil">Family Merch</span>
      <h1 className="font-display italic font-semibold text-4xl text-basil mt-4">T-Shirt Order</h1>
      <p className="text-ink/70 mt-3">
        Jule and Kathy are handling the family t-shirts. Order directly through the link below —
        everyone picks their own size and pays the company directly.
      </p>

      {isConfigured ? (
        <div className="paper-card rounded-2xl p-8 mt-8 text-center">
          <div className="text-5xl mb-4">👕</div>
          <a
            href={TSHIRT_ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-basil text-parchment font-bold px-8 py-3.5 rounded-full hover:bg-basilDark transition"
          >
            Order Your T-Shirt →
          </a>
          <p className="text-ink/60 text-sm mt-4">
            This link takes you to the t-shirt company's own ordering site.
          </p>
        </div>
      ) : (
        <div className="paper-card rounded-2xl p-8 mt-8 text-center">
          <div className="text-5xl mb-4">👕</div>
          <p className="text-ink/60">
            The order link isn't up yet — Jule and Kathy are finalizing the design and vendor.
            Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
