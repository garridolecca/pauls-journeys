/**
 * Paul's Missionary Journeys — Main Application
 * ArcGIS Maps SDK for JavaScript 5.0
 *
 * CONFIGURATION: To use Esri's premium basemaps, set your API key below.
 * Get a free key at https://developers.arcgis.com/
 * Without a key, the app uses OpenStreetMap tiles (no key required).
 */
const ARCGIS_API_KEY = ""; // Paste your key here

import {
  cities,
  journeys,
  routes,
  scriptureIndex,
  allChapters,
} from "./data.js";

// ============================================================
// Splash helpers (available immediately, before ArcGIS loads)
// ============================================================
const splash = document.getElementById("splash");
const loaderBar = document.querySelector(".splash-loader-bar");

let progress = 0;
const progressInterval = setInterval(() => {
  progress += Math.random() * 12;
  if (progress > 90) progress = 90;
  loaderBar.style.width = progress + "%";
}, 250);

function dismissSplash() {
  clearInterval(progressInterval);
  loaderBar.style.width = "100%";
  setTimeout(() => splash.classList.add("hidden"), 500);
}

function showError(msg) {
  clearInterval(progressInterval);
  const el = document.createElement("p");
  el.style.cssText = "color:#A34B4B;font-size:13px;margin-top:1rem;";
  el.textContent = msg;
  document.querySelector(".splash-content").appendChild(el);
}

// Safety: dismiss splash after 15s no matter what
setTimeout(() => {
  if (!splash.classList.contains("hidden")) {
    console.warn("Splash timeout — forcing dismiss");
    dismissSplash();
  }
}, 15000);

// ============================================================
// ArcGIS Module Imports via $arcgis.import()
// ============================================================
let Map, MapView, GraphicsLayer, Graphic, Point, Polyline,
  SimpleMarkerSymbol, SimpleLineSymbol, TextSymbol,
  OpenStreetMapLayer, Basemap, esriConfig, reactiveUtils;

try {
  [
    esriConfig,
    Map,
    MapView,
    GraphicsLayer,
    Graphic,
    Point,
    Polyline,
    SimpleMarkerSymbol,
    SimpleLineSymbol,
    TextSymbol,
    OpenStreetMapLayer,
    Basemap,
    reactiveUtils,
  ] = await $arcgis.import([
    "@arcgis/core/config.js",
    "@arcgis/core/Map.js",
    "@arcgis/core/views/MapView.js",
    "@arcgis/core/layers/GraphicsLayer.js",
    "@arcgis/core/Graphic.js",
    "@arcgis/core/geometry/Point.js",
    "@arcgis/core/geometry/Polyline.js",
    "@arcgis/core/symbols/SimpleMarkerSymbol.js",
    "@arcgis/core/symbols/SimpleLineSymbol.js",
    "@arcgis/core/symbols/TextSymbol.js",
    "@arcgis/core/layers/OpenStreetMapLayer.js",
    "@arcgis/core/Basemap.js",
    "@arcgis/core/core/reactiveUtils.js",
  ]);
} catch (err) {
  console.error("Failed to load ArcGIS modules:", err);
  showError("Failed to load map SDK. Check your connection and refresh.");
  throw err;
}

// ============================================================
// API Key & Basemap
// ============================================================
let mapBasemap;

if (ARCGIS_API_KEY) {
  esriConfig.apiKey = ARCGIS_API_KEY;
  mapBasemap = "arcgis/charted-territory";
} else {
  // OpenStreetMap tiles — no API key required
  const osm = new OpenStreetMapLayer();
  mapBasemap = new Basemap({ baseLayers: [osm] });
}

// ============================================================
// State
// ============================================================
let activeJourney = "all"; // "all" | 1 | 2 | 3 | 4
let showBiblicalNames = true;
let selectedCity = null;
let selectedChapter = null;

// ============================================================
// Layers
// ============================================================
const routeLayer = new GraphicsLayer({ title: "Routes" });
const cityLayer = new GraphicsLayer({ title: "Cities" });
const labelLayer = new GraphicsLayer({ title: "Labels" });

// ============================================================
// Map & View
// ============================================================
const map = new Map({
  basemap: mapBasemap,
  layers: [routeLayer, cityLayer, labelLayer],
});

const view = new MapView({
  container: "viewDiv",
  map,
  center: [30, 37],
  zoom: 5,
  constraints: { minZoom: 3, maxZoom: 12 },
  popup: { autoOpenEnabled: false },
  ui: { components: ["zoom"] },
  navigation: {
    mouseWheelZoomEnabled: true,
    browserTouchPanEnabled: true,
  },
});

view.ui.move("zoom", "bottom-right");

// Dismiss splash when the view is ready
view.when(dismissSplash).catch((err) => {
  console.error("MapView failed:", err);
  showError("Map failed to load. You may need an ArcGIS API key.");
  dismissSplash(); // Still dismiss so user can see the error
});

// ============================================================
// Drawing Helpers
// ============================================================
function getJourneyColor(journeyId) {
  const j = journeys.find((j) => j.id === journeyId);
  return j ? j.color : [150, 150, 150];
}

function getJourneyHex(journeyId) {
  const j = journeys.find((j) => j.id === journeyId);
  return j ? j.hexColor : "#999";
}

function getCitySize(significance) {
  switch (significance) {
    case "major": return 10;
    case "moderate": return 7;
    default: return 5;
  }
}

function getCityOutlineWidth(significance) {
  return significance === "major" ? 2.5 : 1.5;
}

// ============================================================
// Draw Routes
// ============================================================
function drawRoutes() {
  routeLayer.removeAll();

  routes.forEach((route) => {
    const journey = journeys.find((j) => j.id === route.journey);
    if (!journey) return;

    const visible = activeJourney === "all" || activeJourney === route.journey;
    const opacity = visible ? 0.85 : 0.08;

    if (route.outbound && route.outbound.length > 1) {
      routeLayer.add(
        new Graphic({
          geometry: new Polyline({ paths: [route.outbound] }),
          symbol: new SimpleLineSymbol({
            color: [...journey.color, opacity * 255],
            width: visible ? 3 : 1.5,
            style: "solid",
            cap: "round",
            join: "round",
          }),
          attributes: { journey: route.journey, type: "outbound" },
        })
      );
    }

    if (route.returnPath && route.returnPath.length > 1) {
      routeLayer.add(
        new Graphic({
          geometry: new Polyline({ paths: [route.returnPath] }),
          symbol: new SimpleLineSymbol({
            color: [...journey.color, opacity * 200],
            width: visible ? 2.5 : 1,
            style: "dash",
            cap: "round",
            join: "round",
          }),
          attributes: { journey: route.journey, type: "return" },
        })
      );
    }
  });
}

// ============================================================
// Draw Cities
// ============================================================
function drawCities() {
  cityLayer.removeAll();
  labelLayer.removeAll();

  const filteredCities = getFilteredCities();

  cities.forEach((city) => {
    const isVisible = filteredCities.has(city.id);
    const primaryJourney = city.journeys[0];
    const color = getJourneyColor(primaryJourney);
    const size = getCitySize(city.significance);
    const opacity = isVisible ? 1 : 0.1;

    const point = new Point({ longitude: city.lng, latitude: city.lat });

    // City marker
    cityLayer.add(
      new Graphic({
        geometry: point,
        symbol: new SimpleMarkerSymbol({
          style: "circle",
          size,
          color: [...color, opacity * 255],
          outline: {
            color: [255, 255, 255, opacity * 180],
            width: getCityOutlineWidth(city.significance),
          },
        }),
        attributes: { cityId: city.id, type: "city" },
      })
    );

    // Glow for major cities
    if (city.significance === "major" && isVisible) {
      cityLayer.add(
        new Graphic({
          geometry: point,
          symbol: new SimpleMarkerSymbol({
            style: "circle",
            size: size + 10,
            color: [color[0], color[1], color[2], 40],
            outline: { color: [0, 0, 0, 0], width: 0 },
          }),
          attributes: { cityId: city.id, type: "glow" },
        })
      );
    }

    // Label
    if (isVisible && (city.significance !== "minor" || view.zoom > 6)) {
      const labelText = showBiblicalNames ? city.biblicalName : city.modernName;
      labelLayer.add(
        new Graphic({
          geometry: point,
          symbol: new TextSymbol({
            text: labelText,
            color: [245, 230, 200, opacity * 255],
            haloColor: [0, 0, 0, 200],
            haloSize: 2,
            font: {
              size: city.significance === "major" ? 11 : 9,
              family: "Avenir Next LT Pro",
              weight: city.significance === "major" ? "bold" : "normal",
            },
            yoffset: size + 6,
          }),
          attributes: { cityId: city.id, type: "label" },
        })
      );
    }
  });
}

// ============================================================
// Filtering
// ============================================================
function getFilteredCities() {
  const visible = new Set();
  cities.forEach((city) => {
    if (activeJourney === "all") {
      if (selectedChapter) {
        if (city.events.some((e) => `${e.book} ${e.chapter}` === selectedChapter))
          visible.add(city.id);
      } else {
        visible.add(city.id);
      }
    } else {
      if (city.journeys.includes(activeJourney)) {
        if (selectedChapter) {
          if (
            city.events.some(
              (e) =>
                e.journey === activeJourney &&
                `${e.book} ${e.chapter}` === selectedChapter
            )
          )
            visible.add(city.id);
        } else {
          visible.add(city.id);
        }
      }
    }
  });
  return visible;
}

function refresh() {
  drawRoutes();
  drawCities();
}

// ============================================================
// UI: Journey Chip Selector
// ============================================================
const chips = document.querySelectorAll(".journey-chip");
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");

    const val = chip.dataset.journey;
    activeJourney = val === "all" ? "all" : parseInt(val);
    selectedChapter = null;
    updateChapterHighlights();
    closeBottomSheet();
    refresh();

    if (activeJourney !== "all") {
      const journeyCities = cities.filter((c) =>
        c.journeys.includes(activeJourney)
      );
      if (journeyCities.length > 0) zoomToCities(journeyCities);
    } else {
      view.goTo({ center: [30, 37], zoom: 5 }, { duration: 800 });
    }
  });
});

function zoomToCities(citiesList) {
  const lngs = citiesList.map((c) => c.lng);
  const lats = citiesList.map((c) => c.lat);
  view.goTo(
    {
      xmin: Math.min(...lngs) - 2,
      ymin: Math.min(...lats) - 2,
      xmax: Math.max(...lngs) + 2,
      ymax: Math.max(...lats) + 2,
      spatialReference: { wkid: 4326 },
    },
    { duration: 800 }
  );
}

// ============================================================
// UI: Scripture Filter Panel
// ============================================================
const scripturePanel = document.getElementById("scripturePanel");
const btnScripture = document.getElementById("btnScripture");
const closeScripture = document.getElementById("closeScripture");
const scriptureSearch = document.getElementById("scriptureSearch");
const chapterList = document.getElementById("chapterList");

btnScripture.addEventListener("click", () => {
  scripturePanel.classList.toggle("hidden");
  if (!scripturePanel.classList.contains("hidden")) buildChapterList();
});

closeScripture.addEventListener("click", () => {
  scripturePanel.classList.add("hidden");
});

function buildChapterList(filter = "") {
  chapterList.innerHTML = "";
  const filterLower = filter.toLowerCase();

  allChapters.forEach((chapter) => {
    const entries = scriptureIndex[chapter] || [];
    if (entries.length === 0) return;

    if (filterLower) {
      const match =
        chapter.toLowerCase().includes(filterLower) ||
        entries.some(
          (e) =>
            e.event.verse.toLowerCase().includes(filterLower) ||
            e.event.description.toLowerCase().includes(filterLower)
        );
      if (!match) return;
    }

    const chapterDiv = document.createElement("div");

    const header = document.createElement("div");
    header.className = `chapter-item${selectedChapter === chapter ? " active" : ""}`;
    header.innerHTML = `
      <span class="chapter-name">${chapter}</span>
      <span class="chapter-count">${entries.length} ${entries.length === 1 ? "event" : "events"}</span>
    `;
    header.addEventListener("click", () => {
      selectedChapter = selectedChapter === chapter ? null : chapter;
      updateChapterHighlights();
      refresh();
      buildChapterList(filter);
      if (selectedChapter) {
        const matchCities = entries
          .map((e) => cities.find((c) => c.id === e.cityId))
          .filter(Boolean);
        if (matchCities.length > 0) zoomToCities(matchCities);
      }
    });
    chapterDiv.appendChild(header);

    const sublist = document.createElement("div");
    sublist.className = "verse-sublist";
    entries.forEach((entry) => {
      const city = cities.find((c) => c.id === entry.cityId);
      if (!city) return;
      const verseDiv = document.createElement("div");
      verseDiv.className = "verse-item";
      verseDiv.innerHTML = `
        <span class="verse-dot" style="background:${getJourneyHex(entry.event.journey)}"></span>
        <span><strong class="verse-city">${city.biblicalName}</strong> &mdash; ${entry.event.verse}</span>
      `;
      verseDiv.addEventListener("click", (e) => {
        e.stopPropagation();
        selectCity(city.id);
        scripturePanel.classList.add("hidden");
        view.goTo({ center: [city.lng, city.lat], zoom: 8 }, { duration: 600 });
      });
      sublist.appendChild(verseDiv);
    });

    chapterDiv.appendChild(sublist);
    chapterList.appendChild(chapterDiv);
  });
}

function updateChapterHighlights() {
  chapterList.querySelectorAll(".chapter-item").forEach((item) => {
    const name = item.querySelector(".chapter-name").textContent;
    item.classList.toggle("active", name === selectedChapter);
  });
}

scriptureSearch.addEventListener("calciteInputTextInput", (e) => {
  buildChapterList(e.target.value);
});

// ============================================================
// UI: Name Toggle
// ============================================================
const btnToggleNames = document.getElementById("btnToggleNames");
const nameToggle = document.getElementById("nameToggle");
const nameLabel = document.getElementById("nameLabel");
let nameToggleTimeout;

btnToggleNames.addEventListener("click", () => {
  showBiblicalNames = !showBiblicalNames;
  nameLabel.textContent = showBiblicalNames
    ? "Showing: Biblical Names"
    : "Showing: Modern Names";
  nameToggle.classList.add("visible");
  clearTimeout(nameToggleTimeout);
  nameToggleTimeout = setTimeout(() => nameToggle.classList.remove("visible"), 2000);
  drawCities();
});

// ============================================================
// UI: Info Modal
// ============================================================
document.getElementById("btnInfo").addEventListener("click", () => {
  document.getElementById("infoModal").open = true;
});

// ============================================================
// UI: Bottom Sheet
// ============================================================
const bottomSheet = document.getElementById("bottomSheet");
const sheetBiblicalName = document.getElementById("sheetBiblicalName");
const sheetModernName = document.getElementById("sheetModernName");
const sheetEvents = document.getElementById("sheetEvents");
const sheetHandle = document.getElementById("sheetHandle");

function openBottomSheet(city) {
  selectedCity = city;
  sheetBiblicalName.textContent = city.biblicalName;
  sheetModernName.textContent = `Modern: ${city.modernName}  |  Region: ${city.region}`;

  let eventsToShow = city.events;
  if (activeJourney !== "all") {
    eventsToShow = city.events.filter((e) => e.journey === activeJourney);
  }

  sheetEvents.innerHTML = eventsToShow
    .map(
      (event) => `
    <div class="event-card" data-journey="${event.journey}">
      <div class="event-journey-tag">${journeys.find((j) => j.id === event.journey)?.shortName || "Journey"} &bull; ${journeys.find((j) => j.id === event.journey)?.dateRange || ""}</div>
      <div class="event-action">${event.action}</div>
      <p class="event-description">${event.description}</p>
      ${event.quote ? `<div class="event-quote">${event.quote}</div>` : ""}
      <span class="event-verse-ref">${event.verse}</span>
    </div>
  `
    )
    .join("");

  bottomSheet.classList.add("open");
}

function closeBottomSheet() {
  bottomSheet.classList.remove("open");
  selectedCity = null;
}

document.getElementById("closeSheet").addEventListener("click", closeBottomSheet);

// Touch drag to dismiss on mobile
let sheetStartY = 0;
let sheetCurrentY = 0;
let isDragging = false;

sheetHandle.addEventListener("touchstart", (e) => {
  isDragging = true;
  sheetStartY = e.touches[0].clientY;
  bottomSheet.style.transition = "none";
});

document.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  sheetCurrentY = e.touches[0].clientY;
  const diff = sheetCurrentY - sheetStartY;
  if (diff > 0) bottomSheet.style.transform = `translateY(${diff}px)`;
});

document.addEventListener("touchend", () => {
  if (!isDragging) return;
  isDragging = false;
  bottomSheet.style.transition = "";
  const diff = sheetCurrentY - sheetStartY;
  if (diff > 100) {
    closeBottomSheet();
  }
  bottomSheet.style.transform = "";
});

// ============================================================
// Map Click Handler
// ============================================================
function selectCity(cityId) {
  const city = cities.find((c) => c.id === cityId);
  if (city) {
    openBottomSheet(city);
    highlightCity(cityId);
  }
}

function highlightCity(cityId) {
  drawCities();
  const city = cities.find((c) => c.id === cityId);
  if (!city) return;

  cityLayer.add(
    new Graphic({
      geometry: new Point({ longitude: city.lng, latitude: city.lat }),
      symbol: new SimpleMarkerSymbol({
        style: "circle",
        size: getCitySize(city.significance) + 16,
        color: [201, 168, 76, 30],
        outline: { color: [201, 168, 76, 200], width: 2 },
      }),
      attributes: { cityId: city.id, type: "highlight" },
    })
  );
}

view.on("click", (event) => {
  view.hitTest(event).then((response) => {
    const cityGraphic = response.results.find(
      (r) => r.graphic?.attributes?.type === "city"
    );

    if (cityGraphic) {
      const cityId = cityGraphic.graphic.attributes.cityId;
      selectCity(cityId);
      const city = cities.find((c) => c.id === cityId);
      if (city) {
        view.goTo(
          { center: [city.lng, city.lat], zoom: Math.max(view.zoom, 7) },
          { duration: 500 }
        );
      }
    } else if (!event.native.target.closest(".bottom-sheet")) {
      closeBottomSheet();
    }
  });
});

// Debounced label refresh on zoom
let zoomTimer;
reactiveUtils.watch(
  () => view.zoom,
  () => {
    clearTimeout(zoomTimer);
    zoomTimer = setTimeout(() => drawCities(), 150);
  }
);

// ============================================================
// Initial Draw
// ============================================================
refresh();
buildChapterList();
