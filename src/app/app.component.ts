import { Component, DOCUMENT, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SectionNavigationService } from './core/section-navigation.service';
import { LanguageService } from './i18n/language.service';
import { ThemeService } from './theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet],
})
export class AppComponent {
  protected readonly i18n = inject(LanguageService);
  private readonly document = inject(DOCUMENT);

  constructor() {
    // created up front: the navigation already sees the first navigation (e.g. a deep link to /#portfolio),
    // language and theme are applied to <html> right at the start
    inject(SectionNavigationService);
    inject(ThemeService);
  }

  /**
   * moves the keyboard focus past the navigation to the main content of the current page
   */
  skipToContent(event: Event): void {
    event.preventDefault();
    const main = this.document.querySelector<HTMLElement>('main');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus();
    }
  }
}
