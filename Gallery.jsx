import React, { useState } from 'react';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import Accommodations from './pages/Accommodations.jsx';
import DinnerRSVP from './pages/DinnerRSVP.jsx';
import TShirtOrder from './pages/TShirtOrder.jsx';
import Gallery from './pages/Gallery.jsx';
import Recipes from './pages/Recipes.jsx';

export default function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="min-h-screen font-body text-ink">
      <NavBar page={page} setPage={setPage} />
      <main>
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'accommodations' && <Accommodations />}
        {page === 'dinner' && <DinnerRSVP />}
        {page === 'tshirts' && <TShirtOrder />}
        {page === 'gallery' && <Gallery />}
        {page === 'recipes' && <Recipes />}
      </main>
      <footer className="border-t-2 border-ink/10 py-8 text-center text-sm text-ink/60 font-body">
        Con affetto, la famiglia Palazzari &middot; York Beach, Maine &middot; Summer 2026
      </footer>
    </div>
  );
}
