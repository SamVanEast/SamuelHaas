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
  constructor(private elementRef: ElementRef) {
   }
  
  @HostListener('window:load', ['$event'])
  /**
   * when the content is loaded, it executes a function
  */
 onLoad() {
   this.onWindowScroll(event);
  }
  
  @HostListener('window:scroll', ['$event'])
  /**
   * start the animation when the user scrolls to the component and is not in responsive mode
   * @param event 
   */
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
