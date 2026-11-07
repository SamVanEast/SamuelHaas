import { Translations } from './translations';

export const DE: Translations = {
  skipToContent: 'Zum Inhalt springen',
  pageTitles: {
    home: 'Samuel Haas',
    imprint: 'Impressum',
    privacy: 'Datenschutzerklärung',
    notFound: 'Seite nicht gefunden',
  },
  nav: {
    'about-me': 'Über mich',
    'portfolio': 'Portfolio',
    'contact': 'Kontakt',
  },
  header: {
    mainNavigation: 'Hauptnavigation',
    navigation: 'Navigation',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    language: 'Sprache',
    darkMode: 'Dunkles Design',
  },
  welcome: {
    headline: 'Ich bin Samuel Haas. Softwareentwickler und Mechatroniker aus Balingen.',
    text: 'Ich komme aus der Industrie und entwickle heute Software für Web und Mobile. Mit meinem Wissen als Mechatroniker unterstütze ich überall dort, wo Software auf Maschinen und Steuerungen trifft.',
    portraitAlt: 'Porträt von Samuel Haas',
  },
  about: {
    headline: 'Über mich',
    text: [
      'Hallo, mein Name ist Samuel Haas. Zur Technik bin ich schon in der Schulzeit über Jugend forscht gekommen. Das kleine Forschungsprojekt lief so gut, dass ich danach Elektronik und Mechanik zum Inhalt meiner Ausbildung bei einem mittelständischen Unternehmen in der Region gemacht habe. Nach mehr als drei Jahren zwischen Industrieanlagen, Steuerungen und Programmierungen reichten mir meine Programmierkenntnisse aber nicht mehr. Ich wollte mehr.',
      'Erst habe ich mir mit Büchern selbst einiges beigebracht, dann habe ich die Weiterbildung zum Frontend-Entwickler an der Developer Akademie gemacht. Danach war ich ein Jahr als Softwareentwickler bei kamasys (heute menio) und habe dort an Apps und Bestellterminals für Kantinen gearbeitet.',
      'Seit 2024 bin ich selbstständig und entwickle Software für meine Kunden, aktuell unter anderem für ByteCookie und Quantrefy. Im Web arbeite ich am liebsten mit Vue.js, TypeScript und Angular. Zwischendurch habe ich als IT-Trainer außerdem Schulungen zu Git, Angular und CSS gegeben. Mir ist wichtig, dass sich eine Anwendung gut bedienen lässt und der Code auch später noch verständlich ist.',
      'Maschinen, Steuerungen und Sensoren kenne ich aus der Praxis. Wenn Ihre Software mit solcher Technik zusammenarbeiten muss, unterstütze ich Sie bei beidem.',
    ],
    portraitAlt: 'Porträt von Samuel Haas',
  },
  portfolio: {
    headline: 'Portfolio',
    description: 'Eine Auswahl an Projekten, an denen ich als Entwickler mitgearbeitet habe. Einfach reinklicken und ausprobieren.',
    projects: {
      'quantrefy': {
        title: 'Quantrefy',
        technologies: 'Vue.js | TypeScript | Tailwind CSS | AG Grid | AG Charts | Vitest | Visual Tests | Figma | Jira | Confluence | Backend: C# / .NET Aspire',
        description: 'Für Quantrefy entwickle ich seit Februar 2026 im Team an einer Webanwendung mit und setze dort unter anderem Tabellen und Diagramme mit AG Grid und AG Charts um.',
      },
      'bytecookie': {
        title: 'ByteCookie',
        technologies: 'Vue.js | TypeScript | HTML | SCSS | REST-API | Scrum | Jira | Confluence | Bitbucket | Swagger | Figma | Backend: Java',
        description: 'Ein genossenschaftlicher Marktplatz für IT-Freelancer aus Frankfurt am Main, auf dem Auftraggeber über ein Netzwerk aus Experten passende Freelancer empfohlen bekommen. Ich entwickle dort seit Anfang 2025 als Freelancer im Team mit.',
      },
      'lunch-menu-app': {
        title: 'Mittagstisch-App',
        technologies: 'Cordova | AngularJS | HTML | LESS | REST-API | Scrum | Jira | Confluence | Bitbucket | Swagger',
        description: 'Eine White-Label-App für Kantinen mit Speiseplan, Bestell- und Bezahlfunktion und vielen Zusatzmodulen, zum Beispiel Abstimmungen, News oder Rezepte. Bei kamasys (heute menio) habe ich die App weiterentwickelt, alle Abhängigkeiten auf den aktuellen Stand gebracht und neue Versionen in den App Stores veröffentlicht.',
      },
      'order-terminal': {
        title: 'Bestellterminal',
        technologies: 'Vue.js | TypeScript | HTML | SCSS | C# | REST-API | Scrum | Jira | Confluence | Bitbucket | Swagger',
        description: 'Ein Terminal zur Selbstbedienung in Kantinen: Gäste wählen ihre Gerichte am Touchscreen aus, bezahlen kontaktlos und holen das Essen zur gewünschten Zeit an der Theke ab. Bei kamasys (heute menio) habe ich unter anderem verschiedene Bezahlmethoden angebunden und das komplette Dependency-Upgrade umgesetzt.',
      },
      'slack-clone': {
        title: 'Slack Clone',
        technologies: 'HTML | CSS | TypeScript | Angular | Firebase | Figma | GitHub | REST-API',
        description: 'Ein Messenger nach dem Vorbild von Slack, umgesetzt mit Angular und Firebase.',
      },
      'join': {
        title: 'Join',
        technologies: 'HTML | CSS | JavaScript | Figma | GitHub',
        description: 'Ein übersichtliches Kanban-Board, mit dem man seine Aufgaben plant und den Tag im Griff behält.',
      },
      'el-pollo-loco': {
        title: 'El Pollo Loco',
        technologies: 'HTML | CSS | JavaScript | Figma | GitHub',
        description: 'Ein 2D-Spiel in JavaScript, in dem man sich gegen Hühner und am Ende gegen ihren Boss durchsetzen muss.',
      },
    },
  },
  contact: {
    headline: 'Reden wir über Ihr Projekt',
    text: 'Jetzt wissen Sie schon einiges über mich. Wenn Sie Unterstützung bei der Softwareentwicklung brauchen oder Ihre Software mit Maschinen und Steuerungen zusammenarbeiten muss, schreiben Sie mir eine E-Mail oder rufen Sie mich an. Für neue Projekte bin ich ab April 2027 wieder verfügbar.',
    infoHeadline: 'Kontaktdaten',
  },
  footer: {
    legal: 'Rechtliches',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
  },
  notFound: {
    headline: 'Seite nicht gefunden',
    text: 'Die aufgerufene Seite existiert nicht oder wurde verschoben. Über die Startseite finden Sie alle Inhalte dieser Website.',
    home: 'Zur Startseite',
    portfolio: 'Portfolio ansehen',
  },
  legal: {
    germanOnly: '',
  },
};
