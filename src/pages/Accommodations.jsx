import React from 'react';

const NEARBY = [
  { name: 'Ogunquit Beach', time: '14 min', dir: 'north', lat: 43.2468352, lng: -70.5986223 },
  { name: 'Kennebunkport (cute downtown, Bush family home)', time: '30 min', dir: 'north', lat: 43.3617264, lng: -70.4767957 },
  { name: 'Freeport, ME (L.L. Bean)', time: '1 hr', dir: 'north', lat: 43.8580446, lng: -70.1042337 },
  { name: 'Yummies Candy & Nuts, Kittery', time: '15 min', dir: 'south', lat: 43.1177706, lng: -70.7247251 },
  { name: 'Portsmouth, NH', time: '20 min', dir: 'south', lat: 43.0702046, lng: -70.7546771 },
  { name: 'Hampton Beach, NH', time: '30 min', dir: 'south', lat: 42.9113098, lng: -70.8134818 },
  { name: 'Boston, MA', time: '75 min', dir: 'south', lat: 42.3555076, lng: -71.0565364 },
];

const KEY_SPOTS = [
  { name: 'The Ocean Sands (home base)', lat: 43.15749, lng: -70.6232112 },
  { name: 'Long Sands Beach', lat: 43.1641099, lng: -70.6185605 },
  { name: 'Short Sands Beach', lat: 43.1742547, lng: -70.6075523 },
];

function mapsLink(lat, lng) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export default function Accommodations() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-14">
      <span className="postmark text-azzurro">Where to Stay</span>
      <h1 className="font-display italic font-semibold text-4xl sm:text-5xl text-tomato mt-4">
        Accommodations
      </h1>
      <p className="text-ink/70 mt-3 max-w-2xl">
        Everyone books their own hotel, cottage, or condo — here's what we've scouted so far.
      </p>

      {/* Booking instructions banner */}
      <div className="paper-card rounded-2xl p-6 mt-8 border-l-4 border-tomato">
        <p className="font-display font-semibold text-lg text-tomato">Book by phone, not online</p>
        <p className="text-ink/80 mt-2">
          When it's time to reserve, please call the hotel directly rather than booking online. Once dates are
          settled, Jule and I will call The Ocean Sands first and let them know we're the <strong>Palazzari Reunion</strong>.
          When you call, mention the same thing — they'll know to group our rooms together as much as they can.
        </p>
      </div>

      {/* Option 1: Ocean Sands */}
      <div className="mt-10">
        <span className="postmark text-basil">Option 1</span>
        <h2 className="font-display font-semibold text-2xl mt-3">The Ocean Sands</h2>
        <p className="text-ink/60 text-sm mt-1">Long Sands Beach, York Beach, ME · (207) 351-8064 · 277 Long Beach Avenue</p>

        <div className="grid md:grid-cols-2 gap-4 mt-5">
          <div className="paper-card rounded-2xl p-5">
            <p className="font-display font-semibold text-basil mb-2">Pros</p>
            <ul className="space-y-1.5 text-ink/80 text-sm">
              <li>Brand new rooms, just renovated</li>
              <li>Hotel rooms, suites, and cottages — some with full kitchens or kitchenettes</li>
              <li>Food truck on-site, open 11am–7pm</li>
              <li>Picnic tables and open space to hang out</li>
              <li>Pool</li>
            </ul>
          </div>
          <div className="paper-card rounded-2xl p-5">
            <p className="font-display font-semibold text-tomato mb-2">Cons</p>
            <ul className="space-y-1.5 text-ink/80 text-sm">
              <li>Pebble beach at high tide (sandy when tide is out)</li>
              <li>A bit farther from the center of York Beach</li>
              <li>Beach pricing — it isn't cheap</li>
            </ul>
          </div>
        </div>

        <div className="paper-card rounded-2xl p-5 mt-4">
          <p className="text-ink/80">
            Rooms run roughly <strong>$364</strong> (one bed) up to <strong>$644</strong> (multi-bedroom cottage),
            depending on dates and room type. We're waiting to hear if a group discount is possible given the number
            of rooms we'd be booking. <strong>Check the website for exact rooms and current pricing</strong> —
            it changes by season and room type.
          </p>
          <a
            href="https://www.oceansandsyorkbeach.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-azzurro text-parchment font-bold px-5 py-2.5 rounded-full text-sm hover:opacity-90 transition"
          >
            View Rooms &amp; Rates →
          </a>
        </div>
      </div>

      {/* Option 2 */}
      <div className="mt-10">
        <span className="postmark text-limoncello">Option 2</span>
        <h2 className="font-display font-semibold text-2xl mt-3">Do Your Own Thing</h2>
        <p className="text-ink/80 mt-2 max-w-2xl">
          Feel free to research and book whatever fits your family best. We're based on <strong>Long Sands Beach</strong>,
          but <strong>Short Sands Beach</strong> is close by too and sits closer to the shops, arcade, and downtown action —
          worth a look if you'd rather be in the middle of things.
        </p>
      </div>

      {/* Map */}
      <div className="mt-12">
        <span className="postmark text-azzurro">Find It on the Map</span>
        <div className="paper-card rounded-2xl overflow-hidden mt-5">
          <iframe
            title="Ocean Sands area map"
            className="w-full h-96 border-0"
            loading="lazy"
            src={`https://www.google.com/maps?q=${KEY_SPOTS[0].lat},${KEY_SPOTS[0].lng}&z=13&output=embed`}
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mt-4">
          {KEY_SPOTS.map((spot) => (
            <a
              key={spot.name}
              href={mapsLink(spot.lat, spot.lng)}
              target="_blank"
              rel="noopener noreferrer"
              className="paper-card rounded-xl p-4 text-sm font-bold text-ink hover:bg-tomato hover:text-parchment transition"
            >
              📍 {spot.name}
            </a>
          ))}
        </div>
      </div>

      {/* Day trips */}
      <div className="mt-12 pb-6">
        <span className="postmark text-basil">Day Trips &amp; Things to Do</span>
        <p className="text-ink/60 text-sm mt-3">Distances are from The Ocean Sands.</p>
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          {NEARBY.map((spot) => (
            <a
              key={spot.name}
              href={mapsLink(spot.lat, spot.lng)}
              target="_blank"
              rel="noopener noreferrer"
              className="paper-card rounded-xl p-4 flex items-center justify-between hover:bg-ink/5 transition"
            >
              <span className="font-body font-bold text-sm">{spot.name}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${spot.dir === 'north' ? 'bg-azzurro/15 text-azzurro' : 'bg-limoncello/25 text-ink'}`}>
                {spot.time} {spot.dir === 'north' ? '↑' : '↓'}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
