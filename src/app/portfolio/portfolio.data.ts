export type ProjectId = 'quantrefy' | 'bytecookie' | 'lunch-menu-app' | 'order-terminal' | 'slack-clone' | 'join' | 'el-pollo-loco';

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

export const PROJECTS: Project[] = [
  {
    id: 'quantrefy',
    link: 'https://quantrefy.com',
    image: { widths: [480, 960, 1440], width: 960, height: 640 },
  },
  {
    id: 'bytecookie',
    link: 'https://www.bytecookie.net',
    image: { widths: [480, 960, 1440], width: 960, height: 479 },
  },
  {
    // kamasys is called menio today
    id: 'order-terminal',
    link: 'https://menio.com/portfolio/meniosot/',
    image: { widths: [480, 960], width: 960, height: 340 },
  },
  {
    id: 'lunch-menu-app',
    link: 'https://menio.com/portfolio/menioapp/',
    image: { widths: [480, 960, 1440], width: 960, height: 306 },
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
