import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideRouter([{ path: 'impressum', children: [] }])],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
  });

  afterEach(() => vi.restoreAllMocks());

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should link to the imprint page', () => {
    const imprint: HTMLAnchorElement = fixture.nativeElement.querySelector('.impressum');
    expect(imprint.getAttribute('href')).toBe('/impressum');
  });

  it('should scroll to the top when the imprint is opened', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    fixture.nativeElement.querySelector('.impressum').click();
    expect(scrollTo).toHaveBeenCalledWith(0, 0);
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
