import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatenschutzComponent } from './datenschutz.component';

describe('DatenschutzComponent', () => {
  let fixture: ComponentFixture<DatenschutzComponent>;
  let text: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatenschutzComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatenschutzComponent);
    fixture.detectChanges();
    text = fixture.nativeElement.textContent;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show a dated privacy policy', () => {
    expect(fixture.nativeElement.querySelector('h1').textContent).toBe('Datenschutzerklärung');
    expect(fixture.nativeElement.querySelector('.legal_meta').textContent).toMatch(/^Stand: /);
  });

  it('should name the controller with the current contact details', () => {
    expect(text).toContain('Samuel Haas');
    expect(text).toContain('72336 Balingen');
    expect(fixture.nativeElement.querySelector('a[href="tel:+4915756775354"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('a[href="mailto:info@samuel-haas.com"]')).not.toBeNull();
  });

  it('should cover hosting, contact, external links, rights and the supervisory authority', () => {
    const headings = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('h2')).map(h => h.textContent);
    expect(headings).toEqual([
      '1. Verantwortlicher',
      '2. Das Wichtigste in Kürze',
      '3. Hosting und Server-Logdaten',
      '4. Kontaktaufnahme per E-Mail oder Telefon',
      '5. Links zu externen Websites',
      '6. Ihre Rechte',
      '7. Beschwerderecht bei einer Aufsichtsbehörde',
      '8. Automatisierte Entscheidungen',
      '9. Änderungen dieser Datenschutzerklärung',
    ]);
    expect(text).toContain('Firebase Hosting');
    expect(text).toContain('EU-US Data Privacy Framework');
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
});
