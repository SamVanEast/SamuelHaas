import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LegalLayoutComponent } from './legal-layout/legal-layout.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PageTitleKey } from './i18n/translations';

// the titles are translation keys, see TranslatedTitleStrategy
export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomepageComponent, title: 'home' satisfies PageTitleKey },
  {
    path: '',
    component: LegalLayoutComponent,
    children: [
      { path: 'impressum', component: ImpressumComponent, title: 'imprint' satisfies PageTitleKey },
      { path: 'datenschutz', component: DatenschutzComponent, title: 'privacy' satisfies PageTitleKey },
      // Firebase answers unknown paths with index.html (status 200), so the page itself keeps them out of search results
      { path: '**', component: NotFoundComponent, title: 'notFound' satisfies PageTitleKey, data: { noindex: true } },
    ],
  },
];
