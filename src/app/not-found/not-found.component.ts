import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionNavigationService } from '../core/section-navigation.service';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  imports: [RouterLink, RevealDirective],
})
export class NotFoundComponent {
  protected readonly nav = inject(SectionNavigationService);
}
