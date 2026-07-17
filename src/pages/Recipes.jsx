import React, { useState } from 'react';

const RECIPES = [
  {
    name: "Nonna's Sunday Gravy",
    tag: 'The Classic',
    ingredients: [
      '2 lbs pork ribs or braciole',
      '1 lb Italian sausage',
      '2 cans (28 oz) crushed tomatoes',
      '1 onion, diced',
      '4 cloves garlic, minced',
      'Fresh basil, torn',
      'Parmesan rind (optional, but don\'t skip it)',
    ],
    steps: [
      'Brown the meats in olive oil, then set aside.',
      'Sauté onion and garlic in the same pot until soft.',
      'Add crushed tomatoes, Parmesan rind, and browned meat back in.',
      'Simmer low and slow, at least 3 hours, stirring occasionally.',
      'Finish with fresh basil. Serve over pasta with plenty of extra sauce.',
    ],
  },
  {
    name: 'Arancini',
    tag: 'The Crowd-Pleaser',
    ingredients: [
      '2 cups cooked, cooled risotto',
      '2 eggs, beaten',
      'Mozzarella, cut into small cubes',
      '1 cup breadcrumbs',
      'Oil for frying',
    ],
    steps: [
      'Scoop a small handful of risotto and flatten in your palm.',
      'Press a mozzarella cube into the center and roll into a ball.',
      'Dip in egg, then coat in breadcrumbs.',
      'Fry until golden brown, about 3-4 minutes per batch.',
      'Drain on paper towels and serve hot.',
    ],
  },
  {
    name: 'Tiramisu',
    tag: 'The Finale',
    ingredients: [
      '6 egg yolks',
      '3/4 cup sugar',
      '16 oz mascarpone',
      '1 1/2 cups strong espresso, cooled',
      '2 packages ladyfingers',
      'Cocoa powder for dusting',
    ],
    steps: [
      'Whisk egg yolks and sugar until pale, then fold in mascarpone.',
      'Dip ladyfingers briefly in espresso — don\'t soak them.',
      'Layer dipped ladyfingers and mascarpone mixture in a dish.',
      'Repeat for a second layer, then chill at least 4 hours (overnight is better).',
      'Dust with cocoa powder just before serving.',
    ],
  },
];

function RecipeCard({ recipe }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="paper-card rounded-2xl p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wide text-limoncello">{recipe.tag}</span>
          <h3 className="font-display font-semibold text-xl text-ink mt-1">{recipe.name}</h3>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="shrink-0 text-sm font-bold text-tomato border-2 border-tomato/30 rounded-full px-4 py-1.5 hover:bg-tomato hover:text-parchment transition"
        >
          {open ? 'Hide' : 'View Recipe'}
        </button>
      </div>

      {open && (
        <div className="grid sm:grid-cols-2 gap-6 mt-5 pt-5 border-t border-ink/10">
          <div>
            <p className="font-bold text-sm text-basil mb-2">Ingredients</p>
            <ul className="space-y-1 text-sm text-ink/80">
              {recipe.ingredients.map((ing) => (
                <li key={ing}>• {ing}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold text-sm text-basil mb-2">Steps</p>
            <ol className="space-y-1.5 text-sm text-ink/80 list-decimal list-inside">
              {recipe.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Recipes() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-14">
      <span className="postmark text-basil">From the Kitchen</span>
      <h1 className="font-display italic font-semibold text-4xl text-tomato mt-4">Family Recipes</h1>
      <p className="text-ink/70 mt-3 max-w-2xl">
        A few of the classics to start us off. Send me your favorites and we'll add them to the collection.
      </p>

      <div className="space-y-4 mt-8">
        {RECIPES.map((recipe) => (
          <RecipeCard key={recipe.name} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
