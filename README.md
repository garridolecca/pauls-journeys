# The Journeys of Paul — Interactive Biblical Atlas

An interactive web map application that traces all four missionary journeys of the Apostle Paul as recorded in the Book of Acts. Built with **ArcGIS Maps SDK for JavaScript 5.0** and the **Calcite Design System**.

## Live Demo

**[View Live App](https://garridolecca.github.io/pauls-journeys/)**

## Features

- **4 Missionary Journeys** mapped with color-coded routes (outbound & return paths)
- **30+ biblical cities** with markers scaled by significance
- **Scripture References** — every city event linked to specific Bible verses with quotes
- **Filter by Scripture** — search and filter by Acts chapter or specific verse
- **Biblical vs Modern Names** — toggle to see ancient and current city names
- **Responsive Mobile Design** — native app feel with bottom sheet, touch gestures, and swipeable journey chips
- **Beautiful Biblical Theme** — dark theme with gold accents, Cinzel typography, and parchment tones
- **Splash Screen** with inspirational verse (2 Timothy 4:7)

## Journeys Covered

| Journey | Date | Scripture | Key Destinations |
|---------|------|-----------|-----------------|
| **First Missionary Journey** | AD 46–48 | Acts 13–14 | Cyprus, Antioch Pisidia, Iconium, Lystra, Derbe |
| **Second Missionary Journey** | AD 49–52 | Acts 15:36–18:22 | Philippi, Thessalonica, Athens, Corinth, Ephesus |
| **Third Missionary Journey** | AD 53–57 | Acts 18:23–21:17 | Ephesus (3 years), Macedonia, Corinth, Miletus, Jerusalem |
| **Journey to Rome** | AD 59–60 | Acts 27–28 | Crete, Malta (shipwreck), Syracuse, Rome |

## Tech Stack

- [ArcGIS Maps SDK for JavaScript 5.0](https://developers.arcgis.com/javascript/latest/)
- [Calcite Design System](https://developers.arcgis.com/calcite-design-system/)
- Vanilla JavaScript (ES Modules)
- CSS3 with custom properties and responsive design
- Google Fonts (Cinzel + Inter)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/garridolecca/pauls-journeys.git
   ```

2. Open in VS Code and use the **Live Server** extension (or any local HTTP server):
   ```bash
   cd pauls-journeys
   npx serve .
   ```

3. Open `http://localhost:3000` (or the Live Server URL) in your browser.

> **Note:** An ArcGIS API key is not required for the basemap used. The app loads everything from the ArcGIS CDN.

## Project Structure

```
pauls-journeys/
├── index.html          # Main HTML with Calcite shell layout
├── css/
│   └── styles.css      # Biblical theme, responsive styles, animations
├── js/
│   ├── app.js          # Map initialization, interactions, UI logic
│   └── data.js         # Paul's journey data (cities, routes, scriptures)
└── README.md
```

## Scripture References

All events are sourced from the **Book of Acts** (chapters 13–28) with direct verse quotations from the NIV. Each city popup includes:

- Biblical name and modern equivalent
- Historical context of Paul's visit
- Direct scripture quotation
- Verse reference linked to the narrative

---

*"I have fought the good fight, I have finished the race, I have kept the faith."* — 2 Timothy 4:7
