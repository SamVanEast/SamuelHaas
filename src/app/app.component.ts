import { Input } from '@angular/core';
import { HostListener } from '@angular/core';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { height } from './../ts/gobalInformation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})






export class AppComponent implements AfterViewInit {
  private currentPage: string;
  heightComponents = height;

  constructor(private router: Router, private el: ElementRef) {
    this.getCurrentpage();
  }




  @ViewChild('footer') footerRef: ElementRef;


  ngAfterViewInit() {
    setTimeout(() => {
      let height = this.footerRef.nativeElement.offsetHeight;
      // this.heightComponents['footer'] = height;
      console.log(height);
    }, 2000);
  }















  getCurrentpage() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentPage = event.url;
        console.log(this.currentPage);
      }
    });
  }
  @HostListener('window:scroll', ['$event'])


  onWindowScroll(event) {
    let scrollPosition = window.pageYOffset;// || document.documentElement.scrollTop || document.body.scrollTop || 0
    // console.log('es funktioniert', scrollPosition);

    if (scrollPosition > 100) {
      console.log(this.heightComponents);
    };

  };
}
