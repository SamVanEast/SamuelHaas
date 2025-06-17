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
  public imgs = [
    'byteCookie.png',
    'lunch-menu-app.png',
    'order-terminal.png',
    'screen-slack-clone.jpg',
    'screen-join.png',
    'screen-el-pollo-loco.png'
  ];
  public headline = [
    'ByteCookie',
    'Lunch menu app',
    'Order terminal',
    'Slack Clone',
    'Join',
    'El pollo loco'
  ];
  public languages = [
    'Vue.js | TypeScript | HTML | SCSS | REST-API | Scrum | Jira | Confluence | Bitbucket | Swagger | Figma',
    'Cordova | AngularJS | HTML | LESS | REST-API | Scrum | Jira | Confluence | Bitbucket | Swagger | neue Versionen im jeweiligen Store vorbereitet und veröffentlicht | Full Dependency Upgrade',
    'Vue.Js | TypeScript | HTML | SCSS | verschiedene Bezahlmethode | C# | REST-API | Scrum | Jira | Confluence | Bitbucket | Swagger | Full Dependency Upgrade | verschiede Kartenlesegeräte',
    'HTML | CSS | TypeScript | Angular | Firebase | Figma | Github | REST-API',
    'HTML | CSS | JavaScript  | Figma | Github',
    'HTML | CSS | JavaScript | Figma | Github'
  ];
  public description = [
    'ByteCookie is the world’s first cooperative marketplace and social network for IT freelancers, precisely connecting clients and freelance experts. Thanks to a verified expert network, the platform automatically recommends the best freelance profiles for each project. We deliberately focus on maximum performance and data privacy by completely avoiding external advertising, cookies, or tracking scripts. Headquartered in Frankfurt am Main with a dedicated team of 11 to 50 employees, ByteCookie combines personal support with modern, digital project placement.',
    'A modular white-label solution for mobile devices: display of current menus, ordering and payment functions, dashboards for occupancy and feedback, as well as numerous additional modules (e.g., voting, news, recipes, ordering options, photo booth, customer frequency counter).',
    'Ordering terminal with an intuitive touch interface, shopping cart, and contactless payment function. Guests easily navigate through the digital menu, select their dishes, and pick them up at the counter at their desired time.',
    'Slack Clone is a messanger service.',
    'Join is a very clear Kanban board to perfectly plan the day.',
    'El pollo loco is a 2D game in which you have to beat chickens and their boss.'];
  public links = [
    'https://www.bytecookie.net',
    'https://www.kamasys.de/index.php/portfolio/mittagstisch/#',
    'https://www.kamasys.de/index.php/portfolio/kassensysteme-selbstbedienung/',
    'https://slack-clone-5e282.web.app',
    'https://michelbente.com/projects/join-main/join-main/index.html',
    'https://samuel-haas.developerakademie.net/Modul-11/El-Pollo-Locco/index.html'
  ];
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

  openLink(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
