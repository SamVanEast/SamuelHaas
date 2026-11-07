import { DE } from './de';
import { EN } from './en';

/** Collects every text of a dictionary, however deeply it is nested. */
function allTexts(value: unknown): string[] {
  if (typeof value === 'string') {
    return [value];
  }
  return Object.values(value as object).flatMap(allTexts);
}

describe('website texts', () => {
  it('should present the business confidently, without "background" or "in the future" phrases', () => {
    for (const text of [...allTexts(DE), ...allTexts(EN)]) {
      expect(text).not.toMatch(/Hintergrund|background|in Zukunft|in the future/i);
    }
  });

  it('should not mention the Quantrefy platform name, which is not public yet', () => {
    for (const text of [...allTexts(DE), ...allTexts(EN)]) {
      expect(text).not.toMatch(/\bWave\b/);
    }
  });

  it('should not use dashes between sentence parts, they read like generated text', () => {
    for (const text of [...allTexts(DE), ...allTexts(EN)]) {
      expect(text).not.toMatch(/[–—]| - /);
    }
  });

  it('should avoid wording the user rejected as weak or high-flown', () => {
    const rejected = [
      /aus einer Hand|from one person/i,
      /Wissen weitergegeben|passed on what I know|beigebracht, was ich selbst gelernt|taught others what I had learned/i,
      /wenn ein Projekt es braucht|if a project needs it|ab und zu|every now and then/i,
      /gehören für mich zusammen|belong together/i,
      /kann ich Sie|I can support/i,
      /unterstütze auch Projekte|also support projects/i,
      /wer hätte gedacht|who would have thought/i,
    ];
    for (const text of [...allTexts(DE), ...allTexts(EN)]) {
      rejected.forEach(pattern => expect(text).not.toMatch(pattern));
    }
  });
});
