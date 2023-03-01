import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { height } from './../../ts/gobalInformation';


@Component({
  selector: 'app-my-skills',
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.scss']
})
export class MySkillsComponent {
  pathIcons = ['angular.png', 'typescript.png', 'javascript.png', 'html.png', 'firebase.png', 'git.png', 'css.png', 'api.png', 'scrum.png', 'material-design.png'];
  iconsDescription = ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'Firebase', 'GIT', 'CSS', 'Rest-Api', 'Scrum', 'Material Design'];
  @ViewChild('skills') skills;
  heightComponents = height;

  ngAfterViewInit() {
    setTimeout(() => {
      let height = this.skills.nativeElement.offsetHeight;
      this.heightComponents['skills'] = height;
    }, 50);
  }
}
