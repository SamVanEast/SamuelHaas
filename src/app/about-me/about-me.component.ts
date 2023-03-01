import { ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { height } from './../../ts/gobalInformation';


@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
  // @ViewChild('aboutMe') aboutMe;
  heightComponents = height;
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      let height = this.elementRef.nativeElement.offsetHeight;
      this.heightComponents['about_me'] = height;
    }, 1000);
  }

}
