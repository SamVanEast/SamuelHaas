import { Component, inject } from '@angular/core';
import { LanguageService } from '../i18n/language.service';

/** Privacy policy; only available in German, which is the legally binding version. */
@Component({
  selector: 'app-datenschutz',
  templateUrl: './datenschutz.component.html',
})
export class DatenschutzComponent {
  protected readonly i18n = inject(LanguageService);
}
