import { Component, inject } from '@angular/core';
import { LanguageService } from '../i18n/language.service';

/** Imprint; only available in German, which is the legally binding version. */
@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
})
export class ImpressumComponent {
  protected readonly i18n = inject(LanguageService);
}
