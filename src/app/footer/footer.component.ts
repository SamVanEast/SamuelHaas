import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterLink],
})
export class FooterComponent {
  /**
   * scroll to the top when a legal page is opened;
   * instant, because a smooth scroll is cancelled when the router swaps the page
   */
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}
