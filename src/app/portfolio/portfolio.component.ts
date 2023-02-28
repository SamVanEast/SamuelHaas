import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  public imgs = ['screen-lieferando.png', 'screen-cooking-page.png', 'screen-join.png', 'screen-el-pollo-loco.png'];
  public headline = ['Lieferando order page.', 'Cooking page', 'Join', 'El pollo loco'];
  public languages = ['HTML | CSS | JavaScript', 'HTML | CSS | JavaScript', 'HTML | CSS | JavaScript', 'HTML | CSS | JavaScript'];
  public description = ['The replica of the Lieferando order page.', 'A cooking site with delicious recipes.', 'Join is a very clear Kanban board to perfectly plan the day.', 'El pollo loco is a 2D game in which you have to beat chickens and their boss.'];
  public links = ['https://samuel-haas.developerakademie.net/%C3%9Cbungen%20Modul%207/Lieferando%20Bestellseite/index.html', 'https://gruppe-127.developerakademie.net/index.html', 'https://samuel-haas.developerakademie.net/Modul-10/Gruppenarbeit-join/index.html', 'https://samuel-haas.developerakademie.net/Modul-11/El-Pollo-Locco/index.html'];
}
