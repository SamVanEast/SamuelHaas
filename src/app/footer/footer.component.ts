import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { height } from './../../ts/gobalInformation';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private elementRef: ElementRef){}
}
