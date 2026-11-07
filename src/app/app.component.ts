import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SectionNavigationService } from './core/section-navigation.service';
import { LanguageService } from './i18n/language.service';
import { ThemeService } from './theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet],
})
export class AppComponent {
  constructor() {
    // created up front: the navigation already sees the first navigation (e.g. a deep link to /#portfolio),
    // language and theme are applied to <html> right at the start
    inject(SectionNavigationService);
    inject(LanguageService);
    inject(ThemeService);
  }
}
