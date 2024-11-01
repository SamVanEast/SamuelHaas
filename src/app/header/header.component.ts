import { ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { height, offsetTop, width } from 'src/ts/gobalInformation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @ViewChild('aboutMe') aboutMe: ElementRef;
  @ViewChild('skills') skills: ElementRef;
  @ViewChild('portfolio') portfolio: ElementRef;
  @ViewChild('contact') contact: ElementRef;
  public showMenu: boolean = false;
  constructor(private router: Router, private elementRef: ElementRef) {
  }
  @HostListener('window:load', ['$event'])

  /**
   * when the content is loaded, a function is executed
  */
  onLoad() {
    this.onWindowScroll(event);
  }

  @HostListener('window:scroll', ['$event'])

  /**
   * changes the background color in the menu when he is in the homepage component 
   * @param event 
   */
  onWindowScroll(event) {
    if (this.router.url == '/' || this.router.url == '/#welcome' || this.router.url == '/#about-me' || this.router.url == '/#skills' || this.router.url == '/#portfolio' || this.router.url == '/#contact') {
      if (width[0] > 770) {
        this.checkSection();
      }
    } else {
      this.removeAllStyles();
    }
  };

  /**
   * depending on which area the user is in, the respective area in the header should get a different background color
   */
  checkSection() {
    let scrollPositionTop = window.pageYOffset;
    if (scrollPositionTop + window.innerHeight / 2 > offsetTop.contact) {
      this.contactSection();
    } else if (scrollPositionTop + window.innerHeight / 2 > offsetTop.portfolio) {
      this.portfolioSection();
    } else if (scrollPositionTop + window.innerHeight / 2 > offsetTop.skills) {
      this.skillsSection();
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
    this.aboutMe.nativeElement.style = 'background-color: #F25F5C;';
  }

  /**
   * changes the route
   */
  skillsSection() {
    this.router.navigate([], { fragment: 'skills' });
    this.removeAllStyles();
    this.skills.nativeElement.style = 'background-color: #F25F5C;';
  }

  /**
   * changes the route
   */
  portfolioSection() {
    this.router.navigate([], { fragment: 'portfolio' });
    this.removeAllStyles();
    this.portfolio.nativeElement.style = 'background-color: #F25F5C;';
  }

  /**
   * changes the route
   */
  contactSection() {
    this.router.navigate([], { fragment: 'contact' });
    this.removeAllStyles();
    this.contact.nativeElement.style = 'background-color: #F25F5C;';
  }

  /**
   * delete all styles
   */
  removeAllStyles() {
    this.aboutMe.nativeElement.style = '';
    this.skills.nativeElement.style = '';
    this.portfolio.nativeElement.style = '';
    this.contact.nativeElement.style = '';
  }

  /**
   * change value to open mobile menu
   */
  openMenu() {
    this.showMenu = true;
  }
}
