import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LegalLayoutComponent } from './legal-layout/legal-layout.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomepageComponent, title: 'Samuel Haas' },
  {
    path: '',
    component: LegalLayoutComponent,
    children: [
      { path: 'impressum', component: ImpressumComponent, title: 'Impressum – Samuel Haas' },
      { path: 'datenschutz', component: DatenschutzComponent, title: 'Datenschutzerklärung – Samuel Haas' },
    ],
  },
];
