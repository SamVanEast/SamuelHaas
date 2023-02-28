import { Component } from '@angular/core';

@Component({
  selector: 'app-my-skills',
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.scss']
})
export class MySkillsComponent {
  pathIcons = ['angular.png', 'typescript.png', 'javascript.png', 'html.png', 'firebase.png', 'git.png', 'css.png', 'api.png', 'scrum.png', 'material-design.png'];
  iconsDescription = ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'Firebase', 'GIT', 'CSS', 'Rest-Api', 'Scrum', 'Material Design'];
}
