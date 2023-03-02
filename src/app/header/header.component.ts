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
  @HostListener('window:scroll', ['$event'])
  @HostListener('window:load', ['$event'])

  onLoad() {
    this.onWindowScroll(event);
  }

  onWindowScroll(event) {
    if ((this.router.url == '/' || this.router.url == '/#welcome' || this.router.url == '/#about-me' || this.router.url == '/#skills' || this.router.url == '/#portfolio' || this.router.url == '/#contact')) {
      if (width[0] > 770) {
        this.checkSection();
      }
    }
  };

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

  welcomeSection() {
    this.router.navigate([], { fragment: 'welcome' });
    this.removeAllStyles();
  }

  aboutMeSection() {
    this.router.navigate([], { fragment: 'about-me' });
    this.removeAllStyles();
    this.aboutMe.nativeElement.style = 'background-color: #5221E6;';
  }
  skillsSection() {
    this.router.navigate([], { fragment: 'skills' });
    this.removeAllStyles();
    this.skills.nativeElement.style = 'background-color: #5221E6;';
  }
  portfolioSection() {
    this.router.navigate([], { fragment: 'portfolio' });
    this.removeAllStyles();
    this.portfolio.nativeElement.style = 'background-color: #5221E6;';
  }
  contactSection() {
    this.router.navigate([], { fragment: 'contact' });
    this.removeAllStyles();
    this.contact.nativeElement.style = 'background-color: #5221E6;';
  }

  removeAllStyles() {
    this.aboutMe.nativeElement.style = '';
    this.skills.nativeElement.style = '';
    this.portfolio.nativeElement.style = '';
    this.contact.nativeElement.style = '';
  }

  openMenu() {
    this.showMenu = true;
  }
}
