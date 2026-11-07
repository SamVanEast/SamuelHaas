import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TitleStrategy, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TranslatedTitleStrategy } from './i18n/translated-title.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // for the contact form (Web3Forms)
    provideHttpClient(withFetch()),
    { provide: TitleStrategy, useClass: TranslatedTitleStrategy },
  ],
};
