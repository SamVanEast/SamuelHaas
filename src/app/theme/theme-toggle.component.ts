import { Component, inject } from '@angular/core';
import { LanguageService } from '../i18n/language.service';
import { ThemeService } from './theme.service';

/**
 * Toggle button for the dark mode (pressed = dark); shows a moon in light mode and a sun in dark mode.
 */
@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
})
export class ThemeToggleComponent {
  protected readonly theme = inject(ThemeService);
  protected readonly i18n = inject(LanguageService);
}
