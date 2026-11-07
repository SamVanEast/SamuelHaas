import { Component, inject } from '@angular/core';
import { LanguageService } from '../i18n/language.service';
import { RevealDirective } from '../shared/reveal.directive';
import { PROJECTS, Project } from './portfolio.data';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  imports: [RevealDirective],
})
export class PortfolioComponent {
  protected readonly i18n = inject(LanguageService);
  protected readonly projects = PROJECTS;

  /**
   * builds the srcset of a project image from its generated WebP widths
   */
  protected srcset(project: Project): string {
    return project.image.widths.map(w => `assets/img/projects/${project.id}-${w}.webp ${w}w`).join(', ');
  }
}
