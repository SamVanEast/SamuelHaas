import { Translations } from './translations';

export const EN: Translations = {
  skipToContent: 'Skip to content',
  pageTitles: {
    home: 'Samuel Haas',
    imprint: 'Legal notice',
    privacy: 'Privacy policy',
    notFound: 'Page not found',
  },
  nav: {
    'about-me': 'About me',
    'portfolio': 'Portfolio',
    'contact': 'Contact',
  },
  header: {
    mainNavigation: 'Main navigation',
    navigation: 'Navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    darkMode: 'Dark mode',
  },
  welcome: {
    headline: "I'm Samuel Haas. A freelance software developer from Germany.",
    text: 'First a mechatronics technician, then a software developer – who would have thought that my educational journey would take me here. Today I develop software for web and mobile as a freelancer and bring along what I learned in mechatronics. And I still learn something new every day.',
    portraitAlt: 'Portrait of Samuel Haas',
  },
  about: {
    headline: 'About me',
    text: [
      'Hello, my name is Samuel Haas. I got into technology at school through Jugend forscht, a German science competition. The small research project went so well that I then made electronics and mechanics the subject of my apprenticeship at a medium-sized company in the region. After more than three years of industrial systems, controls and programming, my programming skills were not enough anymore – I wanted more.',
      'First I taught myself with books, then I did the further education course to become a frontend developer at the Developer Akademie. After that I worked as a software developer at kamasys (today menio) for a year, on apps and ordering terminals for canteens.',
      'Since 2024 I have been self-employed and develop software for my clients – currently for ByteCookie and Quantrefy, among others. On the web I prefer Vue.js and TypeScript, and if a project needs it, I also work with Angular. In between I also worked as an IT trainer and passed on what I know. What matters to me is that an application is easy to use and that the code is still easy to understand later on.',
      'I never really left mechatronics behind. I know how machines, controls and sensors work, and that is where I want to do more in the future: solutions where mechanics, electronics and software come together. Especially when a problem cannot be solved with an app alone.',
    ],
    portraitAlt: 'Portrait of Samuel Haas',
  },
  portfolio: {
    headline: 'Portfolio',
    description: 'A selection of projects I worked on as a developer – just click on them and try them out.',
    projects: {
      'quantrefy': {
        title: 'Quantrefy',
        technologies: 'Vue.js | TypeScript | Tailwind CSS | AG Grid | AG Charts | Vitest | Visual Tests | Figma | Jira | Confluence',
        description: 'A platform for ESG data of real estate: collect consumption data, evaluate key figures such as CRREM or the EU taxonomy and create reports according to GRESB or CSRD. I have been part of the development since February 2026, among other things on the tables and charts with AG Grid and AG Charts.',
      },
      'bytecookie': {
        title: 'ByteCookie',
        technologies: 'Vue.js | TypeScript | HTML | SCSS | REST-API | Scrum | Jira | Confluence | Bitbucket | Swagger | Figma',
        description: 'A cooperative marketplace for IT freelancers from Frankfurt am Main, where clients get suitable freelancers recommended by a network of experts. I have been part of the development there as a freelancer since early 2025.',
      },
      'lunch-menu-app': {
        title: 'Lunch menu app',
        technologies: 'Cordova | AngularJS | HTML | LESS | REST-API | Scrum | Jira | Confluence | Bitbucket | Swagger',
        description: 'A white-label app for canteens with menus, ordering and payment and lots of additional modules, for example votings, news or recipes. At kamasys (today menio) I developed the app further, brought all dependencies up to date and released new versions in the app stores.',
      },
      'order-terminal': {
        title: 'Order terminal',
        technologies: 'Vue.js | TypeScript | HTML | SCSS | C# | REST-API | Scrum | Jira | Confluence | Bitbucket | Swagger',
        description: 'A self-service terminal for canteens: guests choose their dishes on a touchscreen, pay contactless and pick up their food at the counter at the time they want. At kamasys (today menio) I connected different payment methods and did the complete dependency upgrade, among other things.',
      },
      'slack-clone': {
        title: 'Slack Clone',
        technologies: 'HTML | CSS | TypeScript | Angular | Firebase | Figma | GitHub | REST-API',
        description: 'A messenger modelled on Slack, built with Angular and Firebase.',
      },
      'join': {
        title: 'Join',
        technologies: 'HTML | CSS | JavaScript | Figma | GitHub',
        description: 'A clear Kanban board to plan your tasks and keep track of your day.',
      },
      'el-pollo-loco': {
        title: 'El Pollo Loco',
        technologies: 'HTML | CSS | JavaScript | Figma | GitHub',
        description: 'A 2D game in JavaScript in which you have to fight your way through chickens and, in the end, their boss.',
      },
    },
  },
  contact: {
    headline: 'Let’s talk business',
    text: 'Now you know a lot about me. If you need support with software development or have a problem where technology and software have to work together, send me an email or give me a call. I am available for new projects from April 2027.',
    infoHeadline: 'Contact information',
  },
  footer: {
    legal: 'Legal',
    imprint: 'Legal notice',
    privacy: 'Privacy policy',
  },
  notFound: {
    headline: 'Page not found',
    text: 'The page you requested does not exist or has been moved. You will find all content of this website on the homepage.',
    home: 'Go to homepage',
    portfolio: 'View portfolio',
  },
  legal: {
    germanOnly: 'This page is only available in German. The German version is legally binding.',
  },
};
