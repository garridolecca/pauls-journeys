/**
 * Paul's Missionary Journeys — Comprehensive Data
 * All coordinates in [longitude, latitude] (ArcGIS standard)
 * Scripture references from Acts and Pauline Epistles
 */

export const journeys = [
  {
    id: 1,
    name: "First Missionary Journey",
    shortName: "Journey 1",
    dateRange: "AD 46–48",
    chapters: "Acts 13–14",
    color: [201, 168, 76],
    hexColor: "#C9A84C",
    description:
      "Paul and Barnabas, commissioned by the church in Antioch, travel to Cyprus and southern Galatia, preaching in synagogues and establishing churches among Jews and Gentiles alike.",
    companions: ["Barnabas", "John Mark (until Perga)"],
    keyTheme: "The Gospel opens to the Gentiles",
    epistle: null,
  },
  {
    id: 2,
    name: "Second Missionary Journey",
    shortName: "Journey 2",
    dateRange: "AD 49–52",
    chapters: "Acts 15:36–18:22",
    color: [138, 79, 125],
    hexColor: "#8A4F7D",
    description:
      "Paul, now with Silas, revisits churches in Asia Minor, then crosses into Europe for the first time — planting churches in Philippi, Thessalonica, and Corinth.",
    companions: ["Silas", "Timothy (from Lystra)", "Luke (from Troas)"],
    keyTheme: "The Gospel reaches Europe",
    epistle: "1 & 2 Thessalonians (from Corinth)",
  },
  {
    id: 3,
    name: "Third Missionary Journey",
    shortName: "Journey 3",
    dateRange: "AD 53–57",
    chapters: "Acts 18:23–21:17",
    color: [86, 130, 89],
    hexColor: "#568259",
    description:
      "Paul spends nearly three years in Ephesus, writes major epistles, revisits churches in Macedonia and Greece, and makes his final journey to Jerusalem.",
    companions: ["Timothy", "Erastus", "Titus", "Luke", "Aristarchus"],
    keyTheme: "Strengthening the churches & major epistles",
    epistle: "1 Corinthians, 2 Corinthians, Galatians, Romans",
  },
  {
    id: 4,
    name: "Journey to Rome",
    shortName: "To Rome",
    dateRange: "AD 59–60",
    chapters: "Acts 27–28",
    color: [163, 75, 75],
    hexColor: "#A34B4B",
    description:
      "As a prisoner appealing to Caesar, Paul endures a dramatic shipwreck on Malta before finally reaching Rome, where he preaches under house arrest for two years.",
    companions: ["Luke", "Aristarchus"],
    keyTheme: "The Gospel reaches the heart of the Empire",
    epistle: "Ephesians, Philippians, Colossians, Philemon (Prison Epistles)",
  },
];

export const cities = [
  // ===== JOURNEY 1 CITIES =====
  {
    id: "antioch-syria",
    biblicalName: "Antioch in Syria",
    modernName: "Antakya, Turkey",
    region: "Syria",
    lat: 36.2,
    lng: 36.16,
    significance: "major",
    journeys: [1, 2, 3],
    events: [
      {
        journey: 1,
        order: 1,
        action: "Departure",
        description:
          "The Holy Spirit set apart Paul and Barnabas for missionary work while the church fasted and prayed. The elders laid hands on them and sent them off.",
        verse: "Acts 13:1-3",
        book: "Acts",
        chapter: 13,
        verseStart: 1,
        verseEnd: 3,
        quote:
          '"While they were worshiping the Lord and fasting, the Holy Spirit said, \'Set apart for me Barnabas and Saul for the work to which I have called them.\'"',
      },
      {
        journey: 2,
        order: 1,
        action: "Departure",
        description:
          "After the Jerusalem Council, Paul proposed revisiting the churches. He chose Silas after disagreeing with Barnabas over John Mark.",
        verse: "Acts 15:35-41",
        book: "Acts",
        chapter: 15,
        verseStart: 35,
        verseEnd: 41,
        quote:
          '"Paul said to Barnabas, \'Let us go back and visit the believers in all the towns where we preached the word of the Lord.\'"',
      },
      {
        journey: 3,
        order: 1,
        action: "Departure",
        description:
          "After spending some time in Antioch, Paul set out again to strengthen all the disciples throughout Galatia and Phrygia.",
        verse: "Acts 18:22-23",
        book: "Acts",
        chapter: 18,
        verseStart: 22,
        verseEnd: 23,
        quote:
          '"After spending some time in Antioch, Paul set out from there and traveled from place to place throughout the region of Galatia and Phrygia, strengthening all the disciples."',
      },
    ],
  },
  {
    id: "seleucia",
    biblicalName: "Seleucia Pieria",
    modernName: "Samandağ, Turkey",
    region: "Syria",
    lat: 36.1,
    lng: 35.94,
    significance: "minor",
    journeys: [1],
    events: [
      {
        journey: 1,
        order: 2,
        action: "Transit",
        description:
          "Paul and Barnabas went down to Seleucia, the port city of Antioch, and sailed from there to the island of Cyprus.",
        verse: "Acts 13:4",
        book: "Acts",
        chapter: 13,
        verseStart: 4,
        verseEnd: 4,
        quote:
          '"The two of them, sent on their way by the Holy Spirit, went down to Seleucia and sailed from there to Cyprus."',
      },
    ],
  },
  {
    id: "salamis",
    biblicalName: "Salamis",
    modernName: "Near Famagusta, Cyprus",
    region: "Cyprus",
    lat: 35.18,
    lng: 33.9,
    significance: "moderate",
    journeys: [1],
    events: [
      {
        journey: 1,
        order: 3,
        action: "Preaching",
        description:
          "Arriving in Cyprus, Paul and Barnabas proclaimed the word of God in the Jewish synagogues of Salamis. John Mark assisted them.",
        verse: "Acts 13:5",
        book: "Acts",
        chapter: 13,
        verseStart: 5,
        verseEnd: 5,
        quote:
          '"When they arrived at Salamis, they proclaimed the word of God in the Jewish synagogues. John was with them as their helper."',
      },
    ],
  },
  {
    id: "paphos",
    biblicalName: "Paphos",
    modernName: "Paphos, Cyprus",
    region: "Cyprus",
    lat: 34.76,
    lng: 32.42,
    significance: "major",
    journeys: [1],
    events: [
      {
        journey: 1,
        order: 4,
        action: "Confrontation & Conversion",
        description:
          "Paul confronted the sorcerer Bar-Jesus (Elymas) and struck him blind. The proconsul Sergius Paulus believed, astonished at the teaching of the Lord.",
        verse: "Acts 13:6-12",
        book: "Acts",
        chapter: 13,
        verseStart: 6,
        verseEnd: 12,
        quote:
          '"Then the proconsul believed, for he was amazed at the teaching about the Lord."',
      },
    ],
  },
  {
    id: "perga",
    biblicalName: "Perga in Pamphylia",
    modernName: "Near Antalya, Turkey",
    region: "Pamphylia",
    lat: 36.96,
    lng: 30.85,
    significance: "moderate",
    journeys: [1],
    events: [
      {
        journey: 1,
        order: 5,
        action: "John Mark Departs",
        description:
          "From Paphos, Paul's company sailed to Perga in Pamphylia. Here John Mark left them and returned to Jerusalem — a decision that later caused a sharp disagreement between Paul and Barnabas.",
        verse: "Acts 13:13",
        book: "Acts",
        chapter: 13,
        verseStart: 13,
        verseEnd: 13,
        quote:
          '"From Paphos, Paul and his companions sailed to Perga in Pamphylia, where John left them to return to Jerusalem."',
      },
    ],
  },
  {
    id: "antioch-pisidia",
    biblicalName: "Antioch in Pisidia",
    modernName: "Yalvaç, Turkey",
    region: "Galatia",
    lat: 38.29,
    lng: 31.18,
    significance: "major",
    journeys: [1],
    events: [
      {
        journey: 1,
        order: 6,
        action: "Major Sermon & Turning to Gentiles",
        description:
          "Paul delivered a powerful sermon in the synagogue tracing Israel's history to Jesus. When Jews rejected the message, Paul and Barnabas boldly declared they would turn to the Gentiles. Many believed.",
        verse: "Acts 13:14-52",
        book: "Acts",
        chapter: 13,
        verseStart: 14,
        verseEnd: 52,
        quote:
          '"We had to speak the word of God to you first. Since you reject it... we now turn to the Gentiles."',
      },
    ],
  },
  {
    id: "iconium",
    biblicalName: "Iconium",
    modernName: "Konya, Turkey",
    region: "Galatia",
    lat: 37.87,
    lng: 32.49,
    significance: "moderate",
    journeys: [1, 2],
    events: [
      {
        journey: 1,
        order: 7,
        action: "Preaching & Persecution",
        description:
          "Paul and Barnabas spoke boldly in Iconium's synagogue and a great number of Jews and Greeks believed. But opposition arose and they fled to Lystra and Derbe.",
        verse: "Acts 14:1-5",
        book: "Acts",
        chapter: 14,
        verseStart: 1,
        verseEnd: 5,
        quote:
          '"They spoke so effectively that a great number of Jews and Greeks believed."',
      },
      {
        journey: 2,
        order: 3,
        action: "Revisit",
        description: "Paul revisited and strengthened the disciples in Iconium.",
        verse: "Acts 16:1-2",
        book: "Acts",
        chapter: 16,
        verseStart: 1,
        verseEnd: 2,
        quote: '"Paul came to Derbe and then to Lystra..."',
      },
    ],
  },
  {
    id: "lystra",
    biblicalName: "Lystra",
    modernName: "Hatunsaray, Turkey",
    region: "Galatia",
    lat: 37.57,
    lng: 32.36,
    significance: "major",
    journeys: [1, 2],
    events: [
      {
        journey: 1,
        order: 8,
        action: "Healing, Worship & Stoning",
        description:
          'Paul healed a man crippled from birth. The crowds tried to worship them as Zeus and Hermes. Later, Jews from Antioch and Iconium stirred the crowd — Paul was stoned, dragged outside the city, and left for dead. But he rose and went back into the city.',
        verse: "Acts 14:6-20",
        book: "Acts",
        chapter: 14,
        verseStart: 6,
        verseEnd: 20,
        quote:
          '"They stoned Paul and dragged him outside the city, thinking he was dead. But after the disciples had gathered around him, he got up and went back into the city."',
      },
      {
        journey: 2,
        order: 2,
        action: "Timothy Joins",
        description:
          "Paul returned to Lystra where he met Timothy, a young disciple well spoken of by the believers. Paul chose Timothy to accompany him on the journey.",
        verse: "Acts 16:1-3",
        book: "Acts",
        chapter: 16,
        verseStart: 1,
        verseEnd: 3,
        quote:
          '"Paul wanted to take him along on the journey, so he circumcised him because of the Jews who lived in that area."',
      },
    ],
  },
  {
    id: "derbe",
    biblicalName: "Derbe",
    modernName: "Kerti Höyük, Turkey",
    region: "Galatia",
    lat: 37.36,
    lng: 33.39,
    significance: "moderate",
    journeys: [1, 2],
    events: [
      {
        journey: 1,
        order: 9,
        action: "Preaching & Disciples",
        description:
          "Paul and Barnabas preached the gospel in Derbe and won a large number of disciples. From here they began the return journey, revisiting and strengthening the churches.",
        verse: "Acts 14:20-21",
        book: "Acts",
        chapter: 14,
        verseStart: 20,
        verseEnd: 21,
        quote:
          '"They preached the gospel in that city and won a large number of disciples."',
      },
      {
        journey: 2,
        order: 2,
        action: "Revisit",
        description: "Paul revisited Derbe at the start of the second journey.",
        verse: "Acts 16:1",
        book: "Acts",
        chapter: 16,
        verseStart: 1,
        verseEnd: 1,
        quote: '"Paul came to Derbe and then to Lystra."',
      },
    ],
  },
  {
    id: "attalia",
    biblicalName: "Attalia",
    modernName: "Antalya, Turkey",
    region: "Pamphylia",
    lat: 36.88,
    lng: 30.7,
    significance: "minor",
    journeys: [1],
    events: [
      {
        journey: 1,
        order: 10,
        action: "Return Port",
        description:
          "Paul and Barnabas went down to the port of Attalia and sailed back to Antioch in Syria, completing the first missionary journey.",
        verse: "Acts 14:25-26",
        book: "Acts",
        chapter: 14,
        verseStart: 25,
        verseEnd: 26,
        quote:
          '"They went down to Attalia and sailed back to Antioch, where they had been committed to the grace of God."',
      },
    ],
  },

  // ===== JOURNEY 2 CITIES =====
  {
    id: "troas",
    biblicalName: "Troas",
    modernName: "Near Dalyan, Turkey",
    region: "Mysia",
    lat: 39.76,
    lng: 26.14,
    significance: "major",
    journeys: [2, 3],
    events: [
      {
        journey: 2,
        order: 4,
        action: "Macedonian Vision",
        description:
          'At Troas, Paul received the famous "Macedonian Call" — a vision of a man from Macedonia begging, "Come over and help us." This pivotal moment directed the gospel into Europe.',
        verse: "Acts 16:8-10",
        book: "Acts",
        chapter: 16,
        verseStart: 8,
        verseEnd: 10,
        quote:
          '"During the night Paul had a vision of a man of Macedonia standing and begging him, \'Come over to Macedonia and help us.\'"',
      },
      {
        journey: 3,
        order: 8,
        action: "Eutychus Raised",
        description:
          "On his return through Troas, Paul preached until midnight. A young man named Eutychus fell from a third-story window and died, but Paul raised him back to life.",
        verse: "Acts 20:5-12",
        book: "Acts",
        chapter: 20,
        verseStart: 5,
        verseEnd: 12,
        quote:
          '"Paul went down, threw himself on the young man and put his arms around him. \'Don\'t be alarmed,\' he said. \'He\'s alive!\'"',
      },
    ],
  },
  {
    id: "philippi",
    biblicalName: "Philippi",
    modernName: "Near Kavala, Greece",
    region: "Macedonia",
    lat: 41.01,
    lng: 24.29,
    significance: "major",
    journeys: [2, 3],
    events: [
      {
        journey: 2,
        order: 5,
        action: "First European Church & Imprisonment",
        description:
          "Philippi was the first city in Europe where Paul preached. Lydia, a dealer in purple cloth, became the first European convert. Paul cast a spirit from a slave girl, was beaten, imprisoned, and miraculously freed by an earthquake. The jailer and his household were baptized.",
        verse: "Acts 16:12-40",
        book: "Acts",
        chapter: 16,
        verseStart: 12,
        verseEnd: 40,
        quote:
          '"About midnight Paul and Silas were praying and singing hymns to God... Suddenly there was such a violent earthquake that the foundations of the prison were shaken."',
      },
      {
        journey: 3,
        order: 9,
        action: "Return Visit",
        description:
          "Paul sailed from Philippi after the Festival of Unleavened Bread on his way back to Jerusalem.",
        verse: "Acts 20:6",
        book: "Acts",
        chapter: 20,
        verseStart: 6,
        verseEnd: 6,
        quote:
          '"But we sailed from Philippi after the Festival of Unleavened Bread."',
      },
    ],
  },
  {
    id: "thessalonica",
    biblicalName: "Thessalonica",
    modernName: "Thessaloniki, Greece",
    region: "Macedonia",
    lat: 40.63,
    lng: 22.94,
    significance: "major",
    journeys: [2, 3],
    events: [
      {
        journey: 2,
        order: 6,
        action: "Church Founded & Riot",
        description:
          'Paul reasoned in the synagogue for three Sabbaths, explaining that Jesus is the Messiah. Some Jews and many God-fearing Greeks believed. Jealous opponents formed a mob and attacked Jason\'s house, accusing believers of "defying Caesar\'s decrees."',
        verse: "Acts 17:1-9",
        book: "Acts",
        chapter: 17,
        verseStart: 1,
        verseEnd: 9,
        quote:
          '"These men who have caused trouble all over the world have now come here... They are all defying Caesar\'s decrees, saying that there is another king, one called Jesus."',
      },
      {
        journey: 3,
        order: 7,
        action: "Revisit",
        description:
          "Paul traveled through Macedonia, encouraging the believers with many words.",
        verse: "Acts 20:1-2",
        book: "Acts",
        chapter: 20,
        verseStart: 1,
        verseEnd: 2,
        quote:
          '"He traveled through that area, speaking many words of encouragement to the people."',
      },
    ],
  },
  {
    id: "berea",
    biblicalName: "Berea",
    modernName: "Veria, Greece",
    region: "Macedonia",
    lat: 40.52,
    lng: 22.2,
    significance: "moderate",
    journeys: [2],
    events: [
      {
        journey: 2,
        order: 7,
        action: "Noble-minded Bereans",
        description:
          'The Bereans were praised as "more noble" than the Thessalonians because they received the message with eagerness and examined the Scriptures daily to verify Paul\'s teaching. Many believed.',
        verse: "Acts 17:10-14",
        book: "Acts",
        chapter: 17,
        verseStart: 10,
        verseEnd: 14,
        quote:
          '"Now the Berean Jews were of more noble character than those in Thessalonica, for they received the message with great eagerness and examined the Scriptures every day to see if what Paul said was true."',
      },
    ],
  },
  {
    id: "athens",
    biblicalName: "Athens",
    modernName: "Athens, Greece",
    region: "Achaia",
    lat: 37.97,
    lng: 23.73,
    significance: "major",
    journeys: [2],
    events: [
      {
        journey: 2,
        order: 8,
        action: "Mars Hill Sermon",
        description:
          'Paul was deeply distressed by Athens\' idolatry. He debated in the synagogue and marketplace, then delivered his famous sermon at the Areopagus (Mars Hill), beginning with "the unknown god" and proclaiming the true Creator who raises the dead.',
        verse: "Acts 17:15-34",
        book: "Acts",
        chapter: 17,
        verseStart: 15,
        verseEnd: 34,
        quote:
          '"People of Athens! I see that in every way you are very religious. For as I walked around... I even found an altar with this inscription: TO AN UNKNOWN GOD. So you are ignorant of the very thing you worship — and this is what I am going to proclaim to you."',
      },
    ],
  },
  {
    id: "corinth",
    biblicalName: "Corinth",
    modernName: "Ancient Corinth, Greece",
    region: "Achaia",
    lat: 37.91,
    lng: 22.88,
    significance: "major",
    journeys: [2, 3],
    events: [
      {
        journey: 2,
        order: 9,
        action: "18-Month Ministry & Epistles",
        description:
          "Paul stayed in Corinth for 18 months, living and working with Aquila and Priscilla as tentmakers. He was brought before the proconsul Gallio but released. He wrote 1 & 2 Thessalonians here.",
        verse: "Acts 18:1-17",
        book: "Acts",
        chapter: 18,
        verseStart: 1,
        verseEnd: 17,
        quote:
          '"Do not be afraid; keep on speaking, do not be silent. For I am with you, and no one is going to attack and harm you, because I have many people in this city."',
      },
      {
        journey: 3,
        order: 6,
        action: "Three-Month Stay",
        description:
          "Paul spent three months in Greece (Corinth), likely writing the Epistle to the Romans during this time — his most systematic theological work.",
        verse: "Acts 20:2-3",
        book: "Acts",
        chapter: 20,
        verseStart: 2,
        verseEnd: 3,
        quote:
          '"He stayed there three months. Because some Jews had plotted against him just as he was about to sail for Syria, he decided to go back through Macedonia."',
      },
    ],
  },
  {
    id: "cenchreae",
    biblicalName: "Cenchreae",
    modernName: "Kechries, Greece",
    region: "Achaia",
    lat: 37.88,
    lng: 23.0,
    significance: "minor",
    journeys: [2],
    events: [
      {
        journey: 2,
        order: 10,
        action: "Vow & Departure",
        description:
          "Before sailing to Ephesus, Paul had his hair cut at Cenchreae because of a vow he had taken.",
        verse: "Acts 18:18",
        book: "Acts",
        chapter: 18,
        verseStart: 18,
        verseEnd: 18,
        quote:
          '"Before he sailed, he had his hair cut off at Cenchreae because of a vow he had taken."',
      },
    ],
  },
  {
    id: "ephesus",
    biblicalName: "Ephesus",
    modernName: "Near Selçuk, Turkey",
    region: "Asia",
    lat: 37.94,
    lng: 27.34,
    significance: "major",
    journeys: [2, 3],
    events: [
      {
        journey: 2,
        order: 11,
        action: "Brief Visit",
        description:
          "Paul made a brief stop in Ephesus, reasoning in the synagogue. The Jews asked him to stay longer, but he declined, promising to return.",
        verse: "Acts 18:19-21",
        book: "Acts",
        chapter: 18,
        verseStart: 19,
        verseEnd: 21,
        quote:
          '"He himself went into the synagogue and reasoned with the Jews. When they asked him to spend more time with them, he declined."',
      },
      {
        journey: 3,
        order: 2,
        action: "Major Ministry (3 Years)",
        description:
          'Paul spent nearly three years in Ephesus — his longest stay in any city. He taught in the hall of Tyrannus, performed extraordinary miracles, and triggered a riot led by the silversmith Demetrius who feared for the trade in Artemis idols. Paul wrote 1 Corinthians here.',
        verse: "Acts 19:1-41",
        book: "Acts",
        chapter: 19,
        verseStart: 1,
        verseEnd: 41,
        quote:
          '"God did extraordinary miracles through Paul, so that even handkerchiefs and aprons that had touched him were taken to the sick, and their illnesses were cured."',
      },
    ],
  },
  {
    id: "caesarea",
    biblicalName: "Caesarea Maritima",
    modernName: "Caesarea, Israel",
    region: "Judea",
    lat: 32.5,
    lng: 34.89,
    significance: "major",
    journeys: [2, 3, 4],
    events: [
      {
        journey: 2,
        order: 12,
        action: "Return",
        description:
          "Paul landed at Caesarea, went up and greeted the church (likely in Jerusalem), and then went down to Antioch.",
        verse: "Acts 18:22",
        book: "Acts",
        chapter: 18,
        verseStart: 22,
        verseEnd: 22,
        quote:
          '"When he landed at Caesarea, he went up and greeted the church and then went down to Antioch."',
      },
      {
        journey: 3,
        order: 14,
        action: "Agabus' Prophecy",
        description:
          "Paul stayed with Philip the evangelist. The prophet Agabus bound his own hands and feet with Paul's belt, prophesying Paul's arrest in Jerusalem. Despite pleas, Paul declared he was ready to die for the Lord.",
        verse: "Acts 21:8-14",
        book: "Acts",
        chapter: 21,
        verseStart: 8,
        verseEnd: 14,
        quote:
          '"Why are you weeping and breaking my heart? I am ready not only to be bound, but also to die in Jerusalem for the name of the Lord Jesus."',
      },
      {
        journey: 4,
        order: 1,
        action: "Trial & Departure",
        description:
          "After two years imprisoned in Caesarea, Paul appealed to Caesar. He was placed under the charge of a centurion named Julius and sailed from Caesarea toward Rome.",
        verse: "Acts 27:1-2",
        book: "Acts",
        chapter: 27,
        verseStart: 1,
        verseEnd: 2,
        quote:
          '"When it was decided that we would sail for Italy, Paul and some other prisoners were handed over to a centurion named Julius."',
      },
    ],
  },
  {
    id: "jerusalem",
    biblicalName: "Jerusalem",
    modernName: "Jerusalem, Israel",
    region: "Judea",
    lat: 31.77,
    lng: 35.23,
    significance: "major",
    journeys: [2, 3],
    events: [
      {
        journey: 2,
        order: 13,
        action: "Report to Church",
        description:
          "Paul went up to Jerusalem to greet the church before returning to Antioch.",
        verse: "Acts 18:22",
        book: "Acts",
        chapter: 18,
        verseStart: 22,
        verseEnd: 22,
        quote:
          '"When he landed at Caesarea, he went up and greeted the church."',
      },
      {
        journey: 3,
        order: 15,
        action: "Arrest in the Temple",
        description:
          "Paul arrived in Jerusalem and met with James and the elders. While completing a purification rite in the Temple, Jews from Asia accused him of defiling the Temple. A mob seized him, and Roman soldiers rescued him. This began Paul's long imprisonment.",
        verse: "Acts 21:15-36",
        book: "Acts",
        chapter: 21,
        verseStart: 15,
        verseEnd: 36,
        quote:
          '"The whole city was aroused, and the people came running from all directions. Seizing Paul, they dragged him from the temple, and immediately the gates were shut."',
      },
    ],
  },

  // ===== JOURNEY 3 ADDITIONAL CITIES =====
  {
    id: "galatia-phrygia",
    biblicalName: "Galatia & Phrygia",
    modernName: "Central Turkey",
    region: "Asia Minor",
    lat: 38.5,
    lng: 30.5,
    significance: "moderate",
    journeys: [3],
    events: [
      {
        journey: 3,
        order: 1,
        action: "Strengthening Disciples",
        description:
          "Paul traveled through Galatia and Phrygia, strengthening all the disciples.",
        verse: "Acts 18:23",
        book: "Acts",
        chapter: 18,
        verseStart: 23,
        verseEnd: 23,
        quote:
          '"He traveled from place to place throughout the region of Galatia and Phrygia, strengthening all the disciples."',
      },
    ],
  },
  {
    id: "macedonia-region",
    biblicalName: "Macedonia",
    modernName: "Northern Greece",
    region: "Macedonia",
    lat: 40.8,
    lng: 23.5,
    significance: "moderate",
    journeys: [3],
    events: [
      {
        journey: 3,
        order: 5,
        action: "Encouraging Churches",
        description:
          "After the riot in Ephesus, Paul traveled through Macedonia, encouraging the believers with many words. He likely wrote 2 Corinthians during this time.",
        verse: "Acts 20:1-2",
        book: "Acts",
        chapter: 20,
        verseStart: 1,
        verseEnd: 2,
        quote:
          '"Paul sent for the disciples and, after encouraging them, said goodbye and set out for Macedonia."',
      },
    ],
  },
  {
    id: "assos",
    biblicalName: "Assos",
    modernName: "Behramkale, Turkey",
    region: "Mysia",
    lat: 39.49,
    lng: 26.34,
    significance: "minor",
    journeys: [3],
    events: [
      {
        journey: 3,
        order: 10,
        action: "Paul Walks Overland",
        description:
          "While his companions sailed ahead, Paul chose to walk overland from Troas to Assos — possibly for time in prayer and reflection.",
        verse: "Acts 20:13-14",
        book: "Acts",
        chapter: 20,
        verseStart: 13,
        verseEnd: 14,
        quote:
          '"We went on ahead to the ship and sailed for Assos, where we were going to take Paul aboard. He had made this arrangement because he was going there on foot."',
      },
    ],
  },
  {
    id: "mitylene",
    biblicalName: "Mitylene",
    modernName: "Mytilene, Lesbos, Greece",
    region: "Aegean Islands",
    lat: 39.1,
    lng: 26.55,
    significance: "minor",
    journeys: [3],
    events: [
      {
        journey: 3,
        order: 11,
        action: "Overnight Stop",
        description:
          "Paul and his companions sailed from Assos to Mitylene on the island of Lesbos.",
        verse: "Acts 20:14",
        book: "Acts",
        chapter: 20,
        verseStart: 14,
        verseEnd: 14,
        quote:
          '"He met us at Assos, we took him aboard and went on to Mitylene."',
      },
    ],
  },
  {
    id: "miletus",
    biblicalName: "Miletus",
    modernName: "Near Balat, Turkey",
    region: "Asia",
    lat: 37.53,
    lng: 27.28,
    significance: "major",
    journeys: [3],
    events: [
      {
        journey: 3,
        order: 12,
        action: "Farewell to Ephesian Elders",
        description:
          'Paul bypassed Ephesus to save time but summoned the Ephesian elders to Miletus. He delivered a deeply emotional farewell speech, warning of "savage wolves" and committing them to God\'s grace. They all wept, embracing and kissing him.',
        verse: "Acts 20:15-38",
        book: "Acts",
        chapter: 20,
        verseStart: 15,
        verseEnd: 38,
        quote:
          '"Keep watch over yourselves and all the flock of which the Holy Spirit has made you overseers. Be shepherds of the church of God, which he bought with his own blood."',
      },
    ],
  },
  {
    id: "cos",
    biblicalName: "Cos",
    modernName: "Kos, Greece",
    region: "Aegean Islands",
    lat: 36.89,
    lng: 27.09,
    significance: "minor",
    journeys: [3],
    events: [
      {
        journey: 3,
        order: 13,
        action: "Sailing Stop",
        description:
          "Paul's ship stopped at the island of Cos on the voyage toward Jerusalem.",
        verse: "Acts 21:1",
        book: "Acts",
        chapter: 21,
        verseStart: 1,
        verseEnd: 1,
        quote:
          '"After we had torn ourselves away from them, we put out to sea and sailed straight to Kos."',
      },
    ],
  },
  {
    id: "rhodes",
    biblicalName: "Rhodes",
    modernName: "Rhodes, Greece",
    region: "Aegean Islands",
    lat: 36.44,
    lng: 28.23,
    significance: "minor",
    journeys: [3],
    events: [
      {
        journey: 3,
        order: 13,
        action: "Sailing Stop",
        description: "The ship continued from Cos to Rhodes.",
        verse: "Acts 21:1",
        book: "Acts",
        chapter: 21,
        verseStart: 1,
        verseEnd: 1,
        quote: '"The next day to Rhodes and from there to Patara."',
      },
    ],
  },
  {
    id: "patara",
    biblicalName: "Patara",
    modernName: "Gelemiş, Turkey",
    region: "Lycia",
    lat: 36.26,
    lng: 29.32,
    significance: "minor",
    journeys: [3],
    events: [
      {
        journey: 3,
        order: 13,
        action: "Ship Change",
        description:
          "At Patara, Paul found a ship crossing over to Phoenicia and went aboard.",
        verse: "Acts 21:1-2",
        book: "Acts",
        chapter: 21,
        verseStart: 1,
        verseEnd: 2,
        quote:
          '"We found a ship crossing over to Phoenicia, went on board and set sail."',
      },
    ],
  },
  {
    id: "tyre",
    biblicalName: "Tyre",
    modernName: "Tyre (Sour), Lebanon",
    region: "Phoenicia",
    lat: 33.27,
    lng: 35.19,
    significance: "moderate",
    journeys: [3],
    events: [
      {
        journey: 3,
        order: 13,
        action: "Seven Days with Disciples",
        description:
          "Paul stayed seven days with the disciples in Tyre. Through the Spirit, they urged Paul not to go to Jerusalem. At departure, the whole community knelt on the beach to pray.",
        verse: "Acts 21:3-6",
        book: "Acts",
        chapter: 21,
        verseStart: 3,
        verseEnd: 6,
        quote:
          '"All of them, including wives and children, accompanied us out of the city, and there on the beach we knelt to pray."',
      },
    ],
  },
  {
    id: "ptolemais",
    biblicalName: "Ptolemais",
    modernName: "Acre (Akko), Israel",
    region: "Phoenicia",
    lat: 32.93,
    lng: 35.07,
    significance: "minor",
    journeys: [3],
    events: [
      {
        journey: 3,
        order: 14,
        action: "Brief Stay",
        description:
          "Paul greeted the believers in Ptolemais and stayed with them for one day.",
        verse: "Acts 21:7",
        book: "Acts",
        chapter: 21,
        verseStart: 7,
        verseEnd: 7,
        quote:
          '"We greeted the brothers and sisters and stayed with them for a day."',
      },
    ],
  },

  // ===== JOURNEY 4 (TO ROME) CITIES =====
  {
    id: "sidon",
    biblicalName: "Sidon",
    modernName: "Sidon (Saida), Lebanon",
    region: "Phoenicia",
    lat: 33.56,
    lng: 35.37,
    significance: "minor",
    journeys: [4],
    events: [
      {
        journey: 4,
        order: 2,
        action: "Julius' Kindness",
        description:
          "The centurion Julius treated Paul kindly, allowing him to visit friends in Sidon and receive care.",
        verse: "Acts 27:3",
        book: "Acts",
        chapter: 27,
        verseStart: 3,
        verseEnd: 3,
        quote:
          '"Julius, in kindness to Paul, allowed him to go to his friends so they might provide for his needs."',
      },
    ],
  },
  {
    id: "myra",
    biblicalName: "Myra",
    modernName: "Demre, Turkey",
    region: "Lycia",
    lat: 36.25,
    lng: 29.98,
    significance: "minor",
    journeys: [4],
    events: [
      {
        journey: 4,
        order: 3,
        action: "Ship Transfer",
        description:
          "At Myra, the centurion found an Alexandrian ship sailing for Italy and put them aboard.",
        verse: "Acts 27:5-6",
        book: "Acts",
        chapter: 27,
        verseStart: 5,
        verseEnd: 6,
        quote:
          '"There the centurion found an Alexandrian ship sailing for Italy and put us on board."',
      },
    ],
  },
  {
    id: "cnidus",
    biblicalName: "Cnidus",
    modernName: "Datça Peninsula, Turkey",
    region: "Asia",
    lat: 36.69,
    lng: 27.37,
    significance: "minor",
    journeys: [4],
    events: [
      {
        journey: 4,
        order: 4,
        action: "Difficult Sailing",
        description:
          "The wind prevented them from reaching Cnidus, so they sailed south toward Crete.",
        verse: "Acts 27:7",
        book: "Acts",
        chapter: 27,
        verseStart: 7,
        verseEnd: 7,
        quote:
          '"When the wind did not allow us to hold our course, we sailed to the lee of Crete."',
      },
    ],
  },
  {
    id: "fair-havens",
    biblicalName: "Fair Havens (Kaloi Limenes)",
    modernName: "Kaloi Limenes, Crete, Greece",
    region: "Crete",
    lat: 34.93,
    lng: 24.73,
    significance: "moderate",
    journeys: [4],
    events: [
      {
        journey: 4,
        order: 5,
        action: "Paul's Warning Ignored",
        description:
          "Paul warned that the voyage would be disastrous, but the centurion followed the pilot's and owner's advice to sail on. This decision led to the catastrophic storm.",
        verse: "Acts 27:8-12",
        book: "Acts",
        chapter: 27,
        verseStart: 8,
        verseEnd: 12,
        quote:
          '"I can see that our voyage is going to be disastrous and bring great loss to ship and cargo, and to our own lives also."',
      },
    ],
  },
  {
    id: "malta",
    biblicalName: "Malta (Melita)",
    modernName: "Malta",
    region: "Mediterranean",
    lat: 35.94,
    lng: 14.38,
    significance: "major",
    journeys: [4],
    events: [
      {
        journey: 4,
        order: 6,
        action: "Shipwreck, Viper & Healings",
        description:
          "After 14 days in a terrible storm, the ship ran aground and broke apart. All 276 people reached shore safely, as Paul had promised. On the island, a viper bit Paul's hand — the islanders expected him to die, but he was unharmed. Paul healed the chief official Publius' father and many others.",
        verse: "Acts 27:39–28:10",
        book: "Acts",
        chapter: 28,
        verseStart: 1,
        verseEnd: 10,
        quote:
          '"Paul gathered a pile of brushwood and, as he put it on the fire, a viper... fastened itself on his hand... But Paul shook the snake off into the fire and suffered no ill effects."',
      },
    ],
  },
  {
    id: "syracuse",
    biblicalName: "Syracuse",
    modernName: "Syracuse, Sicily, Italy",
    region: "Sicily",
    lat: 37.07,
    lng: 15.29,
    significance: "minor",
    journeys: [4],
    events: [
      {
        journey: 4,
        order: 7,
        action: "Three-Day Stop",
        description:
          "After wintering in Malta, they sailed on an Alexandrian ship to Syracuse, where they stayed three days.",
        verse: "Acts 28:12",
        book: "Acts",
        chapter: 28,
        verseStart: 12,
        verseEnd: 12,
        quote: '"We put in at Syracuse and stayed there three days."',
      },
    ],
  },
  {
    id: "rhegium",
    biblicalName: "Rhegium",
    modernName: "Reggio Calabria, Italy",
    region: "Italy",
    lat: 38.11,
    lng: 15.65,
    significance: "minor",
    journeys: [4],
    events: [
      {
        journey: 4,
        order: 8,
        action: "Final Sailing Stop",
        description:
          "From Syracuse, Paul's ship sailed to Rhegium. A south wind came up and they reached Puteoli the next day.",
        verse: "Acts 28:13",
        book: "Acts",
        chapter: 28,
        verseStart: 13,
        verseEnd: 13,
        quote:
          '"From there we set sail and arrived at Rhegium. The next day the south wind came up, and on the following day we reached Puteoli."',
      },
    ],
  },
  {
    id: "puteoli",
    biblicalName: "Puteoli",
    modernName: "Pozzuoli, Italy",
    region: "Italy",
    lat: 40.82,
    lng: 14.12,
    significance: "moderate",
    journeys: [4],
    events: [
      {
        journey: 4,
        order: 9,
        action: "Brothers Found in Italy",
        description:
          "Paul found believers at Puteoli and was invited to spend a week with them — evidence the gospel had already reached Italy. Then they traveled on to Rome.",
        verse: "Acts 28:13-14",
        book: "Acts",
        chapter: 28,
        verseStart: 13,
        verseEnd: 14,
        quote:
          '"There we found some brothers and sisters who invited us to spend a week with them. And so we came to Rome."',
      },
    ],
  },
  {
    id: "rome",
    biblicalName: "Rome",
    modernName: "Rome, Italy",
    region: "Italy",
    lat: 41.9,
    lng: 12.5,
    significance: "major",
    journeys: [4],
    events: [
      {
        journey: 4,
        order: 10,
        action: "House Arrest & Preaching",
        description:
          "Paul finally reached Rome, the capital of the Empire. Brothers came to meet him at the Forum of Appius and Three Taverns. He was allowed to live by himself with a soldier to guard him. For two full years, Paul welcomed all who came and proclaimed the kingdom of God and taught about Jesus — boldly and without hindrance.",
        verse: "Acts 28:14-31",
        book: "Acts",
        chapter: 28,
        verseStart: 14,
        verseEnd: 31,
        quote:
          '"For two whole years Paul stayed there in his own rented house and welcomed all who came to see him. He proclaimed the kingdom of God and taught about the Lord Jesus Christ — with all boldness and without hindrance!"',
      },
    ],
  },
];

export const routes = [
  {
    journey: 1,
    outbound: [
      [36.16, 36.2],   // Antioch
      [35.94, 36.1],   // Seleucia
      [33.9, 35.18],   // Salamis
      [32.42, 34.76],  // Paphos
      [30.85, 36.96],  // Perga
      [31.18, 38.29],  // Antioch Pisidia
      [32.49, 37.87],  // Iconium
      [32.36, 37.57],  // Lystra
      [33.39, 37.36],  // Derbe
    ],
    returnPath: [
      [33.39, 37.36],  // Derbe
      [32.36, 37.57],  // Lystra
      [32.49, 37.87],  // Iconium
      [31.18, 38.29],  // Antioch Pisidia
      [30.85, 36.96],  // Perga
      [30.7, 36.88],   // Attalia
      [36.16, 36.2],   // Antioch Syria
    ],
  },
  {
    journey: 2,
    outbound: [
      [36.16, 36.2],   // Antioch Syria
      [33.39, 37.36],  // Derbe
      [32.36, 37.57],  // Lystra
      [32.49, 37.87],  // Iconium
      [26.14, 39.76],  // Troas
      [24.29, 41.01],  // Philippi
      [22.94, 40.63],  // Thessalonica
      [22.2, 40.52],   // Berea
      [23.73, 37.97],  // Athens
      [22.88, 37.91],  // Corinth
    ],
    returnPath: [
      [22.88, 37.91],  // Corinth
      [23.0, 37.88],   // Cenchreae
      [27.34, 37.94],  // Ephesus
      [34.89, 32.5],   // Caesarea
      [35.23, 31.77],  // Jerusalem
      [36.16, 36.2],   // Antioch Syria
    ],
  },
  {
    journey: 3,
    outbound: [
      [36.16, 36.2],   // Antioch
      [30.5, 38.5],    // Galatia/Phrygia
      [27.34, 37.94],  // Ephesus
      [23.5, 40.8],    // Macedonia
      [22.88, 37.91],  // Corinth (Greece)
    ],
    returnPath: [
      [22.88, 37.91],  // Corinth
      [24.29, 41.01],  // Philippi
      [26.14, 39.76],  // Troas
      [26.34, 39.49],  // Assos
      [26.55, 39.1],   // Mitylene
      [27.28, 37.53],  // Miletus
      [27.09, 36.89],  // Cos
      [28.23, 36.44],  // Rhodes
      [29.32, 36.26],  // Patara
      [35.19, 33.27],  // Tyre
      [35.07, 32.93],  // Ptolemais
      [34.89, 32.5],   // Caesarea
      [35.23, 31.77],  // Jerusalem
    ],
  },
  {
    journey: 4,
    outbound: [
      [34.89, 32.5],   // Caesarea
      [35.37, 33.56],  // Sidon
      [29.98, 36.25],  // Myra
      [27.37, 36.69],  // Cnidus
      [24.73, 34.93],  // Fair Havens
      [14.38, 35.94],  // Malta
      [15.29, 37.07],  // Syracuse
      [15.65, 38.11],  // Rhegium
      [14.12, 40.82],  // Puteoli
      [12.5, 41.9],    // Rome
    ],
    returnPath: null,
  },
];

// Scripture lookup index for fast filtering
export const scriptureIndex = (() => {
  const index = {};
  cities.forEach((city) => {
    city.events.forEach((event) => {
      const key = `${event.book} ${event.chapter}`;
      if (!index[key]) index[key] = [];
      index[key].push({ cityId: city.id, event });

      // Also index by full verse reference
      if (!index[event.verse]) index[event.verse] = [];
      index[event.verse].push({ cityId: city.id, event });
    });
  });
  return index;
})();

// Get all unique chapters for the filter
export const allChapters = (() => {
  const chapters = new Set();
  cities.forEach((city) => {
    city.events.forEach((event) => {
      chapters.add(`${event.book} ${event.chapter}`);
    });
  });
  return Array.from(chapters).sort((a, b) => {
    const [, numA] = a.split(" ");
    const [, numB] = b.split(" ");
    return parseInt(numA) - parseInt(numB);
  });
})();

// Get all unique verses for autocomplete
export const allVerses = (() => {
  const verses = new Set();
  cities.forEach((city) => {
    city.events.forEach((event) => {
      verses.add(event.verse);
    });
  });
  return Array.from(verses).sort((a, b) => {
    const parseRef = (ref) => {
      const match = ref.match(/(\d+):(\d+)/);
      return match ? [parseInt(match[1]), parseInt(match[2])] : [0, 0];
    };
    const [ca, va] = parseRef(a);
    const [cb, vb] = parseRef(b);
    return ca - cb || va - vb;
  });
})();
