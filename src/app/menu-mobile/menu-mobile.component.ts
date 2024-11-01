import { HostListener } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { height, offsetTop, width } from 'src/ts/gobalInformation';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.scss']
})
export class MenuMobileComponent {
  @ViewChild('aboutMe') aboutMe: ElementRef;
  @ViewChild('skills') skills: ElementRef;
  @ViewChild('portfolio') portfolio: ElementRef;
  @ViewChild('contact') contact: ElementRef;

  constructor(private router: Router, private elementRef: ElementRef) {
  }

  ngOnChange(){
    console.log('functioniert');

  }

  @HostListener('window:click', ['$event'])

  /**
   * if user click 
   */
  public onClick() {
    
    if (this.router.url == '/' || this.router.url == '/#welcome' || this.router.url == '/#about-me' || this.router.url == '/#skills' || this.router.url == '/#portfolio' || this.router.url == '/#contact') {
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
    this.aboutMe.nativeElement.style = 'color: #F25F5C;';
  }

  /**
   * changes the route
   */
  skillsSection() {
    this.router.navigate([], { fragment: 'skills' });
    this.removeAllStyles();
    this.skills.nativeElement.style = 'color: #F25F5C;';
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
    this.skills.nativeElement.style = '';
    this.portfolio.nativeElement.style = '';
    this.contact.nativeElement.style = '';
  }

}
