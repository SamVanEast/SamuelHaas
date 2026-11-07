import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ImpressumComponent } from './impressum/impressum.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'impressum', component: ImpressumComponent },
];
