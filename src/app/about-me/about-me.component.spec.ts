import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutMeComponent } from './about-me.component';
import { MockIntersectionObserver, installMockIntersectionObserver } from '../../testing/intersection-observer.mock';

describe('AboutMeComponent', () => {
  let fixture: ComponentFixture<AboutMeComponent>;

  async function render() {
    await TestBed.configureTestingModule({ imports: [AboutMeComponent] }).compileComponents();
    fixture = TestBed.createComponent(AboutMeComponent);
    await fixture.whenStable();
  }

  afterEach(() => vi.unstubAllGlobals());

  it('should show a heading and the introduction text', async () => {
    await render();
    expect(fixture.nativeElement.querySelector('h2').textContent.trim()).toBe('About me');
    expect(fixture.nativeElement.querySelector('p.about_me_text').textContent).toContain('Samuel Haas');
  });

  it('should slide the description in from the right once it scrolls into view', async () => {
    installMockIntersectionObserver();
    await render();
    const description: HTMLElement = fixture.nativeElement.querySelector('.about_me_description');
    expect(description.classList).toContain('reveal--right');
    expect(description.classList).not.toContain('is-visible');

    MockIntersectionObserver.trigger(description);
    await fixture.whenStable();

    expect(description.classList).toContain('is-visible');
  });

  it('should lazy-load the portrait as responsive WebP', async () => {
    await render();
    const image: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(image.getAttribute('srcset')).toContain('about-480.webp 480w');
    expect(image.getAttribute('loading')).toBe('lazy');
    expect(image.alt).toBe('Portrait of Samuel Haas');
  });
});
