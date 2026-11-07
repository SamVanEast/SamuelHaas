import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-welcome-section',
  templateUrl: './welcome-section.component.html',
  styleUrls: ['./welcome-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class WelcomeSectionComponent {}
