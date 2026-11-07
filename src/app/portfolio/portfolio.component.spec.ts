import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioComponent } from './portfolio.component';
import { PROJECTS } from './portfolio.data';
import { DE } from '../i18n/de';
import { EN } from '../i18n/en';
import { useLanguage } from '../../testing/language';

describe('PortfolioComponent', () => {
  let fixture: ComponentFixture<PortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PortfolioComponent] }).compileComponents();
    useLanguage('en');
    fixture = TestBed.createComponent(PortfolioComponent);
    await fixture.whenStable();
  });

  function cards(): HTMLAnchorElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('a.project'));
  }

  it('should have texts for every project in both languages', () => {
    PROJECTS.forEach(project => {
      for (const translations of [DE, EN]) {
        const texts = translations.portfolio.projects[project.id];
        expect(texts.title).toBeTruthy();
        expect(texts.technologies).toBeTruthy();
        expect(texts.description).toBeTruthy();
      }
    });
  });

  it('should show the project texts in the chosen language', async () => {
    useLanguage('de');
    await fixture.whenStable();
    expect(cards()[1].querySelector('h3').textContent).toBe(DE.portfolio.projects['lunch-menu-app'].title);
    expect(fixture.nativeElement.querySelector('.description').textContent).toBe(DE.portfolio.description);
  });

  it('should render one card per project that opens the project safely in a new tab', () => {
    expect(cards().length).toBe(PROJECTS.length);
    cards().forEach((card, i) => {
      const texts = EN.portfolio.projects[PROJECTS[i].id];
      expect(card.getAttribute('href')).toBe(PROJECTS[i].link);
      expect(card.getAttribute('target')).toBe('_blank');
      expect(card.getAttribute('rel')).toBe('noopener noreferrer');
      expect(card.querySelector('h3').textContent).toBe(texts.title);
      expect(card.querySelector('img').alt).toBe(texts.title);
    });
  });

  it('should lazy-load responsive WebP project images with a fixed aspect ratio', () => {
    cards().forEach((card, i) => {
      const image = card.querySelector('img');
      const project = PROJECTS[i];
      expect(image.getAttribute('src')).toBe(`assets/img/projects/${project.id}-960.webp`);
      expect(image.getAttribute('srcset')).toBe(
        project.image.widths.map(w => `assets/img/projects/${project.id}-${w}.webp ${w}w`).join(', '),
      );
      expect(image.getAttribute('loading')).toBe('lazy');
      expect(image.getAttribute('width')).toBe(String(project.image.width));
      expect(image.getAttribute('height')).toBe(String(project.image.height));
    });
  });

  it('should slide the cards in from alternating sides', () => {
    expect(cards()[0].classList).toContain('reveal--left');
    expect(cards()[1].classList).toContain('reveal--right');
    expect(fixture.nativeElement.querySelector('.portfolio_header').classList).toContain('reveal--right');
  });
});
