import { ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { offsetTop } from '../../ts/globalInformation';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class MenuMobileComponent {
  private router = inject(Router);
  @ViewChild('aboutMe') aboutMe: ElementRef;
  @ViewChild('portfolio') portfolio: ElementRef;
  @ViewChild('contact') contact: ElementRef;

  @HostListener('window:click')

  /**
   * if user click
   */
  public onClick() {
    if (this.router.url == '/' || this.router.url == '/#welcome' || this.router.url == '/#about-me' || this.router.url == '/#portfolio' || this.router.url == '/#contact') {
      this.checkSection();
    } else {
      this.removeAllStyles();
    }
  }

  /**
   * depending on which area the user is in, the respective area in the header should get a different background color
   */
  checkSection() {
    let scrollPositionTop = window.pageYOffset;
    if (scrollPositionTop + window.innerHeight / 2 > offsetTop.contact) {
      this.contactSection();
    } else if (scrollPositionTop + window.innerHeight / 2 > offsetTop.portfolio) {
      this.portfolioSection();
    } else if (scrollPositionTop + window.innerHeight / 2 > offsetTop.aboutMe) {
      this.aboutMeSection();
    } else {
      this.welcomeSection();
    }
  }

  /**
   * changes the route
   */
  welcomeSection() {
    this.router.navigate([], { fragment: 'welcome' });
    this.removeAllStyles();
  }

  /**
   *changes the route
   */
  aboutMeSection() {
    this.router.navigate([], { fragment: 'about-me' });
    this.removeAllStyles();
    this.aboutMe.nativeElement.style = 'color: #F25F5C;';
  }

  /**
   * changes the route
   */
  portfolioSection() {
    this.router.navigate([], { fragment: 'portfolio' });
    this.removeAllStyles();
    this.portfolio.nativeElement.style = 'color: #F25F5C;';
  }

  /**
   * changes the route
   */
  contactSection() {
    this.router.navigate([], { fragment: 'contact' });
    this.removeAllStyles();
    this.contact.nativeElement.style = 'color: #F25F5C;';
  }

  /**
   * delete all styles
   */
  removeAllStyles() {
    this.aboutMe.nativeElement.style = '';
    this.portfolio.nativeElement.style = '';
    this.contact.nativeElement.style = '';
  }
}
