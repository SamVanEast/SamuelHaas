import { Component, inject } from '@angular/core';
import { LanguageService } from '../i18n/language.service';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [RevealDirective],
})
export class ContactComponent {
  protected readonly i18n = inject(LanguageService);
}
