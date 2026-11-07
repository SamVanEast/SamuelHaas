import { ProjectId } from '../portfolio/portfolio.data';
import { SectionId } from '../core/section-navigation.service';

export type Language = 'de' | 'en';

export type PageTitleKey = 'home' | 'imprint' | 'privacy' | 'notFound';

export interface ProjectText {
  title: string;
  technologies: string;
  description: string;
}

export interface ContactFormTexts {
  name: string;
  email: string;
  message: string;
  submit: string;
  sending: string;
  /** "... more in the <link>privacy policy</link>." */
  privacyBefore: string;
  privacyLink: string;
  privacyAfter: string;
  errors: { name: string; email: string; message: string };
  success: string;
  sendAnother: string;
  /** followed by the e-mail address as a link */
  failure: string;
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
  contact: { headline: string; text: string; infoHeadline: string; form: ContactFormTexts };
  footer: { legal: string; imprint: string; privacy: string };
  notFound: { headline: string; text: string; home: string; portfolio: string };
  legal: { germanOnly: string };
}

/** Name of each language in the language itself, for labels of the language switch. */
export const LANGUAGE_NAMES: Record<Language, string> = {
  de: 'Deutsch',
  en: 'English',
};
