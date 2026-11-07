import { ProjectId } from '../portfolio/portfolio.data';
import { SectionId } from '../core/section-navigation.service';

export type Language = 'de' | 'en';

export type PageTitleKey = 'home' | 'imprint' | 'privacy' | 'notFound';

export interface ProjectText {
  title: string;
  technologies: string;
  description: string;
}

/** All texts of the website that change with the language. */
export interface Translations {
  skipToContent: string;
  /** The home title doubles as the title of link previews, see SeoService. */
  pageTitles: Record<PageTitleKey, string>;
  /** Description for search results and link previews, see SeoService. */
  metaDescription: string;
  nav: Record<Exclude<SectionId, 'welcome'>, string>;
  header: {
    mainNavigation: string;
    navigation: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    darkMode: string;
  };
  welcome: { headline: string; text: string; portraitAlt: string };
  about: { headline: string; text: string[]; portraitAlt: string };
  portfolio: { headline: string; description: string; projects: Record<ProjectId, ProjectText> };
  contact: { headline: string; text: string; infoHeadline: string };
  footer: { legal: string; imprint: string; privacy: string };
  notFound: { headline: string; text: string; home: string; portfolio: string };
  legal: { germanOnly: string };
}

/** Name of each language in the language itself, for labels of the language switch. */
export const LANGUAGE_NAMES: Record<Language, string> = {
  de: 'Deutsch',
  en: 'English',
};
