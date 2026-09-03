# Demo Selenium JavaScript for Google Maps

A friendly, step-by-step tutorial that demonstrates:

* [Selenium](https://www.selenium.dev/) browser automation testing
* [JavaScript](https://en.wikipedia.org/wiki/JavaScript) programming language
* [Node](https://nodejs.org/) runtime built on Chrome's V8 JavaScript engine
* [ChromeDriver](https://developer.chrome.com/docs/chromedriver) extends WebDriver by adding Chromium-specific capabilities
* Real-world locator patterns against [Google Maps](https://www.google.com/maps)

This demo is meant to be read top to bottom like a guide: open `src/demo.js`
alongside this README and follow along.

The exact scenario this demo checks is specified in [spec/index.md](spec/index.md); the code and that spec must always agree.

## ⚠️ Caution: Google's Terms of Service restrict automated querying

Google's [Terms of Service](https://www.google.com/policies/terms/) restrict
automated querying of Google Maps. `src/demo.js` in this repo is written
and reviewed as correct, real `selenium-webdriver` code, built from
first-hand knowledge of Google's well-known accessible markup and its
documented URL encoding of map view state -- it is not run against the
live `google.com/maps` by this repo's own tooling, and it is never run in
CI or any automated pipeline. The code exists to teach locator strategies
and interaction patterns, not to be executed repeatedly against the live
service. See `AGENTS.md` and `spec/index.md` for this project's
non-negotiable rule against automated execution.

If you choose to try the script yourself, do so sparingly and manually, at
your own judgment and risk, and review Google's Terms of Service first.

## What this demo tests

The script drives a real browser to Google Maps and checks a few things a
visitor might do:

1. **Visit Google Maps** and verify the page title contains `Google Maps`.
2. **Use the search box**: type `Cardiff Castle`, press Return, and verify
   the resulting URL contains `Cardiff`.
3. **Click the "Zoom in" button** and verify the zoom level embedded in the
   URL (the `@lat,lng,zoomz` segment) increased.

Google Maps renders most of the map itself to a `<canvas>` element, so
there is no DOM to inspect for roads, labels, or the current zoom level.
Reading the zoom level back out of the URL is the honest, reliable way to
assert that a zoom happened -- the same approach the accompanying
[testingexamples.github.io Google Maps page](https://testingexamples.github.io/examples/google-maps/)
documents.

Each step prints what it found, then asserts it matches what we expect, so
you can see the demo succeed (or fail loudly) as it runs.

## Install

### Install Node and NPM

Install Node and NPM from <https://nodejs.org/>

Run this to confirm your version:

```sh
node -v
```

Output should be at least:

```stdout
v23.6.1
```

Run this to confirm your version:

```sh
npm -v
```

Output should be at least:

```stdout
11.2.0
```

### Install Selenium

Install Selenium WebDriver:

```sh
npm install --save selenium-webdriver@latest
```

### Install chromedriver

Install Google chromedriver:

```sh
npm install --save chromedriver@latest
```

### Update

Run:

```sh
npm install npm@latest
npm upgrade
npm audit fix
```

## Run

Run:

```sh
node src/demo.js
```

The script will:

1. Launch your local Chrome web browser and go to <https://www.google.com/maps>.
2. Search for "Cardiff Castle" and click "Zoom in", the same way a real
   visitor would.
3. Print a checklist of ✅ verifications as it confirms each expectation,
   then print "All checks passed. 🎉" when everything succeeds.

Remember the caution above: run this manually and sparingly, not as part of
any automated or repeated process.

### Troubleshooting “chromedriver” Not Opened

If you get this kind of error message:

```txt
“chromedriver” Not Opened. Apple could not verify “chromedriver”
is free of malware that may harm your Mac or compromise your privacy.
```

Or this kind of error message:

```txt
Apple is not able to verify that it is free from malware that could harm your
Mac or compromise your privacy. Don’t open this unless you are certain it is
from a trustworthy source.
```

Then click "Done".

Try this command line solution:

```sh
xattr -d com.apple.quarantine $(which chromedriver) 2>/dev/null
```

Try adjusting your system settings:

* Apple menu -> Settings -> Security & Privacy -> General

* See the entry that says: "chromedriver" was blocked to protect your Mac.

* Click the button "Allow Anyway".

### Troubleshooting "This version of ChromeDriver …"

If you get this kind of error message:

```txt
UnhandledPromiseRejectionWarning:
SessionNotCreatedError: session not created:
This version of ChromeDriver only supports Chrome version …
```

Then you may need to harmonize your Chrome browser app and your Chrome webdriver.

If you use macOS brew, then upgrade chromedriver:

```sh
brew upgrade chromedriver
```

To update your Chrome browser app:

* On your computer, open Chrome.

* Find your current Chrome version by typing in the URL bar: `chrome://version/`.

* You should see a web page with many details, and you should see the first line with the version number, such as: "Google Chrome 135.0.7049.86 (Official Build)".

* At top right, tap the "More" icon, which is 3 vertical dots.

* You see the "More" menu. If you see a menu item "Update", then choose it. If you don't see a menu item "Update", then  you're on the current version.

To update your Chrome webdriver:

* Go to https://chromedriver.chromium.org/downloads

* Download the version that matches your Chrome browser app.

## Tracking

* Package: demo-selenium-javascript-for-google-maps
* Version: 1.0.0
* Created: 2026-09-03T00:00:00Z
* Updated: 2026-09-03T00:00:00Z
* License: GPL-2.0-or-greater or for custom license contact us
* Contact: Joel Parker Henderson (joel@joelparkerhenderson.com)
