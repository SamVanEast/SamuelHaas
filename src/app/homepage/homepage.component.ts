import { ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { height, offsetTop, width } from '../../ts/globalInformation';
import { HeaderComponent } from '../header/header.component';
import { WelcomeSectionComponent } from '../welcome-section/welcome-section.component';
import { AboutMeComponent } from '../about-me/about-me.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [HeaderComponent, WelcomeSectionComponent, AboutMeComponent, PortfolioComponent, ContactComponent, FooterComponent, MenuMobileComponent],
})
export class HomepageComponent {
  private elementRef = inject(ElementRef);
  @ViewChild('header') header: HeaderComponent;
  @ViewChild('welcomeSection', { read: ElementRef }) welcomeSection: ElementRef;
  @ViewChild('aboutMe', { read: ElementRef }) aboutMe: ElementRef;
  @ViewChild('portfolio', { read: ElementRef }) portfolio: ElementRef;
  @ViewChild('contact', { read: ElementRef }) contact: ElementRef;
  @ViewChild('footer', { read: ElementRef }) footer: ElementRef;
  @ViewChild('menuMobile') menuMobile: MenuMobileComponent;
  public showMenu: boolean = false;
  ids = ['welcomeSection', 'aboutMe', 'portfolio', 'contact', 'footer'];
  viewChilds: ElementRef[];

  @HostListener('window:click')

  /**
   * if user click change value and and executes a function
   */
  onClick() {
    // The header is not rendered yet when the click that navigated here reaches window.
    this.showMenu = this.header?.showMenu ?? false;
    if (this.showMenu) {
      setTimeout(() => {
        document.body.style.overflow = 'hidden';
        this.menuMobile?.onClick();
      }, 0);
    }
  }

  @HostListener('window:resize')

  /**
   * when the size changes a function is executed
   */
  onResize() {
    this.onLoad();
  }

  @HostListener('window:load')

  /**
   * when the page is load, functions is executed
   */
  onLoad() {
    this.viewChilds = [this.welcomeSection, this.aboutMe, this.portfolio, this.contact, this.footer];
    this.getHeight();
    this.getWidth();
  }

  /**
   * get height from all components in homepage.components
   */
  getHeight() {
    let childs = this.viewChilds;
    this.ids.forEach(function (id, i) {
      height[id] = childs[i].nativeElement.offsetHeight;
    });
    this.ids.forEach(function (id, i) {
      offsetTop[id] = childs[i].nativeElement.offsetTop;
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
