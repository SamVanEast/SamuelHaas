import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatenschutzComponent } from './datenschutz.component';
import { useLanguage } from '../../testing/language';

describe('DatenschutzComponent', () => {
  let fixture: ComponentFixture<DatenschutzComponent>;
  let text: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatenschutzComponent],
    }).compileComponents();

    useLanguage('de');
    fixture = TestBed.createComponent(DatenschutzComponent);
    await fixture.whenStable();
    text = fixture.nativeElement.querySelector('article').textContent;
  });

  it('should show a dated privacy policy marked as German', () => {
    const article: HTMLElement = fixture.nativeElement.querySelector('article');
    expect(article.getAttribute('lang')).toBe('de');
    expect(article.querySelector('h1')?.textContent).toBe('Datenschutzerklärung');
    expect(article.querySelector('.legal_meta')?.textContent).toMatch(/^Stand: /);
  });

  it('should name the controller with the current contact details', () => {
    expect(text).toContain('Samuel Haas');
    expect(text).toContain('72336 Balingen');
    expect(fixture.nativeElement.querySelector('a[href="tel:+4915756775354"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('a[href="mailto:info@samuel-haas.com"]')).not.toBeNull();
  });

  it('should cover hosting, contact, stored settings, external links, rights and the supervisory authority', () => {
    const headings = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('h2')).map(h => h.textContent);
    expect(headings).toEqual([
      '1. Verantwortlicher',
      '2. Das Wichtigste in Kürze',
      '3. Hosting und Server-Logdaten',
      '4. Kontaktaufnahme per E-Mail oder Telefon',
      '5. Speicherung Ihrer Einstellungen im Browser',
      '6. Links zu externen Websites',
      '7. Ihre Rechte',
      '8. Beschwerderecht bei einer Aufsichtsbehörde',
      '9. Automatisierte Entscheidungen',
      '10. Änderungen dieser Datenschutzerklärung',
    ]);
    expect(text).toContain('Firebase Hosting');
    expect(text).toContain('EU-US Data Privacy Framework');
    expect(text).toContain('§ 25 Abs. 2 Nr. 2 TDDDG');
    expect(text).toContain('Art. 21 DSGVO');
    expect(text).toContain('Baden-Württemberg');
  });

  it('should only refer to retention duties that apply to a freelancer', () => {
    expect(text).toContain('insbesondere steuerrechtliche');
    expect(text).not.toMatch(/handels/i);
  });

  it('should open external links safely in a new tab', () => {
    const external = Array.from<HTMLAnchorElement>(fixture.nativeElement.querySelectorAll('a[href^="https://"]'));
    expect(external.length).toBeGreaterThan(0);
    external.forEach(link => {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });

  it('should not contain leftover template placeholders', () => {
    expect(text).not.toMatch(/\[[^\]]+\]/);
    expect(text).not.toContain('Telefax');
  });

  it('should only show the English hint about the binding German version in English mode', async () => {
    expect(fixture.nativeElement.querySelector('.legal_language_note')).toBeNull();

    useLanguage('en');
    await fixture.whenStable();

    const note: HTMLElement = fixture.nativeElement.querySelector('.legal_language_note');
    expect(note.getAttribute('lang')).toBe('en');
    expect(note.textContent).toContain('only available in German');
  });
});
