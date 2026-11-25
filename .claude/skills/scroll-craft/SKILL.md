---
description: "Scroll-driven animations and motion design using GSAP ScrollTrigger, CSS scroll-driven animations, and Lenis smooth scroll. Use when building any scroll-based animation, parallax, pinning, scrubbing, reveal, or smooth scroll effect."
---

# Scroll Craft — Animation Implementation

## When this skill activates

Any time the task involves: scroll animation, parallax, pin a section, scrub animation,
reveal on scroll, smooth scrolling, scroll-driven motion, GSAP, ScrollTrigger, Lenis.

## Stack choices

Pick the lightest option that does the job:

### 1. CSS-only (first choice when possible)
```css
/* Reveal on scroll — no JS needed */
@supports (animation-timeline: scroll()) {
  .reveal {
    animation: reveal linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 100%;
  }
  @keyframes reveal {
    from { opacity: 0; transform: translateY(2rem); }
    to   { opacity: 1; transform: translateY(0); }
  }
}
```
Use for: simple fade-in reveals, progress bars, parallax backgrounds.
Browser support: Chrome 115+, Edge 115+. Add a no-animation fallback for Safari/Firefox.

### 2. GSAP + ScrollTrigger (when you need pinning, scrubbing, or complex timelines)

Install:
```bash
npm install gsap
```

Basic scroll-triggered animation:
```js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.to(".hero-image", {
  y: -100,
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top center",
    end: "bottom center",
    scrub: true,       // ties animation to scroll position
  }
});
```

Pin a section while content animates:
```js
gsap.timeline({
  scrollTrigger: {
    trigger: ".pinned-section",
    start: "top top",
    end: "+=200%",      // pin for 2x the section height
    pin: true,
    scrub: 1,           // 1 second smoothing
  }
})
.to(".step-1", { opacity: 1, y: 0 })
.to(".step-1", { opacity: 0 }, "+=0.5")
.to(".step-2", { opacity: 1, y: 0 })
.to(".step-2", { opacity: 0 }, "+=0.5")
.to(".step-3", { opacity: 1, y: 0 });
```

### 3. Lenis (smooth scroll only — not animation)

Install:
```bash
npm install lenis
```

```js
import Lenis from "lenis";

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

Connect Lenis to GSAP ScrollTrigger:
```js
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

## Framework-specific setup

### Plain HTML / Astro
Load GSAP and ScrollTrigger in a `<script>` tag or an Astro island.
No cleanup needed — page navigations are full reloads.

### React / Next.js
Register ScrollTrigger once. Kill instances on unmount to prevent leaks:
```jsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".animated-element", {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });
    }, sectionRef);

    // CRITICAL: kill on unmount to prevent memory leaks on route change
    return () => ctx.revert();
  }, []);

  return <section ref={sectionRef}>...</section>;
}
```

### Svelte
```svelte
<script>
  import { onMount, onDestroy } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);
  let section;
  let ctx;

  onMount(() => {
    ctx = gsap.context(() => {
      gsap.to(".target", {
        scrollTrigger: { trigger: section, start: "top center", scrub: true },
        y: -50,
      });
    }, section);
  });

  onDestroy(() => ctx?.revert());
</script>

<section bind:this={section}>...</section>
```

## Rules — always follow

1. **Only animate `transform` and `opacity`.** Never animate width, height, top, left,
   margin, padding, border-radius, or box-shadow on scroll — they cause layout recalc.

2. **Respect reduced motion:**
   ```js
   const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
   if (prefersReduced) {
     // Skip scroll animations, show content immediately
     gsap.set(".animated-element", { opacity: 1, y: 0 });
   }
   ```

3. **One orchestrated moment per page.** Do not animate every section on scroll.
   Pick the single interaction that tells the story — a timeline scrub, a pinned
   sequence, a route that draws — and leave everything else still.

4. **Never hide readable text behind scroll progress.** Body copy must be visible
   in the initial render. Animation can enhance how someone arrives at it, but
   the content must be there if ScrollTrigger fails to load.

5. **Always set explicit `start` and `end`.** Never rely on ScrollTrigger defaults.

6. **Test at 320px width.** Pin heights and scrub distances often break on small screens.
   Use `ScrollTrigger.matchMedia` to adjust or disable on mobile:
   ```js
   ScrollTrigger.matchMedia({
     "(min-width: 768px)": function () {
       // desktop animations here
     },
     "(max-width: 767px)": function () {
       // simpler or no animations for mobile
     },
   });
   ```

7. **Kill scroll triggers on route changes** in SPA frameworks (React, Next, Svelte,
   Vue). A leaked ScrollTrigger listening to a removed DOM node causes jank and
   memory bloat. Use `gsap.context()` and call `.revert()` on cleanup.

8. **`scrub: true` vs `scrub: <number>`:** `true` = instant (follows scroll exactly).
   A number like `scrub: 1` adds smoothing (1 second lag). Use `true` for progress
   indicators and line-draws. Use `0.5`–`1` for content reveals so they feel weighted.

## Common patterns

### Draw an SVG path on scroll
```js
const path = document.querySelector(".draw-path");
const length = path.getTotalLength();

gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

gsap.to(path, {
  strokeDashoffset: 0,
  scrollTrigger: {
    trigger: ".draw-section",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
});
```

### Horizontal scroll section
```js
const container = document.querySelector(".horizontal-container");
const panels = gsap.utils.toArray(".horizontal-container .panel");

gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: container,
    pin: true,
    scrub: 1,
    end: () => "+=" + container.offsetWidth,
  },
});
```

### Parallax image
```js
gsap.to(".parallax-img", {
  yPercent: -20,
  scrollTrigger: {
    trigger: ".parallax-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});
```
