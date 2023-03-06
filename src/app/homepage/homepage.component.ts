import { ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { height, offsetTop, width } from './../../ts/gobalInformation';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  @ViewChild('header') header;
  @ViewChild('welcomeSection') welcomeSection: ElementRef;
  @ViewChild('aboutMe') aboutMe: ElementRef;
  @ViewChild('skills') skills: ElementRef;
  @ViewChild('portfolio') portfolio: ElementRef;
  @ViewChild('contact') contact: ElementRef;
  @ViewChild('footer') footer: ElementRef;
  @ViewChild('menuMobile') menuMobile;
  public showMenu: boolean = false;
  ids = ['welcomeSection', 'aboutMe', 'skills', 'portfolio', 'contact', 'footer']
  viewChilds;

  constructor(private router: Router, private elementRef: ElementRef, private renderer: Renderer2) { }

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

  @HostListener('window:resize', ['$event'])

  /**
   * when the size changes a function is executed
   */
  onResize() {
    this.onLoad()
  }

  @HostListener('window:load', ['$event'])

  /**
   * when the page is load, functions is executed
   */
  onLoad() {
    this.viewChilds = [this.welcomeSection, this.aboutMe, this.skills, this.portfolio, this.contact, this.footer];
    this.getHeight();
    this.getWidth();
  }

  /**
   * get height from all components in homepage.components
   */
  getHeight() {
    let childs = this.viewChilds;
    this.ids.forEach(function (id, i) {
      height[id] = childs[i].elementRef.nativeElement.offsetHeight;
    });
    this.ids.forEach(function (id, i) {
      offsetTop[id] = childs[i].elementRef.nativeElement.offsetTop;
    });
  }

  /**
   * get width of homepage.component
   */
  getWidth() {
    width[0] = this.elementRef.nativeElement.offsetWidth;
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