# Lessons for lean kitchen mockups (reusable: copy this file into every new folder)

## This is a QUICK MOCKUP (lean mode)
Goal: a convincing first draft to show the client, built fast and cheap.
Photos and reviews are added only after the client says yes.

Research budget (built-in browser, Google Maps listing):
- Read the Overview panel once with get_page_text / a single JS innerText read.
- Take only: exact name (and Marathi/Hindi name if shown), category, phone, address,
  plus code, coordinates (from the URL), hours, rating + review count, website.
- Do NOT open the Reviews tab, do NOT expand reviews, do NOT read review text.
- Photos: open the photo viewer once and take AT MOST ONE owner-uploaded photo
  (credit link "View <business name>'s profile"). If the first few aren't owner
  uploads, or it takes more than a couple of tries, skip photos entirely.
- No contact sheets, no colour sampling scripts, no reference-site verification trips.
  Name three reference sites you already know.

## Placeholders instead of photos and reviews
- Every photo slot becomes a labelled placeholder: a flat block in a palette colour with
  explicit width/height (or aspect-ratio) so nothing shifts, a short label such as
  "Photo to come: finished kitchen", and role="img" + aria-label saying the same.
  Mark each one in the HTML with <!-- PHOTO: … --> so they are easy to find later.
- Reviews: NO invented or "sample" reviews (CLAUDE.md bans invented testimonials).
  Show the real rating + count if the listing shows it, a link to read them on Google,
  and one labelled placeholder slot: "Client review goes here after approval".
  Mark it <!-- REVIEW: … -->.
- No invented names, metrics, years in business, brands or prices. Put them in the
  gaps list.
- If the one owner photo exists: use it as the hero photo (desktop) and in the first
  "What we make" row (phones). Export .webp, 900x1125, explicit width/height,
  crop out phone watermarks and people.

## Keep exactly as is (proven on a real phone)
- Header: `.top{position:sticky}`. Do NOT switch it to position:fixed.
- Call bar: position:fixed bottom + the visualViewport script that keeps it on the
  visible bottom edge. Do NOT remove that script.
- Do NOT add ScrollTrigger.config({ignoreMobileResize:true}).
These were "improved" once on Mangesh and broke on a real phone; reverting to the Bhumi
code fixed it. Browser-pane tests passed both times, so only a real phone shows this.
- Changing only the colour variables inside the header/bar CSS is fine.

## Keep (already in index.html)
- The 3D build stays a KITCHEN (L-shape, five steps), whatever the business sells most.
- Finish picker with four finishes. With no photos to sample, pick four plausible
  laminate finishes that suit the new palette and label them in DIRECTION.md as
  "assumed, confirm with client".
- Quote form, mobile call bar, section labels ("Call · Site visit", "Making", "Fitting",
  "Handover", "Find us"), and the progress rail that fills from the same ScrollTrigger
  progress value as the build. No durations in the labels.
- Flat colour blocks per section. No colour fades.

## Facts
- Thin or missing facts are fine: "Hours not listed yet. Please call before visiting."
- Don't put the Google rating into schema aggregateRating. No openingHours if none listed.
- If the listing name and the Devanagari name disagree, or the name looks like keywords,
  put "which name to use" in the gaps list.

## Layout fixes already learned
- A hero photo/placeholder pushes the quote form a full screen down on phones: hide it
  under 900px and show it further down the page instead.
- Focus outline must stay visible on dark sections too.
- 3D marble veins stay faint (alpha ≤ .4) or they look like cracks.
- At 320px the brand name must not wrap; shrink it.
- h1: use text-wrap:balance so no single word sits alone on a line.
- Short screens while the build section is held on screen during scroll:
  desktop ≤880px tall → hide the build sub-line;
  phone ≤700px tall → hide the build section label and set the build h2 to 22px.

## Must look different from earlier sites
- Bhumi: Fraunces + Instrument Sans; cream #F4EEE2, teal #123F3A, saffron #B5461B;
  plywood-edge motif; headline "Kitchens built to your walls, not a catalogue."
- Mangesh: Bricolage Grotesque + Figtree; marble #F1F0EC, taupe #4E443E, petrol #1D5870,
  amber #F3C975; LED-strip motif; headline "Bare walls in. A finished home out."
- Harsiddhi: Young Serif + Hanken Grotesk (+ Tiro Devanagari Hindi); chalk #EDF0EA,
  sage #CFDAD2, walnut #2B1D16, rose #8C3A45, navy #233041; chevron-seam motif;
  headline "Measured once. Fitted room by room."
- PLUS every other site in the parent folder (../*/index.html, e.g. kitchen-interio,
  furnish-your-dream): read each one's Google Fonts link, :root colours and h1 with one
  grep, and differ from all of them. Also the site this folder was copied from.

New site needs its own display + body fonts, five new hex values, its own static motif
and its own headline.

## Previous client's details (search for these before saying done)
Before editing, read the copied index.html and note the previous client's name,
Devanagari name, phone (all formats), area, PIN code and reviewer names.
Search for every one of them at the end; none may remain in index.html or apps-script.gs.

## Checks before saying done (keep them short)
1. 1366×800, 375×812 and 320×640: one pass each, scroll top to bottom.
2. Tab through once; read the console.
3. Submit the form in preview mode (empty once, then filled).
4. No sideways scroll at any width.
5. At the end of the held build section, step 05 and its text sit above the call bar.
6. Leftover search (list above).
7. Then test on a real phone over Wi-Fi.
