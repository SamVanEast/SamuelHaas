import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FooterComponent } from './footer.component';
import { SectionNavigationService } from '../core/section-navigation.service';
import { useLanguage } from '../../testing/language';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideRouter([
        { path: 'impressum', children: [] },
        { path: 'datenschutz', children: [] },
      ])],
    }).compileComponents();

    useLanguage('de');
    fixture = TestBed.createComponent(FooterComponent);
    await fixture.whenStable();
  });

  afterEach(() => vi.restoreAllMocks());

  function legalLinks(): string[][] {
    const links = Array.from<HTMLAnchorElement>(fixture.nativeElement.querySelectorAll('.legal_link'));
    return links.map(link => [link.textContent.trim(), link.getAttribute('href')]);
  }

  it('should link to the imprint and the privacy policy', () => {
    expect(legalLinks()).toEqual([
      ['Impressum', '/impressum'],
      ['Datenschutz', '/datenschutz'],
    ]);
  });

  it('should translate the legal links', async () => {
    useLanguage('en');
    await fixture.whenStable();
    expect(legalLinks()).toEqual([
      ['Legal notice', '/impressum'],
      ['Privacy policy', '/datenschutz'],
    ]);
  });

  it('should scroll to the top when a legal page is opened', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    fixture.nativeElement.querySelectorAll('.legal_link').forEach((link: HTMLAnchorElement) => link.click());
    expect(scrollTo).toHaveBeenCalledTimes(2);
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
  });

  it('should take the logo back to the top of the homepage without a reload', () => {
    const goTo = vi.spyOn(TestBed.inject(SectionNavigationService), 'goTo').mockImplementation(() => undefined);
    const logo: HTMLAnchorElement = fixture.nativeElement.querySelector('.footer_logo_link');
    expect(logo.getAttribute('href')).toBe('/#welcome');
    logo.click();
    expect(goTo).toHaveBeenCalledWith('welcome', expect.any(MouseEvent));
  });

  it('should give every image link an accessible name', () => {
    const images = Array.from<HTMLImageElement>(fixture.nativeElement.querySelectorAll('a img'));
    expect(images.map(img => img.alt)).toEqual(['Samuel Haas', 'Xing', 'GitHub', 'LinkedIn']);
  });

  it('should open the social media profiles safely in a new tab', () => {
    const links = Array.from<HTMLAnchorElement>(fixture.nativeElement.querySelectorAll('.social_media a'));
    expect(links.length).toBe(3);
    links.forEach(link => {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });
});
