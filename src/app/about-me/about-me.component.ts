import { Component, inject } from '@angular/core';
import { LanguageService } from '../i18n/language.service';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  imports: [RevealDirective],
})
export class AboutMeComponent {
  protected readonly i18n = inject(LanguageService);
}
