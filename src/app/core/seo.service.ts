import { DOCUMENT, Injectable, effect, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LanguageService } from '../i18n/language.service';
import { Language } from '../i18n/translations';

/** Public address of the website, used for canonical links and link previews. */
export const SITE_URL = 'https://samuel-haas.com';

const OG_LOCALES: Record<Language, string> = { de: 'de_DE', en: 'en_US' };

/**
 * Keeps the meta tags for search engines and link previews in line with the current language and page.
 * index.html holds the German defaults for crawlers that don't run JavaScript.
 * Routes with `data: { noindex: true }` are kept out of search results.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly i18n = inject(LanguageService);

  constructor() {
    effect(() => {
      const texts = this.i18n.t();
      this.meta.updateTag({ name: 'description', content: texts.metaDescription });
      this.meta.updateTag({ property: 'og:title', content: texts.pageTitles.home });
      this.meta.updateTag({ property: 'og:description', content: texts.metaDescription });
      this.meta.updateTag({ property: 'og:locale', content: OG_LOCALES[this.i18n.language()] });
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => this.updatePage());
  }

  /**
   * points the canonical link to the current page, or hides the page from search engines
   */
  private updatePage(): void {
    if (this.deepestRoute(this.router.routerState.snapshot.root).data['noindex']) {
      this.meta.updateTag({ name: 'robots', content: 'noindex' });
      this.canonicalLink()?.remove();
      return;
    }
    const path = this.router.url.split(/[?#]/)[0];
    const url = SITE_URL + path;
    this.meta.removeTag('name="robots"');
    this.meta.updateTag({ property: 'og:url', content: url });
    let link = this.canonicalLink();
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }

  private canonicalLink(): HTMLLinkElement | null {
    return this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  }

  private deepestRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    return route.firstChild ? this.deepestRoute(route.firstChild) : route;
  }
}
