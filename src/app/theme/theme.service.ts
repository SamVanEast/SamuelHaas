import { DOCUMENT, DestroyRef, Injectable, computed, effect, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const TRANSITION_CLASS = 'theme-transition';

/**
 * Light/dark appearance. Without an explicit choice the operating system setting applies (and nothing is stored);
 * a choice made with the toggle is remembered. index.html applies a remembered choice before the app starts.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly systemQuery = this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)');
  private readonly systemDark = signal(this.systemQuery?.matches ?? false);
  private readonly chosen = signal<Theme | null>(this.storedTheme());

  /** The appearance that is currently shown. */
  readonly theme = computed<Theme>(() => this.chosen() ?? (this.systemDark() ? 'dark' : 'light'));

  constructor() {
    const onSystemChange = (event: MediaQueryListEvent) => this.systemDark.set(event.matches);
    this.systemQuery?.addEventListener?.('change', onSystemChange);
    inject(DestroyRef).onDestroy(() => this.systemQuery?.removeEventListener?.('change', onSystemChange));

    // without a choice the attribute is removed, so the CSS media query follows the system setting
    effect(() => {
      const chosen = this.chosen();
      const root = this.document.documentElement;
      if (chosen) {
        root.setAttribute('data-theme', chosen);
      } else {
        root.removeAttribute('data-theme');
      }
    });
  }

  /**
   * switches between light and dark with a short colour transition and remembers the choice
   */
  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.animateTransition();
    this.chosen.set(next);
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage can be blocked (e.g. private mode); the appearance still switches
    }
  }

  private animateTransition(): void {
    const view = this.document.defaultView;
    if (!view || view.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const root = this.document.documentElement;
    root.classList.add(TRANSITION_CLASS);
    view.setTimeout(() => root.classList.remove(TRANSITION_CLASS), 400);
  }

  private storedTheme(): Theme | null {
    try {
      const stored = this.document.defaultView?.localStorage.getItem(STORAGE_KEY);
      return stored === 'light' || stored === 'dark' ? stored : null;
    } catch {
      return null;
    }
  }
}
