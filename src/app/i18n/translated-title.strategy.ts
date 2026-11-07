import { Injectable, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { LanguageService } from './language.service';
import { PageTitleKey } from './translations';

/**
 * Builds the browser tab title from the route's title key in the current language
 * and updates it when the language changes.
 */
@Injectable({ providedIn: 'root' })
export class TranslatedTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly i18n = inject(LanguageService);
  private snapshot?: RouterStateSnapshot;

  constructor() {
    super();
    effect(() => {
      this.i18n.language();
      if (this.snapshot) {
        this.updateTitle(this.snapshot);
      }
    });
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.snapshot = snapshot;
    const key = this.buildTitle(snapshot) as PageTitleKey | undefined;
    const texts = this.i18n.t();
    this.title.setTitle(key && key !== 'home' ? `${texts.pageTitles[key]} – Samuel Haas` : texts.pageTitles.home);
  }
}
