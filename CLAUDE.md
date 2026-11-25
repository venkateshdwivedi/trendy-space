# House rules — web builds

## Before writing any UI code

Do not write code until these four exist, written into the project as DIRECTION.md:

1. Three real reference URLs, with one clause each on the single thing being borrowed.
2. One sentence on what this site feels like, using no adjective that could describe
   another company. "Premium", "modern", "clean", "sleek" are banned here.
3. A named display typeface, a named body typeface, and five hex values.
4. One signature move — the thing a visitor would describe to someone else.

If the brief is too thin to fill this in, stop and ask. Do not start anyway.

## Hard bans

- Display typeface: never Inter, Roboto, Arial, Helvetica, Open Sans, Montserrat,
  Poppins, Playfair Display, or a bare system-ui stack.
- No purple-to-blue or purple-to-pink gradients. No #6366f1 / #8b5cf6 / #a855f7
  as accent colours.
- No three-column grid of equal rounded cards with icon-title-paragraph.
- No centred hero with eyebrow label, two-line headline, muted subhead, twin buttons.
- No fade-and-slide-up on every section. No hover-lift on every card. Never apply one
  uniform transition to every element.
- No lorem ipsum, no invented testimonials, no fabricated metrics, no invented logos
  of real companies. Leave a labelled gap and ask.

## Motion

One animated moment per page. Everything else stays still.

Specify it as a mechanism, not an adjective. "Smooth subtle transitions" is not a
brief. "The route line draws along the scroll while the steps advance, nothing else
moves" is a brief.

Animate transform and opacity only. Respect prefers-reduced-motion.

## Never negotiable

- Body text renders in the initial HTML. Never hide copy behind a scroll animation.
- Keyboard reachable, visible focus states, headings in order, alt text written.
- Contrast meets WCAG AA.
- Images have explicit dimensions. No layout shift.
- Works at 320px wide.

## Build one page first

Never generate a multi-page site in one pass. Build the homepage alone, open it in a
browser, and revise it at least three times before applying the system to other pages.

## Do not claim it is done

Open it in a browser, check mobile and desktop widths, scroll the whole page, tab
through it, read the console. Report what you actually saw.
