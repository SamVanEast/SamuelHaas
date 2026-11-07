import { ChangeDetectionStrategy, Component, HostListener, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';

/**
 * Shared frame (header, footer, mobile menu) for the legal pages Impressum and Datenschutz.
 */
@Component({
  selector: 'app-legal-layout',
  templateUrl: './legal-layout.component.html',
  styleUrls: ['./legal-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MenuMobileComponent],
})
export class LegalLayoutComponent {
  @ViewChild('header') header: HeaderComponent;
  @ViewChild('menuMobile') menuMobile: MenuMobileComponent;
  public showMenu: boolean = false;

  @HostListener('window:click')

  /**
   * if user click change value and and executes a function
   */
  onClick() {
    // The header is not rendered yet when the click that navigated here reaches window.
    this.showMenu = this.header?.showMenu ?? false;
    if (this.showMenu) {
      setTimeout(() => {
        document.body.style.overflow = 'hidden';
        this.menuMobile?.onClick();
      }, 0);
    }
  }

  /**
   * closes the mobile menu
   */
  closeMenu() {
    this.showMenu = false;
    this.header.showMenu = false;
    document.body.style.overflow = '';
  }
}
