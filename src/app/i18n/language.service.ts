import { DOCUMENT, Injectable, computed, effect, inject, signal } from '@angular/core';
import { DE } from './de';
import { EN } from './en';
import { Language, Translations } from './translations';

const STORAGE_KEY = 'language';
const FALLBACK: Language = 'de';
const TRANSLATIONS: Record<Language, Translations> = { de: DE, en: EN };

/**
 * Holds the current language and its texts. Switching the language only swaps the texts (no page reload).
 * Without an explicit choice the browser languages decide; German is the fallback.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  readonly languages: Language[] = ['de', 'en'];
  readonly language = signal<Language>(this.initialLanguage());
  /** Texts in the current language. */
  readonly t = computed(() => TRANSLATIONS[this.language()]);

  constructor() {
    effect(() => this.document.documentElement.setAttribute('lang', this.language()));
  }

  /**
   * switches the language and remembers the choice in the browser for the next visit
   */
  setLanguage(language: Language): void {
    this.language.set(language);
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // storage can be blocked (e.g. private mode); the language still switches
    }
  }

  private initialLanguage(): Language {
    const view = this.document.defaultView;
    let stored: string | null = null;
    try {
      stored = view?.localStorage.getItem(STORAGE_KEY) ?? null;
    } catch {
      stored = null;
    }
    if (this.isSupported(stored)) {
      return stored;
    }
    const preferred = view?.navigator.languages?.length ? view.navigator.languages : [view?.navigator.language ?? ''];
    for (const tag of preferred) {
      const base = tag.toLowerCase().split('-')[0];
      if (this.isSupported(base)) {
        return base;
      }
    }
    return FALLBACK;
  }

  private isSupported(value: string | null): value is Language {
    return value === 'de' || value === 'en';
  }
}
