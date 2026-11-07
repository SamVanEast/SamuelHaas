import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class HeaderComponent {
  public showMenu: boolean = false;

  /**
   * change value to open mobile menu
   */
  openMenu() {
    this.showMenu = true;
  }
}
