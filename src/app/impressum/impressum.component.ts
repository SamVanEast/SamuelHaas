import { Component, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss']
})
export class ImpressumComponent {
  @ViewChild('header') header;
  @ViewChild('menuMobile') menuMobile;
  public showMenu: boolean = false;

  @HostListener('window:click', ['$event'])

  /**
   * if user click change value and and executes a function
   */
  onClick() {
    this.showMenu = this.header.showMenu;
    if (this.showMenu) {
      setTimeout(() => {
        document.body.style.overflow = 'hidden';
        this.menuMobile.onClick();
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
