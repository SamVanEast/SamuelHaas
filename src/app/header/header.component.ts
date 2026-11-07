import { Component, DOCUMENT, DestroyRef, ElementRef, effect, inject, signal, viewChild } from '@angular/core';
import { SectionNavigationService } from '../core/section-navigation.service';
import { NAV_LINKS } from '../core/nav-links';
import { LanguageService } from '../i18n/language.service';
import { LanguageSwitchComponent } from '../language-switch/language-switch.component';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';
import { ThemeToggleComponent } from '../theme/theme-toggle.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [MenuMobileComponent, LanguageSwitchComponent, ThemeToggleComponent],
})
export class HeaderComponent {
  protected readonly nav = inject(SectionNavigationService);
  protected readonly i18n = inject(LanguageService);
  protected readonly links = NAV_LINKS;
  readonly menuOpen = signal(false);
  private readonly menuButton = viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');
  private readonly document = inject(DOCUMENT);

  constructor() {
    const destroyRef = inject(DestroyRef);

    // no scrolling of the page behind the open mobile menu
    effect(() => {
      this.document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
    });
    destroyRef.onDestroy(() => (this.document.body.style.overflow = ''));

    // the mobile menu does not exist on desktop layouts, so close it when the viewport grows
    const desktop = this.document.defaultView?.matchMedia?.('(min-width: 771px)');
    const onBreakpointChange = (event: MediaQueryListEvent) => event.matches && this.closeMenu(false);
    desktop?.addEventListener?.('change', onBreakpointChange);
    destroyRef.onDestroy(() => desktop?.removeEventListener?.('change', onBreakpointChange));
  }

  openMenu(): void {
    this.menuOpen.set(true);
  }

  /**
   * closes the mobile menu and, unless the layout switched to desktop, gives the focus back to the menu button
   */
  closeMenu(restoreFocus = true): void {
    if (!this.menuOpen()) {
      return;
    }
    this.menuOpen.set(false);
    if (restoreFocus) {
      this.menuButton().nativeElement.focus({ preventScroll: true });
    }
  }
}
