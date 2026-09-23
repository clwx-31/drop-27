# Drop ’27

A responsive, dependency-free planning website for a four-person 18,000-foot tandem skydive near Wisconsin in summer 2027.

## Run locally

Open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

The budget calculator runs entirely in the browser. Checklist progress is saved in local storage on the current device.

## Updating trip details

Published prices and operating dates are current as of September 2026. Before booking for 2027, verify the 18,000-foot program, availability, group price, weight policy, and media pricing with Chicagoland Skydiving Center. Update the figures in `index.html` and the per-person jump constant in `script.js` if rates change.
