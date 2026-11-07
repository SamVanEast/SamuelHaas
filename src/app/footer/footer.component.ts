import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionNavigationService } from '../core/section-navigation.service';
import { LanguageService } from '../i18n/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [RouterLink],
})
export class FooterComponent {
  protected readonly nav = inject(SectionNavigationService);
  protected readonly i18n = inject(LanguageService);

  /**
   * scroll to the top when a legal page is opened;
   * instant, because a smooth scroll is cancelled when the router swaps the page
   */
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}
