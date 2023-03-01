import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { height } from './../../ts/gobalInformation';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @ViewChild('footer') footer;
  heightComponents = height;

  ngAfterViewInit() {
    setTimeout(() => {
      let height = this.footer.nativeElement.offsetHeight;
      this.heightComponents['footer'] = height;
    }, 50);
  }
}
