import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeSectionComponent } from './welcome-section.component';

describe('WelcomeSectionComponent', () => {
  let fixture: ComponentFixture<WelcomeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeSectionComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should introduce Samuel Haas in the main heading of the page', () => {
    const headline: HTMLElement = fixture.nativeElement.querySelector('h1.welcome_headline');
    expect(headline.textContent).toContain('Samuel Haas');
  });

  it('should name Vue.js as the preferred framework', () => {
    const text: string = fixture.nativeElement.querySelector('.welcome_text').textContent;
    expect(text).toContain('Vue.js');
    expect(text).not.toContain('Angular');
  });

  it('should load the profile picture eagerly as responsive WebP', () => {
    const image: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(image.getAttribute('src')).toBe('assets/img/profile/welcome-960.webp');
    expect(image.getAttribute('srcset')).toContain('welcome-480.webp 480w');
    expect(image.getAttribute('srcset')).toContain('welcome-1920.webp 1920w');
    expect(image.getAttribute('loading')).toBeNull();
    expect(image.getAttribute('fetchpriority')).toBe('high');
    expect(image.getAttribute('width')).toBe('1920');
    expect(image.getAttribute('height')).toBe('1280');
  });
});
