import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { HostListener } from '@angular/core';
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
  public showMenu: boolean = false;
  heightComponents = height;
  offsetTopComponents = offsetTop;
  ids = ['welcomeSection', 'aboutMe', 'skills', 'portfolio', 'contact', 'footer']
  viewChilds;

  constructor(private router: Router, private elementRef: ElementRef) { }
  @HostListener('window:resize')
  @HostListener('window:click')

  onClick() {
    this.showMenu = this.header.showMenu;
  }

  onResize() {
    this.getWidth();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.viewChilds = [this.welcomeSection, this.aboutMe, this.skills, this.portfolio, this.contact, this.footer];
      this.getHeight();
      this.getWidth();
    }, 100);
  }

  getHeight() {
    let childs = this.viewChilds;
    this.ids.forEach(function (id, i) {
      height[id] = childs[i].elementRef.nativeElement.offsetHeight;
    });
    this.ids.forEach(function (id, i) {
      offsetTop[id] = childs[i].elementRef.nativeElement.offsetTop;
    });
  }

  getWidth() {
    width[0] = this.elementRef.nativeElement.offsetWidth;
  }

  closeMenu(){
    this.showMenu = false;
    this.header.showMenu = false;
  }

}