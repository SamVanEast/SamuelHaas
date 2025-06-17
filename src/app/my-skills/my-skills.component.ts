import { ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { height, offsetTop, width } from './../../ts/gobalInformation';


@Component({
  selector: 'app-my-skills',
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.scss']
})
export class MySkillsComponent {
  pathIcons = ['angular.png', 'typescript.png', 'javascript.png', 'html.png', 'firebase.png', 'git.png', 'css.png', 'api.png', 'scrum.png', 'material-design.png'];
  iconsDescription = ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'Firebase', 'GIT', 'CSS', 'Rest-Api', 'Scrum', 'Material Design'];
  @ViewChild('skillsDescription') skillsDescription: ElementRef;
  // @ViewChild('skills') skills: ElementRef;
  public showContent: boolean = false;
  constructor(private elementRef: ElementRef) { }
  @HostListener('window:scroll', ['$event'])
  @HostListener('window:load', ['$event'])

  /**
   * when the content is loaded, a function is executed
   */
  onLoad(){
    this.onWindowScroll(event);
  }

/**
 * the animation starts when the user scrolls to the component and is not in responsive mode
 * @param event
 */
  onWindowScroll(event) {
  //   if (width[0] > 770) {
  //     let scrollPositionTop = window.pageYOffset;
  //     let scrollPoitionBottom = scrollPositionTop + window.innerHeight;
  //     if (offsetTop.skills + (height.skills / 2) < scrollPoitionBottom && offsetTop.skills > 100) {
  //       this.showContent = true;
  //       this.skillsDescription.nativeElement.classList.add('introAnimationFromLeft')
  //       this.skills.nativeElement.classList.add('introAnimationFromRight')
  //     };
  //   }else{
  //     this.showContent = true;
  //   }
  };
}
