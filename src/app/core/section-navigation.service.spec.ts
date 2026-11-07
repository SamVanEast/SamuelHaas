import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { SectionNavigationService } from './section-navigation.service';
import { MockIntersectionObserver, installMockIntersectionObserver } from '../../testing/intersection-observer.mock';

@Component({ template: '<section id="portfolio"></section>' })
class FakeHomeComponent {}

@Component({ template: '<p>legal</p>' })
class FakeLegalComponent {}

describe('SectionNavigationService', () => {
  let service: SectionNavigationService;
  let router: Router;
  let scrollIntoView: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView as unknown as Element['scrollIntoView'];
    TestBed.configureTestingModule({
      providers: [provideRouter([
        { path: '', component: FakeHomeComponent },
        { path: 'impressum', component: FakeLegalComponent },
      ])],
    });
    service = TestBed.inject(SectionNavigationService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete (Element.prototype as Partial<Element>).scrollIntoView;
  });

  it('should scroll smoothly and update the fragment when already on the homepage', async () => {
    const harness = await RouterTestingHarness.create('/');
    const event = new Event('click', { cancelable: true });

    service.goTo('portfolio', event);
    await harness.fixture.whenStable();

    expect(event.defaultPrevented).toBe(true);
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    expect(router.url).toBe('/#portfolio');
  });

  it('should navigate to the homepage without a reload and then jump to the section', async () => {
    const harness = await RouterTestingHarness.create('/impressum');

    service.goTo('portfolio', new Event('click', { cancelable: true }));
    await harness.fixture.whenStable();

    expect(router.url).toBe('/#portfolio');
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'instant', block: 'start' });
  });

  it('should track the section in the middle of the viewport', () => {
    installMockIntersectionObserver();
    const about = Object.assign(document.createElement('section'), { id: 'about-me' });
    const contact = Object.assign(document.createElement('section'), { id: 'contact' });

    service.observeSections([about, contact]);
    MockIntersectionObserver.trigger(contact);
    expect(service.activeSection()).toBe('contact');

    MockIntersectionObserver.trigger(about);
    expect(service.activeSection()).toBe('about-me');
  });

  it('should reset the active section when the homepage is left', () => {
    installMockIntersectionObserver();
    const about = Object.assign(document.createElement('section'), { id: 'about-me' });
    service.observeSections([about]);
    MockIntersectionObserver.trigger(about);

    service.disconnect();

    expect(service.activeSection()).toBeNull();
    expect(MockIntersectionObserver.instances[0].disconnected).toBe(true);
  });
});
