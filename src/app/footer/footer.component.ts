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
   * scroll to the top, when imprint is showing
   */
  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
