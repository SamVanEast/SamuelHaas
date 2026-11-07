import { Component, inject } from '@angular/core';
import { LanguageService } from '../i18n/language.service';
import { RevealDirective } from '../shared/reveal.directive';
import { ContactFormComponent } from './contact-form/contact-form.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [RevealDirective, ContactFormComponent],
})
export class ContactComponent {
  protected readonly i18n = inject(LanguageService);
}
