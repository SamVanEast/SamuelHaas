import { Component, ElementRef, afterNextRender, inject, input, output } from '@angular/core';
import { NavLink, SectionNavigationService } from '../core/section-navigation.service';
import { LanguageService } from '../i18n/language.service';
import { LanguageSwitchComponent } from '../language-switch/language-switch.component';

/**
 * Full-screen navigation for small screens. Closes via the close button, a click on the backdrop,
 * the Escape key or after choosing a section; keeps the keyboard focus inside while open.
 */
@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.scss'],
  imports: [LanguageSwitchComponent],
  host: {
    role: 'dialog',
    'aria-modal': 'true',
    '[attr.aria-label]': 'i18n.t().header.navigation',
    '(document:keydown.escape)': 'close()',
  },
})
export class MenuMobileComponent {
  readonly links = input.required<NavLink[]>();
  readonly closed = output<void>();
  protected readonly nav = inject(SectionNavigationService);
  protected readonly i18n = inject(LanguageService);
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;

  constructor() {
    afterNextRender(() => this.focusables()[1]?.focus());
  }

  close(): void {
    this.closed.emit();
  }

  select(id: NavLink['id'], event: Event): void {
    this.nav.goTo(id, event);
    this.close();
  }

  /**
   * closes the menu when the free area around the links is clicked
   */
  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  /**
   * keeps the focus inside the open menu when tabbing
   */
  trapFocus(event: Event): void {
    const backwards = (event as KeyboardEvent).shiftKey;
    const focusables = this.focusables();
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = this.host.ownerDocument.activeElement;
    if (backwards && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!backwards && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private focusables(): HTMLElement[] {
    return Array.from(this.host.querySelectorAll<HTMLElement>('button, a[href]'));
  }
}
