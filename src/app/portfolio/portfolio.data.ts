export type ProjectId = 'bytecookie' | 'lunch-menu-app' | 'order-terminal' | 'slack-clone' | 'join' | 'el-pollo-loco';

export interface ProjectImage {
  /** Generated WebP widths, see scripts/optimize-images.mjs */
  widths: number[];
  /** Intrinsic size of the 960px variant, used to reserve the space before the image has loaded */
  width: number;
  height: number;
}

export interface Project {
  id: ProjectId;
  link: string;
  image: ProjectImage;
}

export interface ProjectText {
  title: string;
  technologies: string;
  description: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'bytecookie',
    link: 'https://www.bytecookie.net',
    image: { widths: [480, 960, 1440], width: 960, height: 479 },
  },
  {
    id: 'lunch-menu-app',
    link: 'https://www.kamasys.de/index.php/portfolio/mittagstisch/#',
    image: { widths: [480, 960, 1440], width: 960, height: 306 },
  },
  {
    id: 'order-terminal',
    link: 'https://www.kamasys.de/index.php/portfolio/kassensysteme-selbstbedienung/',
    image: { widths: [480, 960], width: 960, height: 340 },
  },
  {
    id: 'slack-clone',
    link: 'https://slack-clone-5e282.web.app',
    image: { widths: [480, 960, 1440], width: 960, height: 640 },
  },
  {
    id: 'join',
    link: 'https://michelbente.com/projects/join-main/join-main/index.html',
    image: { widths: [480, 960, 1440], width: 960, height: 540 },
  },
  {
    id: 'el-pollo-loco',
    link: 'https://samuel-haas.developerakademie.net/Modul-11/El-Pollo-Locco/index.html',
    image: { widths: [480, 960, 1440], width: 960, height: 640 },
  },
];

export const PROJECT_TEXTS: Record<ProjectId, ProjectText> = {
  'bytecookie': {
    title: 'ByteCookie',
    technologies: 'Vue.js | TypeScript | HTML | SCSS | REST-API | Scrum | Jira | Confluence | Bitbucket | Swagger | Figma',
    description: 'ByteCookie is the world’s first cooperative marketplace and social network for IT freelancers, precisely connecting clients and freelance experts. Thanks to a verified expert network, the platform automatically recommends the best freelance profiles for each project. We deliberately focus on maximum performance and data privacy by completely avoiding external advertising, cookies, or tracking scripts. Headquartered in Frankfurt am Main with a dedicated team of 11 to 50 employees, ByteCookie combines personal support with modern, digital project placement.',
  },
  'lunch-menu-app': {
    title: 'Lunch menu app',
    technologies: 'Cordova | AngularJS | HTML | LESS | REST-API | Scrum | Jira | Confluence | Bitbucket | Swagger | New versions prepared and released in the respective store | Full Dependency Upgrade',
    description: 'A modular white-label solution for mobile devices: display of current menus, ordering and payment functions, dashboards for occupancy and feedback, as well as numerous additional modules (e.g., voting, news, recipes, ordering options, photo booth, customer frequency counter).',
  },
  'order-terminal': {
    title: 'Order terminal',
    technologies: 'Vue.Js | TypeScript | HTML | SCSS | various payment methods | C# | REST-API | Scrum | Jira | Confluence | Bitbucket | Swagger | Full Dependency Upgrade',
    description: 'Ordering terminal with an intuitive touch interface, shopping cart, and contactless payment function. Guests easily navigate through the digital menu, select their dishes, and pick them up at the counter at their desired time.',
  },
  'slack-clone': {
    title: 'Slack Clone',
    technologies: 'HTML | CSS | TypeScript | Angular | Firebase | Figma | Github | REST-API',
    description: 'Slack Clone is a messenger service.',
  },
  'join': {
    title: 'Join',
    technologies: 'HTML | CSS | JavaScript | Figma | Github',
    description: 'Join is a very clear Kanban board to perfectly plan the day.',
  },
  'el-pollo-loco': {
    title: 'El pollo loco',
    technologies: 'HTML | CSS | JavaScript | Figma | Github',
    description: 'El pollo loco is a 2D game in which you have to beat chickens and their boss.',
  },
};
