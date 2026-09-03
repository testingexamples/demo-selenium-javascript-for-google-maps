---
name: demo-selenium-javascript-for-google-maps
description: Explains the Selenium WebDriver + JavaScript demo written against Google Maps's well-known accessible markup and URL encoding to check its page title, search box, and zoom-in interaction. Invoke when asked to explain or adapt this demo, or to write a similar real-site Selenium assertion test in JavaScript for a canvas-rendered app. Do not use this skill to run the demo against live google.com/maps — see the non-negotiable caution below.
---

# Demo Selenium JavaScript for Google Maps

## What this demo teaches

This repo shows real-world Selenium assertion-style testing in JavaScript,
written against a widely-known live site's well-known, publicly documented
markup and URL encoding, with no mocking or fixtures:

1. Load `https://www.google.com/maps` and assert the page title contains
   `Google Maps`.
2. Find the search box via
   `By.css('[aria-label="Search Google Maps"]')` (a stable accessible-name
   selector), send keys `Cardiff Castle` followed by `Key.RETURN`, and
   assert the resulting URL contains `Cardiff`.
3. Click the zoom-in button via `By.css('[aria-label="Zoom in"]')` and
   assert the zoom level embedded in the URL's `@lat,lng,zoomz` segment
   increased.

Because Google Maps renders most of the map to a `<canvas>` element, there
is no DOM to query for roads, labels, or zoom level — reading the zoom
number back out of the URL is the honest, reliable way to assert a zoom
happened.

## ⚠️ Caution: do not run this against live google.com/maps automatically

Google's Terms of Service restrict automated querying of Google Maps.
This code is written and reviewed as correct, real `selenium-webdriver`
from first-hand knowledge of Google's markup and URL encoding. It must
never be executed automatically (CI, scheduled jobs, test runners, or any
other tooling). See `README.md` and `AGENTS.md` for the full caution.

## Adapting the pattern to a different canvas-rendered app

1. Pick a real page whose interactive content renders to canvas/WebGL
   rather than plain DOM.
2. Find a way the app encodes view/interaction state somewhere inspectable
   -- a URL query/path segment, a `localStorage` value, or a data
   attribute -- the same way Google Maps encodes `@lat,lng,zoomz` in its
   URL.
3. Locate any surrounding chrome (search boxes, buttons) via stable
   accessible-name selectors (`aria-label`, `role`) rather than generated
   class names.
4. Mirror the three-step structure in `src/demo.js`: navigate, assert
   title; search, assert resulting URL/state; interact, assert the
   encoded state changed as expected.
5. Update `spec/index.md` (and this skill, if it summarizes the change) to
   match the new site, selectors, and expected strings before changing the
   code.
6. If the target site's Terms of Service allow it, and only then, consider
   whether the resulting demo may be run automatically — this repo's own
   answer for Google Maps is no.

---

This skill summarizes the repo. `AGENTS.md` and `spec/index.md` are the
source of truth — if this skill's summary ever disagrees with those, they
win.
