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

  it('should not promise "everything from one source" or sound high-flown', () => {
    for (const text of [...allTexts(DE), ...allTexts(EN)]) {
      expect(text).not.toMatch(/aus einer Hand|from one person|Wissen weitergegeben|passed on what I know|wenn ein Projekt es braucht|if a project needs it/i);
    }
  });
});
