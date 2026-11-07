import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { SITE_URL, SeoService } from './seo.service';
import { routes } from '../app.routes';
import { DE } from '../i18n/de';
import { EN } from '../i18n/en';
import { useLanguage } from '../../testing/language';

@Component({ template: '' })
class PageStubComponent {}

describe('SeoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: PageStubComponent },
          { path: 'impressum', component: PageStubComponent },
          { path: '**', component: PageStubComponent, data: { noindex: true } },
        ]),
      ],
    });
    useLanguage('de');
    TestBed.inject(SeoService);
  });

  afterEach(() => {
    document.head.querySelectorAll('meta[name], meta[property], link[rel="canonical"]').forEach(tag => tag.remove());
  });

  function meta(selector: string): string | null {
    return document.head.querySelector(`meta[${selector}]`)?.getAttribute('content') ?? null;
  }

  function canonical(): string | null {
    return document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.getAttribute('href') ?? null;
  }

  it('should describe the website in the current language and follow a language switch', () => {
    TestBed.tick();
    expect(meta('name="description"')).toBe(DE.metaDescription);
    expect(meta('property="og:title"')).toBe(DE.pageTitles.home);
    expect(meta('property="og:locale"')).toBe('de_DE');

    useLanguage('en');
    TestBed.tick();
    expect(meta('name="description"')).toBe(EN.metaDescription);
    expect(meta('property="og:description"')).toBe(EN.metaDescription);
    expect(meta('property="og:locale"')).toBe('en_US');
  });

  it('should point the canonical link to the current page without fragment or query', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/impressum?ref=test');
    expect(canonical()).toBe(`${SITE_URL}/impressum`);
    expect(meta('property="og:url"')).toBe(`${SITE_URL}/impressum`);

    await harness.navigateByUrl('/#portfolio');
    expect(canonical()).toBe(`${SITE_URL}/`);
    expect(meta('name="robots"')).toBeNull();
  });

  it('should keep unknown pages out of search results and index real pages again afterwards', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/gibt-es-nicht');
    expect(meta('name="robots"')).toBe('noindex');
    expect(canonical()).toBeNull();

    await harness.navigateByUrl('/');
    expect(meta('name="robots"')).toBeNull();
    expect(canonical()).toBe(`${SITE_URL}/`);
  });

  it('should mark the not-found route of the app as noindex', () => {
    const legal = routes.find(route => route.children);
    expect(legal?.children?.find(route => route.path === '**')?.data?.['noindex']).toBe(true);
  });
});
