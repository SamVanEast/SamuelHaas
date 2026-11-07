import { ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { height, offsetTop, width } from '../../ts/globalInformation';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class AboutMeComponent {
  @ViewChild('aboutMeDescription') aboutMeDescription: ElementRef;
  public showContent: boolean = false;

  @HostListener('window:load')
  /**
   * when the content is loaded, it executes a function
   */
  onLoad() {
    this.onWindowScroll();
  }

  @HostListener('window:scroll')
  /**
   * start the animation when the user scrolls to the component and is not in responsive mode
   */
  onWindowScroll() {
    if (width[0] > 770) {
      let scrollPositionTop = window.scrollY;
      let scrollPositionBottom = scrollPositionTop + window.innerHeight;
      if (offsetTop.aboutMe + (height.aboutMe / 2) < scrollPositionBottom && offsetTop.aboutMe > 100) {
        this.showContent = true;
        this.aboutMeDescription.nativeElement.classList.add('introAnimationFromRight')
      };
    } else {
      this.showContent = true;
    }
  };
}
