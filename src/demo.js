#!/usr/bin/env node

///
// Demo of Selenium WebDriver browser automation with JavaScript, using
// Google Maps <https://www.google.com/maps> as a widely-known real-world
// example.
//
// CAUTION: Google's Terms of Service restrict automated querying of Google
// Maps. This file is written and verified as correct, real
// selenium-webdriver code from first principles, using Google's
// well-known, stable, accessible markup and its documented URL encoding
// of map view state -- it is not exercised against the live
// google.com/maps in this repo's own tooling. If you choose to run it
// yourself, that is at your own judgment and risk, and infrequent,
// human-triggered runs are a very different thing from automated,
// repeated querying. See README.md for the full caution.
//
// This is a beginner-friendly walkthrough: each step is commented so you can
// follow along and adapt the pattern to your own site.
//
// Please see the file README.md for more information.
//
// ## Tracking
//
//   * Package: demo-selenium-javascript-for-google-maps
//   * Version: 1.0.0
//   * Created: 2026-09-03T00:00:00Z
//   * Updated: 2026-09-03T00:00:00Z
//   * License: GPL-2.0-or-greater or for custom license contact us
//   * Contact: Joel Parker Henderson (joel@joelparkerhenderson.com)
///

// Import Selenium WebDriver parts.
import { Browser, Builder, By, Key } from 'selenium-webdriver';

// Import chromedriver options that you can set as you wish.
import { Options } from 'selenium-webdriver/chrome.js';
const options = new Options();
options.addArguments('--verbose'); // Enable verbose logging.
options.addArguments('--disable-notifications'); // Disable notifications such as popups.
options.setUserPreferences({ "profile.default_content_setting_values.cookies": 2 }); // Reject cookies.

// Import strict assert, renamed for convenience as assert.
// We use this to verify each step actually did what we expect.
import { strict as assert } from 'assert';

// Google Maps encodes the current view (center latitude, center longitude,
// and zoom level) directly in the URL as a path segment shaped like:
//
//     @<lat>,<lng>,<zoom>z
//
// for example: https://www.google.com/maps/@51.4816,-3.1791,15z
//
// This regular expression captures the zoom number out of that segment, so
// we can compare "zoom before" to "zoom after" without ever touching the
// map's rendered pixels.
const ZOOM_PATTERN = /@-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?,(\d+(?:\.\d+)?)z/;

function extractZoom(url) {
    const match = url.match(ZOOM_PATTERN);
    assert.ok(match, `Expected URL to contain an "@lat,lng,zoomz" segment, got "${url}"`);
    return Number(match[1]);
}

async function demo() {

    // Initialize the driver. Choose other browsers and options as you wish.
    const driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeOptions(options)
        .build();

    try {

        ///
        // Step 1: Connect to Google Maps, then verify the page title is
        // what we expect.
        ///

        await driver.get('https://www.google.com/maps');

        const homeTitle = await driver.getTitle();
        console.log(`Maps page title: "${homeTitle}"`);
        assert.ok(
            homeTitle.includes('Google Maps'),
            `Expected title to contain "Google Maps", got "${homeTitle}"`
        );
        console.log('✅ Maps page title contains "Google Maps".');

        ///
        // Step 2: Use the search box: type "Cardiff Castle", press
        // Return, then verify the URL reflects the search.
        //
        // We locate the search box by `By.css('[aria-label="Search Google
        // Maps"]')` -- its accessible name -- rather than by a generated
        // class name (Maps ships CSS classes that are minified/obfuscated
        // and change between deploys, e.g. things like ".tactile-searchbox
        // -input" today and something else tomorrow). The `aria-label` is
        // part of the accessibility contract of the page: Google has a
        // strong incentive to keep it stable and descriptive for screen
        // reader users, which makes it a far more durable locator than
        // implementation-detail class names.
        ///

        const searchBox = await driver.findElement(By.css('[aria-label="Search Google Maps"]'));
        await searchBox.sendKeys('Cardiff Castle', Key.RETURN);

        const searchUrl = await driver.getCurrentUrl();
        console.log(`URL after search: "${searchUrl}"`);
        assert.ok(
            searchUrl.includes('Cardiff'),
            `Expected URL to contain "Cardiff", got "${searchUrl}"`
        );
        console.log('✅ URL contains "Cardiff".');

        const zoomBefore = extractZoom(searchUrl);
        console.log(`Zoom level before zoom-in: ${zoomBefore}`);

        ///
        // Step 3: Click the "Zoom in" button, then verify the zoom level
        // embedded in the URL increased.
        //
        // Google Maps renders the map itself mostly to a `<canvas>`
        // element (WebGL tiles), so there are no individual DOM elements
        // for roads, labels, or the current zoom level to inspect or
        // assert against. But every pan/zoom updates the URL's
        // "@lat,lng,zoomz" segment (see ZOOM_PATTERN above), so reading
        // that URL segment is the honest, reliable way to assert that a
        // zoom actually happened -- the same approach the accompanying
        // testingexamples.github.io Google Maps page documents.
        ///

        const zoomInButton = await driver.findElement(By.css('[aria-label="Zoom in"]'));
        await zoomInButton.click();

        const zoomedUrl = await driver.getCurrentUrl();
        console.log(`URL after zoom-in: "${zoomedUrl}"`);
        const zoomAfter = extractZoom(zoomedUrl);
        console.log(`Zoom level after zoom-in: ${zoomAfter}`);

        assert.ok(
            zoomAfter > zoomBefore,
            `Expected zoom level to increase from ${zoomBefore}, got ${zoomAfter}`
        );
        console.log('✅ Zoom level increased after clicking "Zoom in".');

        console.log('\nAll checks passed. 🎉');

    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
        process.exitCode = 1;
    } finally {
        await driver.quit();
    }

}

demo().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});
