import { Component, inject } from '@angular/core';
import { LanguageService } from '../i18n/language.service';
import { LANGUAGE_NAMES } from '../i18n/translations';

/**
 * Two toggle buttons (DE | EN) that switch the language without reloading the page.
 */
@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss'],
})
export class LanguageSwitchComponent {
  protected readonly i18n = inject(LanguageService);
  protected readonly names = LANGUAGE_NAMES;
}
