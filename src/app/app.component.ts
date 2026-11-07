import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SectionNavigationService } from './core/section-navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet],
})
export class AppComponent {
  constructor() {
    // created up front so that it already sees the first navigation (e.g. a deep link to /#portfolio)
    inject(SectionNavigationService);
  }
}
