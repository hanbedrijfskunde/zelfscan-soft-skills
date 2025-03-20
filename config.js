/**
 * Configuration constants for the application
 */

// Qualification data configuration - make sure this is a global variable
window.CONFIG = {
    // Qualification IDs and names
    QUALIFICATION_DATA: [
      {
        id: 6,
        name: "Sociaal communicatieve vaardigheden",
        sufficient: [
          "Ik zet communicatie doelbewust in en afgestemd op de doelgroep.",
          "Ik creëer draagvlak bij stakeholders met uiteenlopende belangen.",
          "Ik motiveer mensen tot een constructieve bijdrage.",
          "Ik toon in mijn handelen bewustzijn van mijn persoonlijke rol in de interactie met anderen.",
          "Ik kan gespreksvaardigheden inzetten om het behalen van bedrijfskundige doelen te sturen."
        ],
        distinguished: [
          "Ik kan op overtuigende wijze beargumenteren dat het gegeven advies een daadwerkelijke oplossing is voor het probleem.",
          "Mijn toelichting/beantwoording en discussie leiden tot nieuwe perspectieven op langere termijn m.b.t. het onderwerp voor de organisatie en de sector."
        ]
      },
      {
        id: 7,
        name: "Schakelen en verbinden",
        sufficient: [
          "Ik ben regisseur van het onderzoeksproces.",
          "Ik kan contacten inzetten in verschillende situaties om doelen te bereiken.",
          "Ik weet wat er nodig is om relevante verbindingen te leggen tussen mensen en de verschillende functies/disciplines en niveaus en kan daar soepel tussen schakelen.",
          "Ik ben bewust van culturele diversiteit en houd daar rekening mee."
        ],
        distinguished: [
          "Ik weet relevante stakeholders (in- en extern) bij het traject optimaal te betrekken en in te zetten om tot een optimaal resultaat te komen.",
          "Ik wissel in rol afhankelijk van de context."
        ]
      },
      {
        id: 8,
        name: "Professionaliseren",
        sufficient: [
          "Ik verspreid en borg opgedane kennis en lever daarmee een bijdrage aan de ontwikkeling van de organisatie en de bedrijfskundige beroepspraktijk.",
          "Ik verantwoord mijn eigen handelen.",
          "Ik kan in een continu proces reflecteren op mijn eigen handelen en toekomstige ontwikkelproces."
        ],
        distinguished: [
          "Ik ben me bewust van de rol die ik heb aangenomen in het onderzoeksproces.",
          "Ik heb die rol bewust afgestemd op het vraagstuk, de organisatie en mijn eigen voorkeuren."
        ]
      },
      {
        id: 9,
        name: "Handelen vanuit waarden",
        sufficient: [
          "Ik ben me bewust vanuit welke waarden en normen ik gehandeld heb.",
          "Ik leg op basis hiervan verantwoording af over keuzes die ik heb gemaakt.",
          "Ik streef bij het oplossen van bedrijfskundige vraagstukken naar duurzame maatschappelijk verantwoorde oplossingen."
        ],
        distinguished: [
          "Ik kan op de gemaakte keuzes kritisch reflecteren rondom ethische dilemma's.",
          "Ik kan de consequenties van keuzes overzien, niet alleen van de output, maar ook van de outcome (mogelijke effecten en de impact daarvan) voor de langere termijn."
        ]
      }
    ],
    
    // Reflection form sections
    REFLECTION_SECTIONS: {
      professionalDevelopment: [
        {
          name: "prof-development-start",
          label: "Hoe keek je aan het begin van dit afstudeerproject tegen je professionele ontwikkeling en houding aan?",
          rows: 4
        },
        {
          name: "prof-strengths-weaknesses",
          label: "Wat vond je al wel goed gaan en wat niet?",
          rows: 4
        },
        {
          name: "prof-development-now",
          label: "Hoe kijk je er nu naar je professionele houding en wat is er veranderd?",
          rows: 4
        }
      ],
      starrReflection: [
        {
          name: "starr-situation",
          label: "Situatie: Beschrijf een concrete situatie tijdens je afstudeerproject",
          rows: 3
        },
        {
          name: "starr-task",
          label: "Taak: Wat was jouw taak/rol hierin?",
          rows: 3
        },
        {
          name: "starr-action",
          label: "Actie: Wat heb je gedaan?",
          rows: 3
        },
        {
          name: "starr-result",
          label: "Resultaat: Wat was het resultaat?",
          rows: 3
        },
        {
          name: "starr-reflection",
          label: "Reflectie: Wat heb je hiervan geleerd?",
          rows: 3
        }
      ],
      moralCompass: [
        {
          name: "moral-compass",
          label: "Hoe zie jij je eigen morele kompas? Heb je een voorbeeld waarbij je op je morele kompas hebt gevaren?",
          rows: 4
        },
        {
          name: "strategic-dilemmas",
          label: "Welke strategische keuzes/dilemma's ben je tegengekomen tijdens je afstudeertraject?",
          rows: 4
        },
        {
          name: "moral-dilemmas",
          label: "Welke morele dilemma's ben je tegengekomen?",
          rows: 4
        },
        {
          name: "moral-foresight",
          label: "Had je dat voorzien van tevoren? Hoe bewust heb je hier gehandeld als je terugkijkt?",
          rows: 4
        }
      ]
    },
    
    // Score descriptions and colors for UI
    SCORE_DESCRIPTIONS: [
      "Onvoldoende",
      "Voldoende",
      "Goed",
      "Onderscheidend"
    ],
    
    SCORE_COLORS: {
      0: "text-red-600",
      1: "text-yellow-600",
      2: "text-green-600",
      3: "text-blue-600"
    }
  };