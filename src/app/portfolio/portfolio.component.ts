import { ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { height, offsetTop, width } from './../../ts/gobalInformation';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  public imgs = ['screen-slack-clone.jpg', 'screen-join.png', 'screen-el-pollo-loco.png'];
  public headline = ['Slack Clone', 'Join', 'El pollo loco'];
  public languages = ['HTML | CSS | TypeScript | Angular | Firebase', 'HTML | CSS | JavaScript', 'HTML | CSS | JavaScript'];
  public description = ['Slack Clone is a messanger service.', 'Join is a very clear Kanban board to perfectly plan the day.', 'El pollo loco is a 2D game in which you have to beat chickens and their boss.'];
  public links = ['https://slack-clone-5e282.web.app', 'https://samuel-haas.developerakademie.net/Modul-10/Gruppenarbeit-join/index.html', 'https://samuel-haas.developerakademie.net/Modul-11/El-Pollo-Locco/index.html'];
  @ViewChild('portfolioHeader') portfolioHeader: ElementRef;
  @ViewChild('projects') projects: ElementRef;
  public showContent: boolean = false;
  public showHeader: boolean = false;

  constructor(private elementRef: ElementRef) { }
  @HostListener('window:scroll', ['$event'])
  @HostListener('window:load', ['$event'])

  /**
   * when the content is loaded, a function is executed
   */
  onLoad() {
    this.onWindowScroll(event);
  }

  /**
   * the animations starts when the user scrolls to the component and is not in responsive mode
   * @param event 
   */
  onWindowScroll(event) {
    if (width[0] > 770) {
      let scrollPositionTop = window.pageYOffset;
      let scrollPoitionBottom = scrollPositionTop + window.innerHeight;
      this.checkShowHeadline(scrollPoitionBottom);
      this.checkShowContent(scrollPoitionBottom);
    }else{
      this.showHeader = true;
      this.showContent = true;
    }
  };

/**
 * starts the animation from the headline
 * @param scrollPoitionBottom bottom of the screen
 */
  checkShowHeadline(scrollPoitionBottom) {
    if (offsetTop.portfolio + (100) < scrollPoitionBottom && offsetTop.portfolio > 100) {
      this.showHeader = true;
      this.portfolioHeader.nativeElement.classList.add('introAnimationFromRight');
    };
  }

/**
 * starts the animation from the content
 * @param scrollPoitionBottom bottom of the screen
 */
  checkShowContent(scrollPoitionBottom) {
    let self = this;
    this.imgs.forEach(function (img, i) {
      let id = document.getElementById(`project${i}`);
      if (offsetTop.portfolio + (height.portfolio / 4) < scrollPoitionBottom && offsetTop.portfolio > 100) {
        self.showContent = true;
        if (i % 2 == 0) {
          id.classList.add('introAnimationFromLeft');
        } else {
          id.classList.add('introAnimationFromRight');
        }
      };
    })
  }
}
