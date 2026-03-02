/**
 * Paul's Missionary Journeys — Bilingual Translation Module
 * Languages: English (en) | Spanish (es)
 * Spanish Bible quotes: Reina-Valera 1960 (RVR1960)
 */

// ─────────────────────────────────────────────────────────────
// LANGUAGE STATE
// ─────────────────────────────────────────────────────────────
export let lang = "en";

export function setLang(l) {
  lang = l;
}

// ─────────────────────────────────────────────────────────────
// UI STRINGS
// ─────────────────────────────────────────────────────────────
const ui = {
  en: {
    appTitle: "Paul's Missionary Journeys",
    appSubtitle: "Interactive Map of Acts",
    splashVerse:
      '"Go into all the world and preach the gospel to all creation."',
    splashVerseRef: "Mark 16:15",

    btnScripture: "Scripture",
    btnNames: "Names",
    btnInfo: "Info",

    chipAll: "All Journeys",
    chip1: "Journey 1",
    chip2: "Journey 2",
    chip3: "Journey 3",
    chip4: "To Rome",

    namesBiblical: "Biblical Name",
    namesModern: "Modern Name",

    scripturePanelTitle: "Scripture Search",
    scriptureSearchPlaceholder: "Search Acts…",

    eventSingular: "event",
    eventPlural: "events",

    infoTitle: "About This Map",
    infoLegendTitle: "Journey Legend",
    infoFeaturesTitle: "Features",
    infoFeature1: "Click any city to see events and Scripture",
    infoFeature2: "Filter by journey using the chips above",
    infoFeature3: "Search Scripture in the Scripture panel",
    infoFeature4: "Toggle between biblical and modern city names",
    infoFeature5: "Switch language between English and Spanish",
    infoVerse:
      '"He proclaimed the kingdom of God and taught about the Lord Jesus Christ — with all boldness and without hindrance!" — Acts 28:31',

    sheetModernLabel: "Modern:",
    sheetRegionLabel: "Region:",

    donateTitle: "Support This Project",
    donateText:
      "This map is free and ad-free. If it has been a blessing to you, consider supporting its development.",
    donateButton: "Donate",
    donateEmailLabel: "Questions or feedback?",
    donateEmailText: "Send an email",

    langChoose: "Español",
  },

  es: {
    appTitle: "Los Viajes Misioneros de Pablo",
    appSubtitle: "Mapa Interactivo de Hechos",
    splashVerse:
      '"Id por todo el mundo y predicad el evangelio a toda criatura."',
    splashVerseRef: "Marcos 16:15",

    btnScripture: "Escritura",
    btnNames: "Nombres",
    btnInfo: "Info",

    chipAll: "Todos los Viajes",
    chip1: "Viaje 1",
    chip2: "Viaje 2",
    chip3: "Viaje 3",
    chip4: "A Roma",

    namesBiblical: "Nombre Bíblico",
    namesModern: "Nombre Moderno",

    scripturePanelTitle: "Búsqueda de Escritura",
    scriptureSearchPlaceholder: "Buscar en Hechos…",

    eventSingular: "evento",
    eventPlural: "eventos",

    infoTitle: "Acerca de Este Mapa",
    infoLegendTitle: "Leyenda de Viajes",
    infoFeaturesTitle: "Características",
    infoFeature1: "Haz clic en cualquier ciudad para ver eventos y Escritura",
    infoFeature2: "Filtra por viaje usando los chips de arriba",
    infoFeature3: "Busca Escritura en el panel de Escritura",
    infoFeature4: "Alterna entre nombres bíblicos y modernos de ciudades",
    infoFeature5: "Cambia el idioma entre inglés y español",
    infoVerse:
      '"predicando el reino de Dios y enseñando acerca del Señor Jesucristo, abiertamente y sin impedimento." — Hechos 28:31',

    sheetModernLabel: "Moderno:",
    sheetRegionLabel: "Región:",

    donateTitle: "Apoya Este Proyecto",
    donateText:
      "Este mapa es gratuito y sin anuncios. Si ha sido de bendición para ti, considera apoyar su desarrollo.",
    donateButton: "Donar",
    donateEmailLabel: "¿Preguntas o comentarios?",
    donateEmailText: "Enviar un correo",

    langChoose: "English",
  },
};

/**
 * Look up a UI string by key in the current language.
 * Falls back to English if the key is missing in Spanish.
 */
export function t(key) {
  return (ui[lang] && ui[lang][key]) ?? ui["en"][key] ?? key;
}

// ─────────────────────────────────────────────────────────────
// JOURNEY TRANSLATIONS
// ─────────────────────────────────────────────────────────────
const journeyTranslations = {
  1: {
    en: {
      name: "First Missionary Journey",
      shortName: "Journey 1",
      dateRange: "AD 46–48",
      chapters: "Acts 13–14",
      description:
        "Paul and Barnabas, commissioned by the church in Antioch, travel to Cyprus and southern Galatia, preaching in synagogues and establishing churches among Jews and Gentiles alike.",
    },
    es: {
      name: "Primer Viaje Misionero",
      shortName: "Viaje 1",
      dateRange: "d.C. 46-48",
      chapters: "Hechos 13-14",
      description:
        "Pablo y Bernabé, comisionados por la iglesia en Antioquía, viajan a Chipre y al sur de Galacia, predicando en las sinagogas y estableciendo iglesias entre judíos y gentiles por igual.",
    },
  },
  2: {
    en: {
      name: "Second Missionary Journey",
      shortName: "Journey 2",
      dateRange: "AD 49–52",
      chapters: "Acts 15:36–18:22",
      description:
        "Paul, now with Silas, revisits churches in Asia Minor, then crosses into Europe for the first time — planting churches in Philippi, Thessalonica, and Corinth.",
    },
    es: {
      name: "Segundo Viaje Misionero",
      shortName: "Viaje 2",
      dateRange: "d.C. 49-52",
      chapters: "Hechos 15:36-18:22",
      description:
        "Pablo, ahora con Silas, revisita las iglesias en Asia Menor, luego cruza a Europa por primera vez, plantando iglesias en Filipos, Tesalónica y Corinto.",
    },
  },
  3: {
    en: {
      name: "Third Missionary Journey",
      shortName: "Journey 3",
      dateRange: "AD 53–57",
      chapters: "Acts 18:23–21:17",
      description:
        "Paul spends nearly three years in Ephesus, writes major epistles, revisits churches in Macedonia and Greece, and makes his final journey to Jerusalem.",
    },
    es: {
      name: "Tercer Viaje Misionero",
      shortName: "Viaje 3",
      dateRange: "d.C. 53-57",
      chapters: "Hechos 18:23-21:17",
      description:
        "Pablo pasa casi tres años en Éfeso, escribe epístolas importantes, revisita las iglesias en Macedonia y Grecia, y hace su último viaje a Jerusalén.",
    },
  },
  4: {
    en: {
      name: "Journey to Rome",
      shortName: "To Rome",
      dateRange: "AD 59–60",
      chapters: "Acts 27–28",
      description:
        "As a prisoner appealing to Caesar, Paul endures a dramatic shipwreck on Malta before finally reaching Rome, where he preaches under house arrest for two years.",
    },
    es: {
      name: "Viaje a Roma",
      shortName: "A Roma",
      dateRange: "d.C. 59-60",
      chapters: "Hechos 27-28",
      description:
        "Como prisionero que apela al César, Pablo soporta un dramático naufragio en Malta antes de llegar finalmente a Roma, donde predica bajo arresto domiciliario durante dos años.",
    },
  },
};

/**
 * Get a translated field from a journey object.
 * @param {number} journeyId - Journey number 1–4
 * @param {string} field     - e.g. "name", "shortName", "dateRange", "chapters", "description"
 */
export function journeyText(journeyId, field) {
  const entry = journeyTranslations[journeyId];
  if (!entry) return "";
  const localized = entry[lang] ?? entry["en"];
  return localized[field] ?? entry["en"][field] ?? "";
}

// ─────────────────────────────────────────────────────────────
// CITY TRANSLATIONS
// ─────────────────────────────────────────────────────────────
const cityTranslations = {
  "antioch-syria": {
    en: { biblicalName: "Antioch in Syria", modernName: "Antakya, Turkey", region: "Syria" },
    es: { biblicalName: "Antioquía de Siria", modernName: "Antakya, Turquía", region: "Siria" },
  },
  seleucia: {
    en: { biblicalName: "Seleucia Pieria", modernName: "Samandağ, Turkey", region: "Syria" },
    es: { biblicalName: "Seleucia de Pieria", modernName: "Samandağ, Turquía", region: "Siria" },
  },
  salamis: {
    en: { biblicalName: "Salamis", modernName: "Near Famagusta, Cyprus", region: "Cyprus" },
    es: { biblicalName: "Salamina", modernName: "Cerca de Famagusta, Chipre", region: "Chipre" },
  },
  paphos: {
    en: { biblicalName: "Paphos", modernName: "Paphos, Cyprus", region: "Cyprus" },
    es: { biblicalName: "Pafos", modernName: "Pafos, Chipre", region: "Chipre" },
  },
  perga: {
    en: { biblicalName: "Perga in Pamphylia", modernName: "Near Antalya, Turkey", region: "Pamphylia" },
    es: { biblicalName: "Perge de Panfilia", modernName: "Cerca de Antalya, Turquía", region: "Panfilia" },
  },
  "antioch-pisidia": {
    en: { biblicalName: "Antioch in Pisidia", modernName: "Yalvaç, Turkey", region: "Galatia" },
    es: { biblicalName: "Antioquía de Pisidia", modernName: "Yalvaç, Turquía", region: "Galacia" },
  },
  iconium: {
    en: { biblicalName: "Iconium", modernName: "Konya, Turkey", region: "Galatia" },
    es: { biblicalName: "Iconio", modernName: "Konya, Turquía", region: "Galacia" },
  },
  lystra: {
    en: { biblicalName: "Lystra", modernName: "Hatunsaray, Turkey", region: "Galatia" },
    es: { biblicalName: "Listra", modernName: "Hatunsaray, Turquía", region: "Galacia" },
  },
  derbe: {
    en: { biblicalName: "Derbe", modernName: "Kerti Höyük, Turkey", region: "Galatia" },
    es: { biblicalName: "Derbe", modernName: "Kerti Höyük, Turquía", region: "Galacia" },
  },
  attalia: {
    en: { biblicalName: "Attalia", modernName: "Antalya, Turkey", region: "Pamphylia" },
    es: { biblicalName: "Atalia", modernName: "Antalya, Turquía", region: "Panfilia" },
  },
  troas: {
    en: { biblicalName: "Troas", modernName: "Near Dalyan, Turkey", region: "Mysia" },
    es: { biblicalName: "Troas", modernName: "Cerca de Dalyan, Turquía", region: "Misia" },
  },
  philippi: {
    en: { biblicalName: "Philippi", modernName: "Near Kavala, Greece", region: "Macedonia" },
    es: { biblicalName: "Filipos", modernName: "Cerca de Kavala, Grecia", region: "Macedonia" },
  },
  thessalonica: {
    en: { biblicalName: "Thessalonica", modernName: "Thessaloniki, Greece", region: "Macedonia" },
    es: { biblicalName: "Tesalónica", modernName: "Salónica, Grecia", region: "Macedonia" },
  },
  berea: {
    en: { biblicalName: "Berea", modernName: "Veria, Greece", region: "Macedonia" },
    es: { biblicalName: "Berea", modernName: "Vería, Grecia", region: "Macedonia" },
  },
  athens: {
    en: { biblicalName: "Athens", modernName: "Athens, Greece", region: "Achaia" },
    es: { biblicalName: "Atenas", modernName: "Atenas, Grecia", region: "Acaya" },
  },
  corinth: {
    en: { biblicalName: "Corinth", modernName: "Ancient Corinth, Greece", region: "Achaia" },
    es: { biblicalName: "Corinto", modernName: "Corinto Antiguo, Grecia", region: "Acaya" },
  },
  cenchreae: {
    en: { biblicalName: "Cenchreae", modernName: "Kechries, Greece", region: "Achaia" },
    es: { biblicalName: "Cencrea", modernName: "Kechries, Grecia", region: "Acaya" },
  },
  ephesus: {
    en: { biblicalName: "Ephesus", modernName: "Near Selçuk, Turkey", region: "Asia" },
    es: { biblicalName: "Éfeso", modernName: "Cerca de Selçuk, Turquía", region: "Asia" },
  },
  caesarea: {
    en: { biblicalName: "Caesarea Maritima", modernName: "Caesarea, Israel", region: "Judea" },
    es: { biblicalName: "Cesarea Marítima", modernName: "Cesarea, Israel", region: "Judea" },
  },
  jerusalem: {
    en: { biblicalName: "Jerusalem", modernName: "Jerusalem, Israel", region: "Judea" },
    es: { biblicalName: "Jerusalén", modernName: "Jerusalén, Israel", region: "Judea" },
  },
  "galatia-phrygia": {
    en: { biblicalName: "Galatia & Phrygia", modernName: "Central Turkey", region: "Asia Minor" },
    es: { biblicalName: "Galacia y Frigia", modernName: "Turquía Central", region: "Asia Menor" },
  },
  "macedonia-region": {
    en: { biblicalName: "Macedonia", modernName: "Northern Greece", region: "Macedonia" },
    es: { biblicalName: "Macedonia", modernName: "Norte de Grecia", region: "Macedonia" },
  },
  assos: {
    en: { biblicalName: "Assos", modernName: "Behramkale, Turkey", region: "Mysia" },
    es: { biblicalName: "Asón", modernName: "Behramkale, Turquía", region: "Misia" },
  },
  mitylene: {
    en: { biblicalName: "Mitylene", modernName: "Mytilene, Lesbos, Greece", region: "Aegean Islands" },
    es: { biblicalName: "Mitilene", modernName: "Mitilene, Lesbos, Grecia", region: "Islas del Egeo" },
  },
  miletus: {
    en: { biblicalName: "Miletus", modernName: "Near Balat, Turkey", region: "Asia" },
    es: { biblicalName: "Mileto", modernName: "Cerca de Balat, Turquía", region: "Asia" },
  },
  cos: {
    en: { biblicalName: "Cos", modernName: "Kos, Greece", region: "Aegean Islands" },
    es: { biblicalName: "Cos", modernName: "Cos, Grecia", region: "Islas del Egeo" },
  },
  rhodes: {
    en: { biblicalName: "Rhodes", modernName: "Rhodes, Greece", region: "Aegean Islands" },
    es: { biblicalName: "Rodas", modernName: "Rodas, Grecia", region: "Islas del Egeo" },
  },
  patara: {
    en: { biblicalName: "Patara", modernName: "Gelemiş, Turkey", region: "Lycia" },
    es: { biblicalName: "Pátara", modernName: "Gelemiş, Turquía", region: "Licia" },
  },
  tyre: {
    en: { biblicalName: "Tyre", modernName: "Tyre (Sour), Lebanon", region: "Phoenicia" },
    es: { biblicalName: "Tiro", modernName: "Tiro (Sour), Líbano", region: "Fenicia" },
  },
  ptolemais: {
    en: { biblicalName: "Ptolemais", modernName: "Acre (Akko), Israel", region: "Phoenicia" },
    es: { biblicalName: "Tolemaida", modernName: "Acre (Akko), Israel", region: "Fenicia" },
  },
  sidon: {
    en: { biblicalName: "Sidon", modernName: "Sidon (Saida), Lebanon", region: "Phoenicia" },
    es: { biblicalName: "Sidón", modernName: "Sidón (Saida), Líbano", region: "Fenicia" },
  },
  myra: {
    en: { biblicalName: "Myra", modernName: "Demre, Turkey", region: "Lycia" },
    es: { biblicalName: "Mira", modernName: "Demre, Turquía", region: "Licia" },
  },
  cnidus: {
    en: { biblicalName: "Cnidus", modernName: "Datça Peninsula, Turkey", region: "Asia" },
    es: { biblicalName: "Gnido", modernName: "Península de Datça, Turquía", region: "Asia" },
  },
  "fair-havens": {
    en: { biblicalName: "Fair Havens (Kaloi Limenes)", modernName: "Kaloi Limenes, Crete, Greece", region: "Crete" },
    es: { biblicalName: "Buenos Puertos (Kaloi Limenes)", modernName: "Kaloi Limenes, Creta, Grecia", region: "Creta" },
  },
  malta: {
    en: { biblicalName: "Malta (Melita)", modernName: "Malta", region: "Mediterranean" },
    es: { biblicalName: "Malta (Melita)", modernName: "Malta", region: "Mediterráneo" },
  },
  syracuse: {
    en: { biblicalName: "Syracuse", modernName: "Syracuse, Sicily, Italy", region: "Sicily" },
    es: { biblicalName: "Siracusa", modernName: "Siracusa, Sicilia, Italia", region: "Sicilia" },
  },
  rhegium: {
    en: { biblicalName: "Rhegium", modernName: "Reggio Calabria, Italy", region: "Italy" },
    es: { biblicalName: "Regio", modernName: "Reggio Calabria, Italia", region: "Italia" },
  },
  puteoli: {
    en: { biblicalName: "Puteoli", modernName: "Pozzuoli, Italy", region: "Italy" },
    es: { biblicalName: "Poteoli", modernName: "Pozzuoli, Italia", region: "Italia" },
  },
  rome: {
    en: { biblicalName: "Rome", modernName: "Rome, Italy", region: "Italy" },
    es: { biblicalName: "Roma", modernName: "Roma, Italia", region: "Italia" },
  },
};

/**
 * Get a translated field from a city's name/location data.
 * @param {string} cityId - City ID from data.js (e.g. "antioch-syria")
 * @param {string} field  - "biblicalName" | "modernName" | "region"
 */
export function cityText(cityId, field) {
  const entry = cityTranslations[cityId];
  if (!entry) return "";
  const localized = entry[lang] ?? entry["en"];
  return localized[field] ?? entry["en"][field] ?? "";
}

// ─────────────────────────────────────────────────────────────
// EVENT TRANSLATIONS
// All Spanish Bible quotes use Reina-Valera 1960 (RVR1960)
// Keys: journey number (integer) maps to { action, description, quote }
// ─────────────────────────────────────────────────────────────
const eventTranslations = {
  "antioch-syria": {
    1: {
      action: "Partida",
      description:
        "El Espíritu Santo apartó a Pablo y Bernabé para la obra misionera mientras la iglesia ayunaba y oraba. Los ancianos les impusieron las manos y los enviaron.",
      quote:
        '"Ministrando éstos al Señor, y ayunando, dijo el Espíritu Santo: Apartadme a Bernabé y a Saulo para la obra a que los he llamado."',
    },
    2: {
      action: "Partida",
      description:
        "Después del Concilio de Jerusalén, Pablo propuso visitar de nuevo las iglesias. Eligió a Silas tras discrepar con Bernabé sobre Juan Marcos.",
      quote:
        '"Y Pablo dijo a Bernabé: Volvamos a visitar a los hermanos en todas las ciudades en que hemos anunciado la palabra del Señor."',
    },
    3: {
      action: "Partida",
      description:
        "Después de pasar algún tiempo en Antioquía, Pablo emprendió de nuevo el viaje para fortalecer a todos los discípulos por toda Galacia y Frigia.",
      quote:
        '"Después de estar allí algún tiempo, salió, recorriendo por orden la región de Galacia y de Frigia, afirmando a todos los discípulos."',
    },
  },

  seleucia: {
    1: {
      action: "Tránsito",
      description:
        "Pablo y Bernabé descendieron a Seleucia, el puerto de Antioquía, y desde allí navegaron a la isla de Chipre.",
      quote:
        '"Ellos, entonces, enviados por el Espíritu Santo, descendieron a Seleucia, y de allí navegaron a Chipre."',
    },
  },

  salamis: {
    1: {
      action: "Predicación",
      description:
        "Al llegar a Chipre, Pablo y Bernabé proclamaron la palabra de Dios en las sinagogas de los judíos en Salamina. Juan Marcos les ayudaba.",
      quote:
        '"Y llegados a Salamina, anunciaban la palabra de Dios en las sinagogas de los judíos. Tenían también a Juan de ayudante."',
    },
  },

  paphos: {
    1: {
      action: "Confrontación y Conversión",
      description:
        "Pablo confrontó al hechicero Barjesús (Elimas) y lo dejó ciego. El procónsul Sergio Paulo creyó, maravillado ante la enseñanza del Señor.",
      quote:
        '"Entonces el procónsul, viendo lo que había acontecido, creyó, maravillado de la doctrina del Señor."',
    },
  },

  perga: {
    1: {
      action: "Juan Marcos Parte",
      description:
        "Desde Pafos, la compañía de Pablo navegó a Perge de Panfilia. Aquí Juan Marcos los abandonó y regresó a Jerusalén, decisión que más tarde causó una aguda discusión entre Pablo y Bernabé.",
      quote:
        '"Pero Pablo y sus compañeros se hicieron a la mar desde Pafos, y llegaron a Perge de Panfilia; pero Juan, apartándose de ellos, volvió a Jerusalén."',
    },
  },

  "antioch-pisidia": {
    1: {
      action: "Gran Sermón y Vuelta a los Gentiles",
      description:
        "Pablo predicó un poderoso sermón en la sinagoga, trazando la historia de Israel hasta Jesús. Cuando los judíos rechazaron el mensaje, Pablo y Bernabé declararon valientemente que se volverían a los gentiles. Muchos creyeron.",
      quote:
        '"A vosotros a la verdad era necesario que se os hablase primero la palabra de Dios; mas puesto que la desecháis... he aquí, nos volvemos a los gentiles."',
    },
  },

  iconium: {
    1: {
      action: "Predicación y Persecución",
      description:
        "Pablo y Bernabas hablaron con valentía en la sinagoga de Iconio y creyó un gran número de judíos y griegos. Pero surgió oposición y huyeron a Listra y Derbe.",
      quote:
        '"Y hablaron de tal manera, que creyó una gran multitud de judíos, y asimismo de griegos."',
    },
    2: {
      action: "Revisita",
      description: "Pablo revisitó y fortaleció a los discípulos en Iconio.",
      quote:
        '"Y llegó también a Derbe y a Listra..."',
    },
  },

  lystra: {
    1: {
      action: "Sanidad, Adoración y Apedreamiento",
      description:
        "Pablo sanó a un hombre lisiado de nacimiento. La multitud intentó adorarlos como Zeus y Hermes. Luego, judíos de Antioquía e Iconio incitaron a la multitud: Pablo fue apedreado, arrastrado fuera de la ciudad y dado por muerto. Pero se levantó y entró de nuevo en la ciudad.",
      quote:
        '"Entonces apedrearon a Pablo, y le arrastraron fuera de la ciudad, pensando que estaba muerto. Pero rodeándole los discípulos, se levantó y entró en la ciudad."',
    },
    2: {
      action: "Timoteo Se Une",
      description:
        "Pablo regresó a Listra donde encontró a Timoteo, un joven discípulo bien recomendado por los hermanos. Pablo lo eligió para que le acompañase en el viaje.",
      quote:
        '"Y quiso Pablo que éste fuese con él; y tomándole, le circuncidó por causa de los judíos que había en aquellos lugares."',
    },
  },

  derbe: {
    1: {
      action: "Predicación y Discípulos",
      description:
        "Pablo y Bernabé predicaron el evangelio en Derbe y ganaron a un buen número de discípulos. Desde aquí comenzaron el viaje de regreso, revisitando y fortaleciendo las iglesias.",
      quote:
        '"Y después de anunciar el evangelio a aquella ciudad y de hacer muchos discípulos, volvieron a Listra, a Iconio y a Antioquía."',
    },
    2: {
      action: "Revisita",
      description: "Pablo revisitó Derbe al inicio del segundo viaje.",
      quote:
        '"Después llegó a Derbe y a Listra."',
    },
  },

  attalia: {
    1: {
      action: "Puerto de Regreso",
      description:
        "Pablo y Bernabé descendieron al puerto de Atalia y navegaron de regreso a Antioquía de Siria, completando el primer viaje misionero.",
      quote:
        '"Y de allí navegaron a Antioquía, desde donde habían sido encomendados a la gracia de Dios para la obra que habían cumplido."',
    },
  },

  troas: {
    2: {
      action: "Visión de Macedonia",
      description:
        "En Troas, Pablo recibió la famosa \"Llamada macedónica\": la visión de un hombre de Macedonia que le suplicaba: \"Pasa a Macedonia y ayúdanos.\" Este momento crucial dirigió el evangelio hacia Europa.",
      quote:
        '"Y se le mostró a Pablo una visión de noche: un varón macedonio estaba en pie, rogándole y diciendo: Pasa a Macedonia y ayúdanos."',
    },
    3: {
      action: "Eutico Resucitado",
      description:
        "En su regreso por Troas, Pablo predicó hasta la medianoche. Un joven llamado Eutico cayó desde una ventana del tercer piso y murió, pero Pablo lo resucitó.",
      quote:
        '"Entonces descendió Pablo y se echó sobre él, y abrazándole, dijo: No os alarméis, pues está vivo."',
    },
  },

  philippi: {
    2: {
      action: "Primera Iglesia Europea y Encarcelamiento",
      description:
        "Filipos fue la primera ciudad de Europa donde Pablo predicó. Lidia, una comerciante de púrpura, fue la primera conversa europea. Pablo expulsó un espíritu de una esclava, fue azotado, encarcelado y liberado milagrosamente por un terremoto. El carcelero y su familia fueron bautizados.",
      quote:
        '"Pero a medianoche, orando Pablo y Silas, cantaban himnos a Dios... entonces sobrevino de repente un gran terremoto, de tal manera que los cimientos de la cárcel se sacudían."',
    },
    3: {
      action: "Visita de Regreso",
      description:
        "Pablo navegó desde Filipos después de la fiesta de los Panes sin levadura, en camino de regreso a Jerusalén.",
      quote:
        '"Y nosotros, pasados los días de los panes sin levadura, navegamos de Filipos."',
    },
  },

  thessalonica: {
    2: {
      action: "Iglesia Fundada y Alboroto",
      description:
        "Pablo razonó en la sinagoga por tres sábados, explicando que Jesús es el Mesías. Algunos judíos y muchos griegos temerosos de Dios creyeron. Opositores celosos formaron un tumulto y atacaron la casa de Jasón, acusando a los creyentes de desafiar los edictos del César.",
      quote:
        '"Estos que trastornan el mundo entero también han venido acá... y todos estos contravienen los decretos de César, diciendo que hay otro rey, Jesús."',
    },
    3: {
      action: "Revisita",
      description:
        "Pablo viajó por Macedonia, animando a los creyentes con muchas palabras.",
      quote:
        '"Y recorrió aquellas regiones, y les exhortó con abundancia de palabras."',
    },
  },

  berea: {
    2: {
      action: "Los Nobles Bereanos",
      description:
        "Los bereanos fueron alabados como más nobles que los tesalonicenses porque recibieron el mensaje con entusiasmo y examinaban las Escrituras cada día para verificar la enseñanza de Pablo. Muchos creyeron.",
      quote:
        '"Y éstos eran más nobles que los que estaban en Tesalónica, pues recibieron la palabra con toda solicitud, escudriñando cada día las Escrituras para ver si estas cosas eran así."',
    },
  },

  athens: {
    2: {
      action: "Sermón en el Areópago",
      description:
        "Pablo estaba profundamente perturbado por la idolatría de Atenas. Debatió en la sinagoga y en la plaza, luego predicó su famoso sermón en el Areópago (Marte), comenzando con \"el dios no conocido\" y proclamando al verdadero Creador que resucita a los muertos.",
      quote:
        '"Varones atenienses, en todo observo que sois muy religiosos; porque pasando y mirando vuestros santuarios, hallé también un altar en el cual estaba esta inscripción: AL DIOS NO CONOCIDO. Al que vosotros adoráis, pues, sin conocerle, a éste os anuncio yo."',
    },
  },

  corinth: {
    2: {
      action: "Ministerio de 18 Meses y Epístolas",
      description:
        "Pablo permaneció en Corinto durante 18 meses, viviendo y trabajando con Aquila y Priscila como fabricantes de tiendas. Fue llevado ante el procónsul Galión pero quedó libre. Escribió 1 y 2 Tesalonicenses aquí.",
      quote:
        '"No temas, sino habla, y no calles; porque yo estoy contigo, y ninguno pondrá sobre ti la mano para hacerte mal, porque yo tengo mucho pueblo en esta ciudad."',
    },
    3: {
      action: "Estancia de Tres Meses",
      description:
        "Pablo pasó tres meses en Grecia (Corinto), probablemente escribiendo la Epístola a los Romanos durante este tiempo, su obra teológica más sistemática.",
      quote:
        '"Después de recorrer aquellas regiones, y de exhortarles con abundantes palabras, llegó a Grecia. Después de haber estado allí tres meses."',
    },
  },

  cenchreae: {
    2: {
      action: "Voto y Partida",
      description:
        "Antes de navegar a Éfeso, Pablo se rapó la cabeza en Cencrea a causa de un voto que había hecho.",
      quote:
        '"Habiéndose rapado la cabeza en Cencrea, porque tenía hecho un voto."',
    },
  },

  ephesus: {
    2: {
      action: "Breve Visita",
      description:
        "Pablo hizo una breve escala en Éfeso, razonando en la sinagoga. Los judíos le pidieron que se quedara más tiempo, pero él se negó, prometiendo regresar.",
      quote:
        '"Y llegó a Éfeso, y los dejó allí; y entrando en la sinagoga, discutió con los judíos."',
    },
    3: {
      action: "Ministerio Principal (3 Años)",
      description:
        "Pablo pasó casi tres años en Éfeso, su estancia más larga en cualquier ciudad. Enseñó en la escuela de Tiranno, realizó milagros extraordinarios y provocó un alboroto liderado por el platero Demetrio, quien temía por el comercio de ídolos de Artemisa. Pablo escribió 1 Corintios aquí.",
      quote:
        '"Y hacía Dios milagros extraordinarios por mano de Pablo, de tal manera que aun se llevaban a los enfermos los paños o delantales de su cuerpo, y las enfermedades se iban de ellos."',
    },
  },

  caesarea: {
    2: {
      action: "Regreso",
      description:
        "Pablo desembarcó en Cesarea, subió y saludó a la iglesia (probablemente en Jerusalén) y luego bajó a Antioquía.",
      quote:
        '"Y habiendo llegado a Cesarea, subió para saludar a la iglesia, y luego descendió a Antioquía."',
    },
    3: {
      action: "Profecía de Agabo",
      description:
        "Pablo se hospedó con Felipe el evangelista. El profeta Agabo ató sus propias manos y pies con el cinto de Pablo, profetizando el arresto de Pablo en Jerusalén. A pesar de las súplicas, Pablo declaró que estaba listo para morir por el Señor.",
      quote:
        '"¿Qué hacéis llorando y quebrantándome el corazón? Porque yo estoy dispuesto no sólo a ser atado, mas aun a morir en Jerusalén por el nombre del Señor Jesús."',
    },
    4: {
      action: "Juicio y Partida",
      description:
        "Después de dos años preso en Cesarea, Pablo apeló al César. Fue entregado a la custodia de un centurión llamado Julio y zarpó desde Cesarea hacia Roma.",
      quote:
        '"Y como se decidió que habíamos de navegar para Italia, entregaron a Pablo y a algunos otros presos a un centurión llamado Julio."',
    },
  },

  jerusalem: {
    2: {
      action: "Informe a la Iglesia",
      description:
        "Pablo subió a Jerusalén para saludar a la iglesia antes de regresar a Antioquía.",
      quote:
        '"Y habiendo llegado a Cesarea, subió para saludar a la iglesia."',
    },
    3: {
      action: "Arresto en el Templo",
      description:
        "Pablo llegó a Jerusalén y se reunió con Jacobo y los ancianos. Mientras completaba un rito de purificación en el Templo, judíos de Asia lo acusaron de profanar el Templo. Una turba lo apresó y soldados romanos lo rescataron. Así comenzó la larga prisión de Pablo.",
      quote:
        '"Se alborotó toda la ciudad, y se agolpó el pueblo; y apoderándose de Pablo, le arrastraron fuera del templo, e inmediatamente las puertas fueron cerradas."',
    },
  },

  "galatia-phrygia": {
    3: {
      action: "Fortaleciendo a los Discípulos",
      description:
        "Pablo viajó por Galacia y Frigia, fortaleciendo a todos los discípulos.",
      quote:
        '"Recorriendo por orden la región de Galacia y de Frigia, afirmando a todos los discípulos."',
    },
  },

  "macedonia-region": {
    3: {
      action: "Animando a las Iglesias",
      description:
        "Después del alboroto en Éfeso, Pablo viajó por Macedonia animando a los creyentes con muchas palabras. Probablemente escribió 2 Corintios durante este tiempo.",
      quote:
        '"Después que cesó el alboroto, llamó Pablo a los discípulos, y habiéndoles exhortado y abrazado, salió para ir a Macedonia."',
    },
  },

  assos: {
    3: {
      action: "Pablo Camina por Tierra",
      description:
        "Mientras sus compañeros navegaban adelante, Pablo eligió ir a pie desde Troas hasta Asón, posiblemente para dedicar tiempo a la oración y la reflexión.",
      quote:
        '"Nosotros, adelantándonos a embarcarnos, navegamos a Asón para recoger allí a Pablo, ya que así lo había determinado, queriendo ir por tierra."',
    },
  },

  mitylene: {
    3: {
      action: "Escala Nocturna",
      description:
        "Pablo y sus compañeros navegaron desde Asón hasta Mitilene, en la isla de Lesbos.",
      quote:
        '"Cuando se reunió con nosotros en Asón, tomándole a bordo, vinimos a Mitilene."',
    },
  },

  miletus: {
    3: {
      action: "Despedida a los Ancianos de Éfeso",
      description:
        "Pablo pasó de largo por Éfeso para no perder tiempo, pero llamó a los ancianos efesios a Mileto. Les dirigió un emotivo discurso de despedida, advirtiendo de \"lobos feroces\" y encomendiéndolos a la gracia de Dios. Todos lloraron, abrazándolo y besándolo.",
      quote:
        '"Por tanto, mirad por vosotros, y por todo el rebaño en que el Espíritu Santo os ha puesto por obispos, para apacentar la iglesia del Señor, la cual él ganó por su propia sangre."',
    },
  },

  cos: {
    3: {
      action: "Parada en la Ruta",
      description:
        "El barco de Pablo hizo escala en la isla de Cos en el viaje hacia Jerusalén.",
      quote:
        '"Cuando nos separamos de ellos, vinimos con rumbo directo a Cos, al día siguiente a Rodas, y de allí a Pátara."',
    },
  },

  rhodes: {
    3: {
      action: "Parada en la Ruta",
      description: "El barco continuó desde Cos hasta Rodas.",
      quote:
        '"Al día siguiente llegamos a Rodas, y de allí a Pátara."',
    },
  },

  patara: {
    3: {
      action: "Cambio de Barco",
      description:
        "En Pátara, Pablo encontró un barco que cruzaba hacia Fenicia y subió a bordo.",
      quote:
        '"Y hallando un barco que pasaba a Fenicia, nos embarcamos, y zarpamos."',
    },
  },

  tyre: {
    3: {
      action: "Siete Días con los Discípulos",
      description:
        "Pablo permaneció siete días con los discípulos en Tiro. Por el Espíritu, le rogaban que no fuera a Jerusalén. Al partir, toda la comunidad se arrodilló en la playa para orar.",
      quote:
        '"Y puestos de rodillas en la playa, oramos. Y abrazándonos los unos a los otros, subimos al barco, y ellos se volvieron a sus casas."',
    },
  },

  ptolemais: {
    3: {
      action: "Breve Estancia",
      description:
        "Pablo saludó a los hermanos en Tolemaida y se quedó con ellos un día.",
      quote:
        '"Y nosotros, acabada la navegación, desde Tiro llegamos a Tolemaida; y habiendo saludado a los hermanos, nos quedamos con ellos un día."',
    },
  },

  sidon: {
    4: {
      action: "La Bondad de Julio",
      description:
        "El centurión Julio trató a Pablo con bondad, permitiéndole visitar a sus amigos en Sidón para que fueran atendidas sus necesidades.",
      quote:
        '"Y al otro día llegamos a Sidón; y Julio, tratando a Pablo con humanidad, le permitió que fuese a los amigos, para ser atendido por ellos."',
    },
  },

  myra: {
    4: {
      action: "Traslado de Barco",
      description:
        "En Mira, el centurión encontró un barco alejandrino que navegaba hacia Italia y los puso a bordo.",
      quote:
        '"Y hallando allí el centurión un barco alejandrino que navegaba a Italia, nos embarcó en él."',
    },
  },

  cnidus: {
    4: {
      action: "Navegación Difícil",
      description:
        "El viento les impidió llegar a Gnido, así que navegaron al sur hacia Creta.",
      quote:
        '"Y navegando lentamente muchos días, y llegando a duras penas frente a Gnido, porque el viento no nos dejaba avanzar, navegamos a sotavento de Creta."',
    },
  },

  "fair-havens": {
    4: {
      action: "Advertencia de Pablo Ignorada",
      description:
        "Pablo advirtió que el viaje sería desastroso, pero el centurión siguió el consejo del piloto y del dueño del barco de seguir navegando. Esta decisión condujo a la catastrófica tormenta.",
      quote:
        '"Varones, veo que la navegación va a ser con perjuicio y mucha pérdida, no sólo del cargamento y del barco, sino también de nuestras personas."',
    },
  },

  malta: {
    4: {
      action: "Naufragio, Víbora y Sanidades",
      description:
        "Después de 14 días en una terrible tormenta, el barco encalló y se rompió. Las 276 personas llegaron a tierra sanas y salvas, tal como Pablo había prometido. En la isla, una víbora mordió la mano de Pablo: los isleños esperaban que muriera, pero no sufrió daño alguno. Pablo sanó al padre del principal de la isla y a muchos otros.",
      quote:
        '"Pero Pablo, sacudiendo la serpiente en el fuego, ningún daño padeció... Y teniendo los isleños que Pablo había de inflamarse, o caer muerto de repente; mas habiendo esperado mucho, y viendo que ningún mal le venía, cambiaron de parecer."',
    },
  },

  syracuse: {
    4: {
      action: "Parada de Tres Días",
      description:
        "Después de invernar en Malta, navegaron en un barco alejandrino hasta Siracusa, donde permanecieron tres días.",
      quote:
        '"Y llegados a Siracusa, estuvimos allí tres días."',
    },
  },

  rhegium: {
    4: {
      action: "Última Parada Marítima",
      description:
        "Desde Siracusa, el barco de Pablo navegó hasta Regio. Sopló un viento del sur y llegaron a Poteoli al día siguiente.",
      quote:
        '"De donde dando la vuelta, llegamos a Regio; y otro día después, soplando el viento sur, llegamos al segundo día a Poteoli."',
    },
  },

  puteoli: {
    4: {
      action: "Hermanos Hallados en Italia",
      description:
        "Pablo encontró creyentes en Poteoli y fue invitado a quedarse una semana con ellos, evidencia de que el evangelio ya había llegado a Italia. Luego continuaron viaje a Roma.",
      quote:
        '"Donde habiendo hallado hermanos, nos rogaron que nos quedásemos con ellos siete días; y luego fuimos a Roma."',
    },
  },

  rome: {
    4: {
      action: "Arresto Domiciliario y Predicación",
      description:
        "Pablo llegó finalmente a Roma, la capital del Imperio. Los hermanos salieron a recibirlo al Foro de Apio y a Tres Tabernas. Le fue permitido vivir solo con un soldado que lo custodiaba. Durante dos años enteros, Pablo recibió a todos los que venían y proclamaba el reino de Dios y enseñaba acerca del Señor Jesucristo con toda valentía y sin impedimento.",
      quote:
        '"Y Pablo permaneció dos años enteros en una casa alquilada, y recibía a todos los que a él venían, predicando el reino de Dios y enseñando acerca del Señor Jesucristo, abiertamente y sin impedimento."',
    },
  },
};

/**
 * Get a translated field from a city event.
 * @param {string} cityId   - City ID (e.g. "antioch-syria")
 * @param {number} journeyId - Journey number (1–4)
 * @param {string} field    - "action" | "description" | "quote"
 */
export function eventText(cityId, journeyId, field) {
  if (lang === "en") return null; // caller uses original data.js values
  const city = eventTranslations[cityId];
  if (!city) return null;
  const event = city[journeyId];
  if (!event) return null;
  return event[field] ?? null;
}

// ─────────────────────────────────────────────────────────────
// VERSE DISPLAY HELPERS
// ─────────────────────────────────────────────────────────────

/**
 * Convert an English verse reference string to Spanish if lang === "es".
 * Handles patterns like "Acts 13:1-3", "Acts 27–28", "Mark 16:15".
 * @param {string} verse - e.g. "Acts 13:4"
 * @returns {string}
 */
export function displayVerse(verse) {
  if (!verse) return "";
  if (lang !== "es") return verse;
  return verse.replace(/\bActs\b/g, "Hechos")
              .replace(/\bMark\b/g, "Marcos")
              .replace(/\bRomans\b/g, "Romanos")
              .replace(/\bGenesis\b/g, "Génesis")
              .replace(/\bExodus\b/g, "Éxodo")
              .replace(/\bIsaiah\b/g, "Isaías")
              .replace(/\bJeremiah\b/g, "Jeremías")
              .replace(/\bPsalms?\b/g, "Salmos")
              .replace(/\bProverbs\b/g, "Proverbios")
              .replace(/\bMatthew\b/g, "Mateo")
              .replace(/\bLuke\b/g, "Lucas")
              .replace(/\bJohn\b/g, "Juan")
              .replace(/\bGalatians\b/g, "Gálatas")
              .replace(/\bEphesians\b/g, "Efesios")
              .replace(/\bPhilippians\b/g, "Filipenses")
              .replace(/\bColossians\b/g, "Colosenses")
              .replace(/\bPhilemon\b/g, "Filemón")
              .replace(/\bHebrews\b/g, "Hebreos")
              .replace(/\bRevelation\b/g, "Apocalipsis")
              .replace(/\b1\s*Corinthians\b/g, "1 Corintios")
              .replace(/\b2\s*Corinthians\b/g, "2 Corintios")
              .replace(/\b1\s*Thessalonians\b/g, "1 Tesalonicenses")
              .replace(/\b2\s*Thessalonians\b/g, "2 Tesalonicenses")
              .replace(/\b1\s*Timothy\b/g, "1 Timoteo")
              .replace(/\b2\s*Timothy\b/g, "2 Timoteo")
              .replace(/\b1\s*Peter\b/g, "1 Pedro")
              .replace(/\b2\s*Peter\b/g, "2 Pedro")
              .replace(/\b1\s*John\b/g, "1 Juan")
              .replace(/\b2\s*John\b/g, "2 Juan")
              .replace(/\b3\s*John\b/g, "3 Juan");
}

/**
 * Convert "Acts X" chapter string to "Hechos X" if lang === "es".
 * @param {string} chapter - e.g. "Acts 13–14"
 * @returns {string}
 */
export function displayChapter(chapter) {
  return displayVerse(chapter);
}
