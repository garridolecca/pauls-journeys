/**
 * Paul's Missionary Journeys — Main Application
 * ArcGIS Maps SDK for JavaScript 5.0
 *
 * CONFIGURATION: To use Esri's premium basemaps (e.g. Human Geography),
 * get a free API key at https://developers.arcgis.com/ and paste it below.
 * Without a key, the app uses CartoDB Positron tiles (light gray, no key required).
 */
const ARCGIS_API_KEY = ""; // Paste your key here

import {
  cities,
  journeys,
  routes,
  scriptureIndex,
  allChapters,
} from "./data.js";

import {
  lang,
  setLang,
  t,
  journeyText,
  cityText,
  eventText,
  displayVerse,
  displayChapter,
} from "./i18n.js";

// ============================================================
// DOM references available immediately
// ============================================================
const langSelector = document.getElementById("langSelector");
const splash = document.getElementById("splash");
const loaderBar = document.querySelector(".splash-loader-bar");

// ============================================================
// Custom Modal Helpers (replace Calcite modals)
// ============================================================
function openModal(id) {
  document.getElementById(id).classList.remove("hidden");
}

function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}

// Close modals on backdrop click
document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.add("hidden");
  });
});

// Close buttons
document.getElementById("closeInfo").addEventListener("click", () => closeModal("infoOverlay"));
document.getElementById("closeDonate").addEventListener("click", () => closeModal("donateOverlay"));

// ============================================================
// Donate & Info — always available (no ArcGIS dependency)
// ============================================================
function fillDonateModal() {
  document.getElementById("donateModalTitle").textContent = t("donateTitle");
  document.getElementById("donateText").textContent = t("donateText");
  document.getElementById("donateBtnLabel").textContent = t("donateButton") + " via Venmo";
  document.getElementById("donateQrLabel").textContent =
    lang === "es" ? "O escanea este código QR:" : "Or scan this QR code:";
  document.getElementById("donateEmailLabel").textContent = t("donateEmailLabel");
}

function fillInfoModal() {
  document.getElementById("infoModalTitle").textContent = t("infoTitle");
  const content = document.getElementById("infoModalContent");
  const legendItems = journeys
    .map(
      (j) =>
        `<div class="legend-item"><span class="legend-line" style="background:${j.hexColor}"></span>${journeyText(j.id, "name")} (${journeyText(j.id, "dateRange")})</div>`
    )
    .join("");
  content.innerHTML = `
    <p>${journeyText(1, "description")}</p>
    <div class="info-legend">
      <h4>${t("infoLegendTitle")}</h4>
      ${legendItems}
    </div>
    <div class="info-features">
      <h4>${t("infoFeaturesTitle")}</h4>
      <ul>
        <li>${t("infoFeature1")}</li>
        <li>${t("infoFeature2")}</li>
        <li>${t("infoFeature3")}</li>
        <li>${t("infoFeature4")}</li>
        <li>${t("infoFeature5")}</li>
      </ul>
    </div>
    <div class="info-verse">${t("infoVerse")}</div>
  `;
}

document.getElementById("btnDonate").addEventListener("click", () => {
  fillDonateModal();
  openModal("donateOverlay");
});

document.getElementById("btnInfo").addEventListener("click", () => {
  fillInfoModal();
  openModal("infoOverlay");
});

// ============================================================
// Language Selector Flow (initial launch)
// ============================================================
document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const chosenLang = btn.dataset.lang;
    setLang(chosenLang);

    // Transition: hide language selector → show splash
    langSelector.classList.add("hidden");
    splash.classList.remove("hidden");

    // Apply translations to splash
    document.getElementById("splashTitle").textContent = t("appTitle");
    document.getElementById("splashSubtitle").textContent = t("appSubtitle");
    document.getElementById("splashVerse").textContent = t("splashVerse");
    document.getElementById("splashRef").textContent = "— " + t("splashVerseRef");

    // Start the map loading
    initMap();
  });
});

// ============================================================
// Splash helpers
// ============================================================
let progress = 0;
let progressInterval;

function startProgress() {
  progressInterval = setInterval(() => {
    progress += Math.random() * 12;
    if (progress > 90) progress = 90;
    loaderBar.style.width = progress + "%";
  }, 250);
}

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

// ============================================================
// Main init — called after language is chosen
// ============================================================
let mapInitialized = false;

async function initMap() {
  if (mapInitialized) return;
  mapInitialized = true;

  startProgress();

  // Safety: dismiss splash after 15s no matter what
  setTimeout(() => {
    if (!splash.classList.contains("hidden")) {
      console.warn("Splash timeout — forcing dismiss");
      dismissSplash();
    }
  }, 15000);

  // Apply all i18n to the UI
  applyTranslations();

  // ============================================================
  // ArcGIS Module Imports via $arcgis.import()
  // ============================================================
  let Map, MapView, GraphicsLayer, Graphic, Point, Polyline,
    SimpleMarkerSymbol, SimpleLineSymbol, TextSymbol,
    WebTileLayer, Basemap, esriConfig, reactiveUtils;

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
      WebTileLayer,
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
      "@arcgis/core/layers/WebTileLayer.js",
      "@arcgis/core/Basemap.js",
      "@arcgis/core/core/reactiveUtils.js",
    ]);
  } catch (err) {
    console.error("Failed to load ArcGIS modules:", err);
    showError(lang === "es"
      ? "Error al cargar el mapa. Verifica tu conexión."
      : "Failed to load map SDK. Check your connection and refresh.");
    throw err;
  }

  // ============================================================
  // API Key & Basemap
  // ============================================================
  let mapBasemap;

  if (ARCGIS_API_KEY) {
    esriConfig.apiKey = ARCGIS_API_KEY;
    mapBasemap = "arcgis/human-geography";
  } else {
    // CartoDB Positron — light gray tiles with Latin-script labels, no API key needed
    const cartoLayer = new WebTileLayer({
      urlTemplate: "https://{subDomain}.basemaps.cartocdn.com/light_all/{level}/{col}/{row}@2x.png",
      subDomains: ["a", "b", "c", "d"],
      copyright: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    });
    mapBasemap = new Basemap({ baseLayers: [cartoLayer] });
  }

  // ============================================================
  // State
  // ============================================================
  let activeJourney = "all";
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

  view.when(dismissSplash).catch((err) => {
    console.error("MapView failed:", err);
    showError(lang === "es"
      ? "El mapa no pudo cargarse."
      : "Map failed to load. You may need an ArcGIS API key.");
    dismissSplash();
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
      case "major": return 18;
      case "moderate": return 15;
      default: return 12;
    }
  }

  function getCityOutlineWidth(significance) {
    return significance === "major" ? 2.5 : 2;
  }

  function getCityStopNumber(city) {
    if (activeJourney === "all") {
      const event = city.events[0];
      return event ? event.order : null;
    }
    const event = city.events.find((e) => e.journey === activeJourney);
    return event ? event.order : null;
  }

  function getStopJourneyColor(city) {
    if (activeJourney === "all") {
      return getJourneyColor(city.journeys[0]);
    }
    return getJourneyColor(activeJourney);
  }

  // ============================================================
  // Draw Routes — hides non-active journeys completely
  // ============================================================
  function drawRoutes() {
    routeLayer.removeAll();

    routes.forEach((route) => {
      const journey = journeys.find((j) => j.id === route.journey);
      if (!journey) return;

      if (activeJourney !== "all" && activeJourney !== route.journey) return;

      if (route.outbound && route.outbound.length > 1) {
        routeLayer.add(
          new Graphic({
            geometry: new Polyline({ paths: [route.outbound] }),
            symbol: new SimpleLineSymbol({
              color: [...journey.color, 220],
              width: 3,
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
              color: [...journey.color, 180],
              width: 2.5,
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
  // Draw Cities — hides non-active journeys completely
  // ============================================================
  function drawCities() {
    cityLayer.removeAll();
    labelLayer.removeAll();

    const filteredCities = getFilteredCities();

    cities.forEach((city) => {
      if (activeJourney !== "all" && !city.journeys.includes(activeJourney)) return;

      const isVisible = filteredCities.has(city.id);
      const markerColor = getStopJourneyColor(city);
      const size = getCitySize(city.significance);
      const opacity = isVisible ? 1 : 0.15;
      const stopNumber = getCityStopNumber(city);

      const point = new Point({ longitude: city.lng, latitude: city.lat });

      // Glow for major cities
      if (city.significance === "major" && isVisible) {
        cityLayer.add(
          new Graphic({
            geometry: point,
            symbol: new SimpleMarkerSymbol({
              style: "circle",
              size: size + 12,
              color: [markerColor[0], markerColor[1], markerColor[2], 40],
              outline: { color: [0, 0, 0, 0], width: 0 },
            }),
            attributes: { cityId: city.id, type: "glow" },
          })
        );
      }

      // City marker
      cityLayer.add(
        new Graphic({
          geometry: point,
          symbol: new SimpleMarkerSymbol({
            style: "circle",
            size,
            color: [...markerColor, opacity * 255],
            outline: {
              color: [60, 40, 50, opacity * 200],
              width: getCityOutlineWidth(city.significance),
            },
          }),
          attributes: { cityId: city.id, type: "city" },
        })
      );

      // Stop number inside the marker
      if (stopNumber != null && isVisible) {
        const numFontSize = city.significance === "major" ? 9 : city.significance === "moderate" ? 8 : 7;
        cityLayer.add(
          new Graphic({
            geometry: point,
            symbol: new TextSymbol({
              text: String(stopNumber),
              color: [255, 255, 255, 255],
              haloColor: [0, 0, 0, 120],
              haloSize: 0.5,
              font: {
                size: numFontSize,
                family: "Arial",
                weight: "bold",
              },
              yoffset: 0,
              xoffset: 0,
              horizontalAlignment: "center",
              verticalAlignment: "middle",
            }),
            attributes: { cityId: city.id, type: "stopNumber" },
          })
        );
      }

      // City name label — dark text with light halo for light basemap
      if (isVisible && (city.significance !== "minor" || view.zoom > 6)) {
        const labelText = showBiblicalNames
          ? (cityText(city.id, "biblicalName") || city.biblicalName)
          : (cityText(city.id, "modernName") || city.modernName);
        labelLayer.add(
          new Graphic({
            geometry: point,
            symbol: new TextSymbol({
              text: labelText,
              color: [40, 25, 35, opacity * 255],
              haloColor: [255, 255, 255, 220],
              haloSize: 2,
              font: {
                size: city.significance === "major" ? 11 : 9,
                family: "Avenir Next LT Pro",
                weight: city.significance === "major" ? "bold" : "normal",
              },
              yoffset: size / 2 + 8,
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

      const chapterDisplay = displayChapter(chapter);

      if (filterLower) {
        const match =
          chapter.toLowerCase().includes(filterLower) ||
          chapterDisplay.toLowerCase().includes(filterLower) ||
          entries.some(
            (e) =>
              e.event.verse.toLowerCase().includes(filterLower) ||
              displayVerse(e.event.verse).toLowerCase().includes(filterLower) ||
              e.event.description.toLowerCase().includes(filterLower)
          );
        if (!match) return;
      }

      const chapterDiv = document.createElement("div");
      const evtCount = entries.length;
      const evtWord = evtCount === 1 ? t("eventSingular") : t("eventPlural");

      const header = document.createElement("div");
      header.className = `chapter-item${selectedChapter === chapter ? " active" : ""}`;
      header.innerHTML = `
        <span class="chapter-name">${chapterDisplay}</span>
        <span class="chapter-count">${evtCount} ${evtWord}</span>
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
        const cityName = cityText(city.id, "biblicalName") || city.biblicalName;
        const verseDisplay = displayVerse(entry.event.verse);
        const verseDiv = document.createElement("div");
        verseDiv.className = "verse-item";
        verseDiv.innerHTML = `
          <span class="verse-dot" style="background:${getJourneyHex(entry.event.journey)}"></span>
          <span><strong class="verse-city">${cityName}</strong> &mdash; ${verseDisplay}</span>
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
      const isActive = allChapters.some(
        (ch) => (ch === name || displayChapter(ch) === name) && ch === selectedChapter
      );
      item.classList.toggle("active", isActive);
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
      ? (lang === "es" ? "Mostrando: Nombres Bíblicos" : "Showing: Biblical Names")
      : (lang === "es" ? "Mostrando: Nombres Modernos" : "Showing: Modern Names");
    nameToggle.classList.add("visible");
    clearTimeout(nameToggleTimeout);
    nameToggleTimeout = setTimeout(() => nameToggle.classList.remove("visible"), 2000);
    drawCities();
  });

  // ============================================================
  // UI: Language Switch (in-app toggle)
  // ============================================================
  document.getElementById("btnLang").addEventListener("click", () => {
    const newLang = lang === "en" ? "es" : "en";
    setLang(newLang);
    applyTranslations();
    refresh();

    // Rebuild scripture panel if open
    if (!scripturePanel.classList.contains("hidden")) {
      buildChapterList(scriptureSearch.value || "");
    }

    // Re-open bottom sheet for current city if visible
    if (selectedCity && bottomSheet.classList.contains("open")) {
      openBottomSheet(selectedCity);
    }
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
    const bName = cityText(city.id, "biblicalName") || city.biblicalName;
    const mName = cityText(city.id, "modernName") || city.modernName;
    const region = cityText(city.id, "region") || city.region;
    sheetBiblicalName.textContent = bName;
    sheetModernName.textContent = `${t("sheetModernLabel")} ${mName}  |  ${t("sheetRegionLabel")} ${region}`;

    let eventsToShow = city.events;
    if (activeJourney !== "all") {
      eventsToShow = city.events.filter((e) => e.journey === activeJourney);
    }

    sheetEvents.innerHTML = eventsToShow
      .map((event) => {
        const j = journeys.find((j) => j.id === event.journey);
        const jShort = journeyText(event.journey, "shortName") || j?.shortName || "Journey";
        const jDate = journeyText(event.journey, "dateRange") || j?.dateRange || "";
        const action = eventText(city.id, event.journey, "action") || event.action;
        const description = eventText(city.id, event.journey, "description") || event.description;
        const quote = eventText(city.id, event.journey, "quote") || event.quote;
        const verse = displayVerse(event.verse);

        return `
          <div class="event-card" data-journey="${event.journey}">
            <div class="event-journey-tag">${jShort} &bull; ${jDate}</div>
            <div class="event-action">${action}</div>
            <p class="event-description">${description}</p>
            ${quote ? `<div class="event-quote">${quote}</div>` : ""}
            <span class="event-verse-ref">${verse}</span>
          </div>
        `;
      })
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
          size: getCitySize(city.significance) + 12,
          color: [201, 168, 76, 35],
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
}

// ============================================================
// Apply translations to static HTML elements
// ============================================================
function applyTranslations() {
  // Header
  const navLogo = document.getElementById("navLogo");
  navLogo.setAttribute("heading", t("appTitle"));
  navLogo.setAttribute("description", t("appSubtitle"));

  // Header buttons text
  document.getElementById("btnScripture").textContent = t("btnScripture");
  document.getElementById("btnToggleNames").textContent = t("btnNames");

  // Donate button text
  const donateBtnText = document.getElementById("donateBtnText");
  if (donateBtnText) donateBtnText.textContent = lang === "es" ? "Apoya" : "Support";
  document.getElementById("btnDonate").setAttribute("title",
    lang === "es" ? "Apoya este proyecto" : "Support this project");

  // Language switch button — shows the OTHER language
  const langBtnText = document.getElementById("langBtnText");
  if (langBtnText) langBtnText.textContent = lang === "en" ? "ES" : "EN";

  // Journey chips
  document.querySelectorAll(".journey-chip").forEach((chip) => {
    const labelEl = chip.querySelector(".chip-label");
    const key = labelEl?.dataset?.i18n;
    if (key) labelEl.textContent = t(key);
  });

  // Scripture panel
  document.getElementById("scripturePanelTitle").textContent = t("scripturePanelTitle");
  document.getElementById("scriptureSearch").setAttribute("placeholder", t("scriptureSearchPlaceholder"));
}
