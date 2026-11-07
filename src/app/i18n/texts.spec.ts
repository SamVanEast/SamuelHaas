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

  it('should name the Wave platform on the Quantrefy card', () => {
    expect(DE.portfolio.projects.quantrefy.title).toContain('Wave');
    expect(EN.portfolio.projects.quantrefy.title).toContain('Wave');
  });
});
