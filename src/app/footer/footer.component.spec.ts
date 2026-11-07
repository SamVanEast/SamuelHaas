import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FooterComponent } from './footer.component';

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

    fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
  });

  afterEach(() => vi.restoreAllMocks());

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should link to the imprint and the privacy policy', () => {
    const links = Array.from<HTMLAnchorElement>(fixture.nativeElement.querySelectorAll('.legal_link'));
    expect(links.map(link => [link.textContent.trim(), link.getAttribute('href')])).toEqual([
      ['Impressum', '/impressum'],
      ['Datenschutz', '/datenschutz'],
    ]);
  });

  it('should scroll to the top when a legal page is opened', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    fixture.nativeElement.querySelectorAll('.legal_link').forEach((link: HTMLAnchorElement) => link.click());
    expect(scrollTo).toHaveBeenCalledTimes(2);
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
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
