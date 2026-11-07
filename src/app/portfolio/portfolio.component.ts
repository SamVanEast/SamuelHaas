import { ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { height, offsetTop, width } from '../../ts/globalInformation';

/** Available WebP widths and the intrinsic size (of the 960px variant) per project image, see scripts/optimize-images.mjs. */
const projectImages: Record<string, { widths: number[]; width: number; height: number }> = {
  'bytecookie': { widths: [480, 960, 1440], width: 960, height: 479 },
  'lunch-menu-app': { widths: [480, 960, 1440], width: 960, height: 306 },
  'order-terminal': { widths: [480, 960], width: 960, height: 340 },
  'slack-clone': { widths: [480, 960, 1440], width: 960, height: 640 },
  'join': { widths: [480, 960, 1440], width: 960, height: 540 },
  'el-pollo-loco': { widths: [480, 960, 1440], width: 960, height: 640 },
};

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class PortfolioComponent {
  public imgs = [
    'bytecookie',
    'lunch-menu-app',
    'order-terminal',
    'slack-clone',
    'join',
    'el-pollo-loco'
  ];
  public readonly projectImages = projectImages;
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
    'Cordova | AngularJS | HTML | LESS | REST-API | Scrum | Jira | Confluence | Bitbucket | Swagger | New versions prepared and released in the respective store | Full Dependency Upgrade',
    'Vue.Js | TypeScript | HTML | SCSS | various payment methods | C# | REST-API | Scrum | Jira | Confluence | Bitbucket | Swagger | Full Dependency Upgrade',
    'HTML | CSS | TypeScript | Angular | Firebase | Figma | Github | REST-API',
    'HTML | CSS | JavaScript  | Figma | Github',
    'HTML | CSS | JavaScript | Figma | Github'
  ];
  public description = [
    'ByteCookie is the world’s first cooperative marketplace and social network for IT freelancers, precisely connecting clients and freelance experts. Thanks to a verified expert network, the platform automatically recommends the best freelance profiles for each project. We deliberately focus on maximum performance and data privacy by completely avoiding external advertising, cookies, or tracking scripts. Headquartered in Frankfurt am Main with a dedicated team of 11 to 50 employees, ByteCookie combines personal support with modern, digital project placement.',
    'A modular white-label solution for mobile devices: display of current menus, ordering and payment functions, dashboards for occupancy and feedback, as well as numerous additional modules (e.g., voting, news, recipes, ordering options, photo booth, customer frequency counter).',
    'Ordering terminal with an intuitive touch interface, shopping cart, and contactless payment function. Guests easily navigate through the digital menu, select their dishes, and pick them up at the counter at their desired time.',
    'Slack Clone is a messenger service.',
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
  /**
   * builds the srcset of a project image from its generated WebP widths
   */
  srcset(image: string): string {
    return projectImages[image].widths.map(w => `assets/img/projects/${image}-${w}.webp ${w}w`).join(', ');
  }

  @ViewChild('portfolioHeader') portfolioHeader: ElementRef;
  public showContent: boolean = false;
  public showHeader: boolean = false;

  @HostListener('window:scroll')
  @HostListener('window:load')

  /**
   * when the content is loaded, a function is executed
   */
  onLoad() {
    this.onWindowScroll();
  }

  /**
   * the animations starts when the user scrolls to the component and is not in responsive mode
   */
  onWindowScroll() {
    if (width[0] > 770) {
      let scrollPositionTop = window.scrollY;
      let scrollPositionBottom = scrollPositionTop + window.innerHeight;
      this.checkShowHeadline(scrollPositionBottom);
      this.checkShowContent(scrollPositionBottom);
    } else {
      this.showHeader = true;
      this.showContent = true;
    }
  };

  /**
   * starts the animation from the headline
   * @param scrollPositionBottom bottom of the screen
   */
  checkShowHeadline(scrollPositionBottom) {
    if (offsetTop.portfolio + (100) < scrollPositionBottom && offsetTop.portfolio > 100) {
      this.showHeader = true;
      this.portfolioHeader.nativeElement.classList.add('introAnimationFromRight');
    };
  }

  /**
   * starts the animation from the content
   * @param scrollPositionBottom bottom of the screen
   */
  checkShowContent(scrollPositionBottom) {
    let self = this;
    this.imgs.forEach(function (img, i) {
      let id = document.getElementById(`project${i}`);
      if (offsetTop.portfolio + (height.portfolio / 4) < scrollPositionBottom && offsetTop.portfolio > 100) {
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
