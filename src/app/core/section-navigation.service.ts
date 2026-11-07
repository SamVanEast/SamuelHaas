import { DOCUMENT, Injectable, Injector, afterNextRender, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export type SectionId = 'welcome' | 'about-me' | 'portfolio' | 'contact';

export interface NavLink {
  id: Exclude<SectionId, 'welcome'>;
}

/**
 * Scrolls to the sections of the homepage from anywhere in the app (without a page reload)
 * and tracks which section is currently in view.
 */
@Injectable({ providedIn: 'root' })
export class SectionNavigationService {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);
  private observer?: IntersectionObserver;
  private currentPath: string | null = null;

  /** The homepage section that currently crosses the middle of the viewport. */
  readonly activeSection = signal<SectionId | null>(null);

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => this.onNavigationEnd(event.urlAfterRedirects));
  }

  /**
   * Navigates to a homepage section. Used as click handler of links whose href points to the same section,
   * so the links keep working without JavaScript and when opened in a new tab.
   */
  goTo(id: SectionId, event?: Event): void {
    event?.preventDefault();
    if (this.isOnHomepage()) {
      this.scrollToSection(id, 'smooth');
      this.router.navigate([], { fragment: id, replaceUrl: true });
    } else {
      this.router.navigate(['/'], { fragment: id });
    }
  }

  /**
   * Starts tracking which of the given section elements is in view.
   */
  observeSections(elements: HTMLElement[]): void {
    this.disconnect();
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }
    this.observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id as SectionId);
          }
        }
      },
      // a line across the middle of the viewport
      { rootMargin: '-50% 0px -50% 0px' },
    );
    elements.forEach(element => this.observer!.observe(element));
  }

  /**
   * Stops tracking the sections, e.g. when the homepage is left.
   */
  disconnect(): void {
    this.observer?.disconnect();
    this.observer = undefined;
    this.activeSection.set(null);
  }

  private onNavigationEnd(url: string): void {
    const [path, fragment] = url.split('#');
    const pathChanged = path.split('?')[0] !== this.currentPath;
    this.currentPath = path.split('?')[0];
    // fragment changes on the same page are already scrolled by goTo()
    if (pathChanged && fragment) {
      afterNextRender(() => this.scrollToSection(fragment as SectionId, 'instant'), { injector: this.injector });
    }
  }

  private isOnHomepage(): boolean {
    return this.router.url.split(/[?#]/)[0] === '/';
  }

  private scrollToSection(id: SectionId, behavior: ScrollBehavior): void {
    const reduceMotion = this.document.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    this.document.getElementById(id)?.scrollIntoView?.({ behavior: reduceMotion ? 'instant' : behavior, block: 'start' });
  }
}
