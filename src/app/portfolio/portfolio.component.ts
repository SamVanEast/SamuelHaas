import { Component } from '@angular/core';
import { RevealDirective } from '../shared/reveal.directive';
import { PROJECT_TEXTS, PROJECTS, Project } from './portfolio.data';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  imports: [RevealDirective],
})
export class PortfolioComponent {
  protected readonly projects = PROJECTS;
  protected readonly texts = PROJECT_TEXTS;

  /**
   * builds the srcset of a project image from its generated WebP widths
   */
  protected srcset(project: Project): string {
    return project.image.widths.map(w => `assets/img/projects/${project.id}-${w}.webp ${w}w`).join(', ');
  }
}
