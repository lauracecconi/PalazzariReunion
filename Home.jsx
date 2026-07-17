import React from 'react';

// Fill in once you create the shared Drive folder (see setup notes below).
const DRIVE_FOLDER_ID = 'PASTE_DRIVE_FOLDER_ID_HERE';
const isConfigured = !DRIVE_FOLDER_ID.startsWith('PASTE');

export default function Gallery() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-14">
      <span className="postmark text-limoncello">Say Cheese</span>
      <h1 className="font-display italic font-semibold text-4xl text-tomato mt-4">Photo Gallery</h1>
      <p className="text-ink/70 mt-3 max-w-2xl">
        Drop your favorite reunion photos here, and everyone in the family can see them show up in the same place.
      </p>

      {isConfigured ? (
        <>
          <a
            href={`https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-tomato text-parchment font-bold px-6 py-3 rounded-full hover:bg-tomatoDark transition"
          >
            📤 Add Your Photos
          </a>
          <div className="paper-card rounded-2xl overflow-hidden mt-8">
            <iframe
              title="Family photo gallery"
              className="w-full h-[600px] border-0"
              src={`https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDER_ID}#grid`}
            />
          </div>
        </>
      ) : (
        <div className="paper-card rounded-2xl p-8 mt-8 text-center">
          <p className="text-ink/60">
            The shared photo folder hasn't been set up yet — see the setup notes to create one.
          </p>
        </div>
      )}
    </div>
  );
}
