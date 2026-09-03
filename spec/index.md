# Spec: Demo Selenium JavaScript for Google Maps

## Summary

This repo is a beginner-friendly walkthrough of Selenium WebDriver browser
automation in JavaScript. `src/demo.js` is written as real, correct
`selenium-webdriver` code targeting the well-known, publicly documented
markup of <https://www.google.com/maps> and its documented URL encoding of
map view state, and demonstrates three real, assertion-based checks.
Because Google's Terms of Service restrict automated querying of Google
Maps, this code is not run against the live site by this repo's own
tooling, and must never be run automatically.

## Scope

This spec covers only the three test scenarios implemented in
`src/demo.js`. It does not cover unrelated Google Maps features, other
browsers, or other Google products.

## Principles and rules

* All three checks are written as real assertions, matching the shape they
  would take if run against the live, real google.com/maps — there is no
  mocking, stubbing, or fixture data standing in for a fake site. What
  makes this repo different from demo-selenium-javascript-for-nhs-wales is
  not the code's realism, but that this code must never actually be
  executed against the live site automatically (see AGENTS.md).
* The demo uses the `selenium-webdriver` package's Chrome driver directly
  (via `Builder().forBrowser(Browser.CHROME)`), not a wrapper or test
  framework.
* Google Maps renders most of the map itself to a `<canvas>` element, so
  there is no DOM to inspect for roads, labels, or the current zoom level.
  Assertions about map view state read the `@lat,lng,zoomz` segment
  Google Maps embeds in the URL instead of querying rendered pixels or
  canvas content.
* Expected strings and selectors must be matched exactly as written below
  and in the source.
* If the code (`src/demo.js`) and this file ever disagree, that is a defect
  in one of them; fix it before doing anything else.

## Detail

1. **Maps page title check**
   * Navigate to: `https://www.google.com/maps`
   * Get the page title.
   * Assert the title contains the substring: `Google Maps`

2. **Search box check**
   * Find the search box via `By.css('[aria-label="Search Google Maps"]')`.
   * This is a stable accessible-name selector: it targets the element's
     `aria-label`, which is part of the page's accessibility contract, and
     is far less likely to change than a generated/minified CSS class
     name.
   * Send keys: `Cardiff Castle` followed by `Key.RETURN`.
   * Get the resulting URL.
   * Assert the URL contains the substring: `Cardiff`

3. **Zoom-in check**
   * Google Maps encodes the current view in the URL as a path segment
     shaped like `@<lat>,<lng>,<zoom>z`, for example:
     `https://www.google.com/maps/@51.4816,-3.1791,15z`. Extract the
     zoom number from that segment (regex:
     `/@-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?,(\d+(?:\.\d+)?)z/`) before and
     after the click below, and call these `zoomBefore` and `zoomAfter`.
   * Find the zoom-in button via `By.css('[aria-label="Zoom in"]')` and
     click it.
   * Get the resulting URL and extract `zoomAfter` the same way.
   * Assert `zoomAfter` is greater than `zoomBefore`.

## Acceptance criteria

* `src/demo.js` is syntactically correct JavaScript and matches this spec
  exactly (selectors, strings, and assertions as written above). This repo
  does not require, and must never attempt, a passing live run against
  google.com/maps as an acceptance criterion — see AGENTS.md for why.

## Related topics

* [../README.md](../README.md)
* [../AGENTS.md](../AGENTS.md)

## Sources

* <https://www.google.com/maps>
* <https://www.google.com/policies/terms/>
* <https://testingexamples.github.io/examples/google-maps/>
