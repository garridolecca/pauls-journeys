/**
 * Paul's Missionary Journeys — Main Application
 * ArcGIS Maps SDK for JavaScript 5.0
 */

import {
  cities,
  journeys,
  routes,
  scriptureIndex,
  allChapters,
  allVerses,
} from "./data.js";

// ============================================================
// ArcGIS Module Imports
// ============================================================
const [
  Map,
  MapView,
  GraphicsLayer,
  Graphic,
  Point,
  Polyline,
  SimpleMarkerSymbol,
  SimpleLineSymbol,
  TextSymbol,
  PopupTemplate,
  reactiveUtils,
] = await Promise.all([
  import("https://js.arcgis.com/5.0/@arcgis/core/Map.js").then(m => m.default),
  import("https://js.arcgis.com/5.0/@arcgis/core/views/MapView.js").then(m => m.default),
  import("https://js.arcgis.com/5.0/@arcgis/core/layers/GraphicsLayer.js").then(m => m.default),
  import("https://js.arcgis.com/5.0/@arcgis/core/Graphic.js").then(m => m.default),
  import("https://js.arcgis.com/5.0/@arcgis/core/geometry/Point.js").then(m => m.default),
  import("https://js.arcgis.com/5.0/@arcgis/core/geometry/Polyline.js").then(m => m.default),
  import("https://js.arcgis.com/5.0/@arcgis/core/symbols/SimpleMarkerSymbol.js").then(m => m.default),
  import("https://js.arcgis.com/5.0/@arcgis/core/symbols/SimpleLineSymbol.js").then(m => m.default),
  import("https://js.arcgis.com/5.0/@arcgis/core/symbols/TextSymbol.js").then(m => m.default),
  import("https://js.arcgis.com/5.0/@arcgis/core/PopupTemplate.js").then(m => m.default),
  import("https://js.arcgis.com/5.0/@arcgis/core/reactiveUtils.js"),
]);

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
  basemap: "arcgis/charted-territory",
  layers: [routeLayer, cityLayer, labelLayer],
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [30, 37],
  zoom: 5,
  constraints: {
    minZoom: 3,
    maxZoom: 12,
  },
  popup: { autoOpenEnabled: false },
  ui: { components: ["zoom"] },
  navigation: {
    mouseWheelZoomEnabled: true,
    browserTouchPanEnabled: true,
  },
});

// Position zoom widget
view.ui.move("zoom", "bottom-right");

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

    // Draw outbound path
    if (route.outbound && route.outbound.length > 1) {
      const line = new Polyline({ paths: [route.outbound] });
      routeLayer.add(
        new Graphic({
          geometry: line,
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

    // Draw return path (dashed)
    if (route.returnPath && route.returnPath.length > 1) {
      const line = new Polyline({ paths: [route.returnPath] });
      routeLayer.add(
        new Graphic({
          geometry: line,
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
          size: size,
          color: [...color, opacity * 255],
          outline: {
            color: [255, 255, 255, opacity * 180],
            width: getCityOutlineWidth(city.significance),
          },
        }),
        attributes: { cityId: city.id, type: "city" },
      })
    );

    // Glow effect for major cities
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
              family: "Cinzel, Georgia, serif",
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
        const hasChapter = city.events.some(
          (e) => `${e.book} ${e.chapter}` === selectedChapter
        );
        if (hasChapter) visible.add(city.id);
      } else {
        visible.add(city.id);
      }
    } else {
      const hasJourney = city.journeys.includes(activeJourney);
      if (hasJourney) {
        if (selectedChapter) {
          const hasChapter = city.events.some(
            (e) =>
              e.journey === activeJourney &&
              `${e.book} ${e.chapter}` === selectedChapter
          );
          if (hasChapter) visible.add(city.id);
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

    // Zoom to journey extent
    if (activeJourney !== "all") {
      const journeyCities = cities.filter((c) =>
        c.journeys.includes(activeJourney)
      );
      if (journeyCities.length > 0) {
        zoomToCities(journeyCities);
      }
    } else {
      view.goTo({ center: [30, 37], zoom: 5 }, { duration: 800 });
    }
  });
});

function zoomToCities(citiesList) {
  const lngs = citiesList.map((c) => c.lng);
  const lats = citiesList.map((c) => c.lat);
  const extent = {
    xmin: Math.min(...lngs) - 2,
    ymin: Math.min(...lats) - 2,
    xmax: Math.max(...lngs) + 2,
    ymax: Math.max(...lats) + 2,
    spatialReference: { wkid: 4326 },
  };
  view.goTo(extent, { duration: 800 });
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
  if (!scripturePanel.classList.contains("hidden")) {
    buildChapterList();
  }
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

    // Filter by search text
    if (filterLower) {
      const matchChapter = chapter.toLowerCase().includes(filterLower);
      const matchVerse = entries.some(
        (e) =>
          e.event.verse.toLowerCase().includes(filterLower) ||
          e.event.description.toLowerCase().includes(filterLower)
      );
      if (!matchChapter && !matchVerse) return;
    }

    const chapterDiv = document.createElement("div");

    // Chapter header
    const header = document.createElement("div");
    header.className = `chapter-item${selectedChapter === chapter ? " active" : ""}`;
    header.innerHTML = `
      <span class="chapter-name">${chapter}</span>
      <span class="chapter-count">${entries.length} ${entries.length === 1 ? "event" : "events"}</span>
    `;
    header.addEventListener("click", () => {
      if (selectedChapter === chapter) {
        selectedChapter = null;
      } else {
        selectedChapter = chapter;
      }
      updateChapterHighlights();
      refresh();
      buildChapterList(filter);

      // Zoom to relevant cities
      if (selectedChapter) {
        const matchCities = entries.map((e) =>
          cities.find((c) => c.id === e.cityId)
        ).filter(Boolean);
        if (matchCities.length > 0) zoomToCities(matchCities);
      }
    });
    chapterDiv.appendChild(header);

    // Verse sub-items
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
        view.goTo(
          { center: [city.lng, city.lat], zoom: 8 },
          { duration: 600 }
        );
      });
      sublist.appendChild(verseDiv);
    });

    chapterDiv.appendChild(sublist);
    chapterList.appendChild(chapterDiv);
  });
}

function updateChapterHighlights() {
  const items = chapterList.querySelectorAll(".chapter-item");
  items.forEach((item) => {
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
  nameToggleTimeout = setTimeout(() => {
    nameToggle.classList.remove("visible");
  }, 2000);
  drawCities(); // Refresh labels
});

// ============================================================
// UI: Info Modal
// ============================================================
const btnInfo = document.getElementById("btnInfo");
const infoModal = document.getElementById("infoModal");

btnInfo.addEventListener("click", () => {
  infoModal.open = true;
});

// ============================================================
// UI: Bottom Sheet
// ============================================================
const bottomSheet = document.getElementById("bottomSheet");
const sheetContent = document.getElementById("sheetContent");
const sheetBiblicalName = document.getElementById("sheetBiblicalName");
const sheetModernName = document.getElementById("sheetModernName");
const sheetEvents = document.getElementById("sheetEvents");
const closeSheet = document.getElementById("closeSheet");
const sheetHandle = document.getElementById("sheetHandle");

function openBottomSheet(city) {
  selectedCity = city;

  sheetBiblicalName.textContent = city.biblicalName;
  sheetModernName.textContent = `Modern: ${city.modernName}  |  Region: ${city.region}`;

  // Filter events by active journey
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

closeSheet.addEventListener("click", closeBottomSheet);

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
  if (diff > 0) {
    bottomSheet.style.transform = `translateY(${diff}px)`;
  }
});

document.addEventListener("touchend", () => {
  if (!isDragging) return;
  isDragging = false;
  bottomSheet.style.transition = "";
  const diff = sheetCurrentY - sheetStartY;
  if (diff > 100) {
    closeBottomSheet();
  } else {
    bottomSheet.style.transform = "";
    if (bottomSheet.classList.contains("open")) {
      bottomSheet.style.transform = "translateY(0)";
    }
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
  // Re-draw to update highlight state
  drawCities();

  // Add highlight ring
  const city = cities.find((c) => c.id === cityId);
  if (!city) return;

  const point = new Point({ longitude: city.lng, latitude: city.lat });
  cityLayer.add(
    new Graphic({
      geometry: point,
      symbol: new SimpleMarkerSymbol({
        style: "circle",
        size: getCitySize(city.significance) + 16,
        color: [201, 168, 76, 30],
        outline: {
          color: [201, 168, 76, 200],
          width: 2,
        },
      }),
      attributes: { cityId: city.id, type: "highlight" },
    })
  );
}

view.on("click", (event) => {
  view.hitTest(event).then((response) => {
    const cityGraphic = response.results.find(
      (r) =>
        r.graphic &&
        r.graphic.attributes &&
        r.graphic.attributes.type === "city"
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
    } else {
      // Clicked on empty map — close sheet
      if (!event.native.target.closest(".bottom-sheet")) {
        closeBottomSheet();
      }
    }
  });
});

// Update labels on zoom change
reactiveUtils.watch(
  () => view.zoom,
  () => {
    drawCities();
  }
);

// ============================================================
// Splash Screen
// ============================================================
const splash = document.getElementById("splash");
const loaderBar = document.querySelector(".splash-loader-bar");

let progress = 0;
const progressInterval = setInterval(() => {
  progress += Math.random() * 15;
  if (progress > 90) progress = 90;
  loaderBar.style.width = progress + "%";
}, 200);

view.when(() => {
  clearInterval(progressInterval);
  loaderBar.style.width = "100%";
  setTimeout(() => {
    splash.classList.add("hidden");
  }, 600);
});

// ============================================================
// Initial Draw
// ============================================================
refresh();
buildChapterList();
