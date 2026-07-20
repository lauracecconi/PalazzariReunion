import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

// Fill these in once you set up the "Submit a Recipe" Google Form (see setup notes).
const RECIPE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeC2K6S9nRS5cdJkcRVSUyKwT6Xs6KezoQG5gm85si_yJPkHw/viewform?usp=publish-editor';
const RECIPE_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRgNvMJeiq-7VS6I6R84p3_lJWLKgxNtL9NkqvdUjcdQohPHCxkQj75B5dFNYZ7QI9vLYOxOyW08q3o/pub?output=csv';
const formConfigured = !RECIPE_FORM_URL.startsWith('PASTE');
const csvConfigured = !RECIPE_CSV_URL.startsWith('PASTE');

// The starting family recipe - grouped ingredients/steps since this one has
// a few distinct stages (meat prep, dough, assembly).
const CURATED_RECIPES = [
  {
    name: 'Palazzari Cappelletti and Meat Ravioli',
    tag: 'The Family Classic',
    submittedBy: null,
    notes: 'Makes approximately 1,000 caps and 15-20 dozen ravs. Last batch (Dec 2020) yielded 18 dozen ravs and 500 caps with this recipe.',
    ingredientGroups: [
      {
        heading: 'Meat',
        items: [
          '2.5 lbs chuck or London broil (bottom round)',
          '2.5 lbs pork, boneless',
          '2.5 lbs chicken breast, cleaned (add any extra turkey laying around)',
          '1/2 tsp lemon pepper seasoning',
          '1/4 tsp all-purpose dill',
          'Salt and pepper',
          '2-3 onions',
          '1/4 cup water',
          '4-5 cloves garlic',
          '1/2 sleeve saltines or 1-2 slices bread',
          '4 boxes chopped spinach, frozen',
          '5 jumbo eggs or 8 large',
          '1 cup Locatelli cheese, grated',
          '1 shake nutmeg',
          '1 dash cinnamon',
          '1 cup Italian-style breadcrumbs',
        ],
      },
      {
        heading: 'Dough',
        items: [
          '10 jumbo eggs or 12 large',
          'Salt',
          '1 cup water',
          '5 lb bag flour',
          'Canola oil',
        ],
      },
      {
        heading: 'Equipment',
        items: [
          'Tea cloth',
          'Pasta machine',
          'Large metal mixing bowl and whisk',
          'Lots of cookie sheets',
          'Lots of gallon and quart-sized baggies',
        ],
      },
    ],
    stepGroups: [
      {
        heading: 'Meat Prep (Night Before)',
        items: [
          'Season the chuck and pork with lemon pepper, dill, salt/pepper, halved onions, water, and garlic.',
          'Clean chicken, cutting off most of the fat, and cut into 1-2 inch chunks. Add on top of the chuck and pork, with extra lemon pepper on top.',
          'Place everything in a pan with oil at the bottom and stir.',
          'Leave in the pan overnight.',
        ],
      },
      {
        heading: 'Meat Prep - Day 1',
        items: [
          'Cook covered in the oven at 345°F for about 4 hours. Pull the chicken out when done (usually 1-1.5 hours) - check hourly.',
          'Strain off the drippings into a pot and freeze for 1 hour to separate the fat, then skim the fat off the top. Save the rest as stock.',
          'Once cooked, pull the meat apart into tiny pieces, removing any fat. Keep it in the original pan - do not wash the pan.',
          'Crumble in 1/2 sleeve of saltines or 1-2 slices of bread.',
          'Video Instructions:  https://drive.google.com/file/d/1ec9FrQnQcSHlWFkyALGV6iKJbBbx_4Qi/view?usp=sharing',
        ],
      },
      {
        heading: 'Filling',
        items: [
          'Cook and drain the chopped spinach, then squeeze out all the water using a tea cloth. Set aside.',
          'In separate bowls, set aside the eggs, and the Locatelli cheese mixed with nutmeg and cinnamon.',
          'Grind all the meat into the original (unwashed) pan.',
          'Skim any remaining fat from the drippings, then pour the eggs over the meat and mix (use hands if needed).',
          'Warm the drippings and pour over the meat; mix in stock gradually until well blended.',
          'Add the cheese mixture and mix, adding stock until the consistency is rollable into balls. Taste and adjust seasoning.',
          'Divide the meat mixture into two bowls - a larger one for ravioli and a smaller one for cappelletti.',
          'For the ravioli bowl only: mix in the spinach and breadcrumbs, then cover and refrigerate.',
          'Video Instruction:  https://drive.google.com/file/d/1WDoyKgOGIXa5AHrc5MxpQWXsVskwBQf7/view?usp=sharing',
        ],
      },
      {
        heading: 'Pasta (Day 2, or end of Day 1)',
        items: [
          'Roll the filling into balls - smaller for caps, teaspoon-measured for ravs. If they\'re too big, the dough will tear.',
          'Beat the eggs with a sprinkle of salt and 1 cup water in a large bowl.',
          'Add flour gradually (4-5 cups to start), mixing well, until the dough forms one solid, not-too-sticky mass - up to about 3/4 of the bag.',
          'Turn out onto a board and knead, adding flour as needed and oiling your hands, until it reaches a play-dough consistency.',
          'Cut into 4 sections and knead each into a smooth ball, like pizza dough.',
          'Cover in an oiled bowl with a towel. Refrigerate overnight if not using the same day.',
          'Roll each section into an oval with a rolling pin, then run through the pasta machine starting at the widest setting, moving in two notches at a time.',
          'Video Instruction:  https://drive.google.com/file/d/1i7f1JnHvCVfnriSCpkTxeq_OEz6PEGwe/view?usp=sharing',
        ],
      },
      {
        heading: 'Assembling the Ravioli',
        items: [
          'Lay pasta on the rav tray and brush with flour. Add a meatball, fold the dough over, and press the ball down firmly - really push out all the air, it won\'t tear the dough.',
          'Cut off the excess dough, roll with a rolling pin, and push out the ravs. Cut apart if needed.',
          'Freeze on a tray, then bag.',
        ],
      },
      {
        heading: 'Assembling the Cappelletti',
        items: [
          'Lay dough on the counter or board and place filling balls along one edge.',
          'Roll the dough over the balls and press together, leaving a finger\'s space between each one before fully closing.',
          'Use the stamper to close each one, dipping it in flour between uses to help it seal.',
          'Push out each cap and set on a cookie sheet to freeze.',
        ],
      },
    ],
  },
];

function IngredientSteps({ recipe }) {
  if (recipe.ingredientGroups) {
    return (
      <div className="grid sm:grid-cols-2 gap-6 mt-5 pt-5 border-t border-ink/10">
        <div>
          {recipe.ingredientGroups.map((group) => (
            <div key={group.heading} className="mb-4 last:mb-0">
              <p className="font-bold text-sm text-basil mb-2">{group.heading}</p>
              <ul className="space-y-1 text-sm text-ink/80">
                {group.items.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div>
          {recipe.stepGroups.map((group) => (
            <div key={group.heading} className="mb-4 last:mb-0">
              <p className="font-bold text-sm text-basil mb-2">{group.heading}</p>
              <ol className="space-y-1.5 text-sm text-ink/80 list-decimal list-inside">
                {group.items.map((item, i) => <li key={i}>{item}</li>)}
              </ol>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Simple submitted recipe - raw text blocks
  return (
    <div className="grid sm:grid-cols-2 gap-6 mt-5 pt-5 border-t border-ink/10">
      <div>
        <p className="font-bold text-sm text-basil mb-2">Ingredients</p>
        <p className="text-sm text-ink/80 whitespace-pre-line">{recipe.ingredientsText}</p>
      </div>
      <div>
        <p className="font-bold text-sm text-basil mb-2">Instructions</p>
        <p className="text-sm text-ink/80 whitespace-pre-line">{recipe.stepsText}</p>
      </div>
    </div>
  );
}

function RecipeCard({ recipe }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="paper-card rounded-2xl p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wide text-limoncello">{recipe.tag}</span>
          <h3 className="font-display font-semibold text-xl text-ink mt-1">{recipe.name}</h3>
          {recipe.submittedBy && (
            <p className="text-xs text-ink/50 mt-1">Submitted by {recipe.submittedBy}</p>
          )}
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="shrink-0 text-sm font-bold text-tomato border-2 border-tomato/30 rounded-full px-4 py-1.5 hover:bg-tomato hover:text-parchment transition"
        >
          {open ? 'Hide' : 'View Recipe'}
        </button>
      </div>

      {recipe.notes && (
        <p className="text-xs text-ink/50 italic mt-2">{recipe.notes}</p>
      )}

      {open && <IngredientSteps recipe={recipe} />}
    </div>
  );
}

export default function Recipes() {
  const [submitted, setSubmitted] = useState([]);
  const [loading, setLoading] = useState(csvConfigured);

  useEffect(() => {
    if (!csvConfigured) return;
    fetch(RECIPE_CSV_URL)
      .then((res) => res.text())
      .then((csvText) => {
        const { data } = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        // Expected columns from the Form: Timestamp, Your Name, Recipe Title, Ingredients, Instructions
        const parsed = data.map((row) => ({
          name: row['Recipe Title'] || 'Untitled Recipe',
          tag: 'Family Submission',
          submittedBy: row['Your Name'] || null,
          ingredientsText: row['Ingredients'] || '',
          stepsText: row['Instructions'] || '',
        }));
        setSubmitted(parsed.reverse());
      })
      .catch(() => {
        // If the fetch fails, just show the curated recipes
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-5 py-14">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <span className="postmark text-basil">From the Kitchen</span>
          <h1 className="font-display italic font-semibold text-4xl text-tomato mt-4">Family Recipes</h1>
          <p className="text-ink/70 mt-3 max-w-2xl">
            Starting with a true classic. Got one to add? Submit it below and it'll show up here for everyone.
          </p>
        </div>
        {formConfigured && (
          <a
            href={RECIPE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-basil text-parchment font-bold px-6 py-3 rounded-full hover:bg-basilDark transition whitespace-nowrap"
          >
            + Submit a Recipe
          </a>
        )}
      </div>

      <div className="space-y-4 mt-8">
        {CURATED_RECIPES.map((recipe) => (
          <RecipeCard key={recipe.name} recipe={recipe} />
        ))}

        {loading && (
          <p className="text-center text-ink/40 text-sm py-6">Loading submitted recipes...</p>
        )}

        {!loading && submitted.length > 0 && submitted.map((recipe, i) => (
          <RecipeCard key={`${recipe.name}-${i}`} recipe={recipe} />
        ))}
      </div>

      {!formConfigured && (
        <p className="text-xs text-ink/40 mt-8 text-center">
          (Dev note: recipe submission form isn't set up yet - see setup notes to enable it.)
        </p>
      )}
    </div>
  );
}
