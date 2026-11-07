import { Component, inject } from '@angular/core';
import { LanguageService } from '../i18n/language.service';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-welcome-section',
  templateUrl: './welcome-section.component.html',
  styleUrls: ['./welcome-section.component.scss'],
  imports: [RevealDirective],
})
export class WelcomeSectionComponent {
  protected readonly i18n = inject(LanguageService);
}
