import { TestBed } from '@angular/core/testing';
import { LanguageService } from '../app/i18n/language.service';
import { Language } from '../app/i18n/translations';

/**
 * Sets the language for a test without storing it (jsdom reports "en-US" as browser language,
 * so English is the default in tests).
 */
export function useLanguage(language: Language): void {
  TestBed.inject(LanguageService).language.set(language);
}
