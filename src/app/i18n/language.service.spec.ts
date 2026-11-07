import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';
import { DE } from './de';
import { EN } from './en';
import { Translations } from './translations';

describe('LanguageService', () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  function create(browserLanguages: string[]): LanguageService {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(browserLanguages);
    return TestBed.inject(LanguageService);
  }

  it('should start with German for a German browser', () => {
    expect(create(['de-DE', 'en']).language()).toBe('de');
  });

  it('should start with English for an English browser', () => {
    expect(create(['en-GB']).language()).toBe('en');
  });

  it('should pick the first supported language of the browser preferences', () => {
    expect(create(['fr-FR', 'en-US', 'de']).language()).toBe('en');
  });

  it('should fall back to German for any other browser language', () => {
    expect(create(['fr-FR', 'it']).language()).toBe('de');
  });

  it('should not store anything without an explicit choice', () => {
    create(['en-US']);
    expect(localStorage.getItem('language')).toBeNull();
  });

  it('should prefer a remembered choice over the browser language', () => {
    localStorage.setItem('language', 'de');
    expect(create(['en-US']).language()).toBe('de');
  });

  it('should switch the texts and the document language without reloading and remember the choice', () => {
    const service = create(['de-DE']);
    expect(service.t()).toBe(DE);

    service.setLanguage('en');
    TestBed.tick();

    expect(service.t()).toBe(EN);
    expect(document.documentElement.lang).toBe('en');
    expect(localStorage.getItem('language')).toBe('en');
  });

  it('should still switch when the browser storage is blocked', () => {
    const service = create(['de-DE']);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    service.setLanguage('en');
    expect(service.language()).toBe('en');
  });

  it('should provide every text in both languages', () => {
    const keys = (value: unknown, prefix = ''): string[] =>
      value && typeof value === 'object'
        ? Object.entries(value).flatMap(([key, child]) => keys(child, `${prefix}${key}.`))
        : [prefix];
    expect(keys(EN)).toEqual(keys(DE));
    const empty = (translations: Translations) => keys(translations).filter(key => {
      const value = key.split('.').filter(Boolean).reduce((node: any, part) => node[part], translations);
      return value === '' && key !== 'legal.germanOnly.';
    });
    expect(empty(DE)).toEqual([]);
    expect(empty(EN)).toEqual([]);
  });
});
