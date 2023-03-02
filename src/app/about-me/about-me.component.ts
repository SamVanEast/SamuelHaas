import { ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { height, offsetTop, width } from './../../ts/gobalInformation';


@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
  @ViewChild('aboutMeDecription') aboutMeDecription: ElementRef;
  public showContent: boolean = false;
  constructor(private elementRef: ElementRef) { }
  @HostListener('window:scroll', ['$event'])
  @HostListener('window:load', ['$event'])

  onLoad() {
    this.onWindowScroll(event);
  }

  onWindowScroll(event) {
    if (width[0] > 770) {
      let scrollPositionTop = window.pageYOffset;
      let scrollPoitionBottom = scrollPositionTop + window.innerHeight;
      if (offsetTop.aboutMe + (height.aboutMe / 2) < scrollPoitionBottom && offsetTop.aboutMe > 100) {
        this.showContent = true;
        this.aboutMeDecription.nativeElement.classList.add('introAnimationFromRight')
      };
    }else{
      this.showContent = true;
    }
  };
}
