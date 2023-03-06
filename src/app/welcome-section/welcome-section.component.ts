import { OnInit, AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { height } from './../../ts/gobalInformation';


@Component({
  selector: 'app-weclome-section',
  templateUrl: './welcome-section.component.html',
  styleUrls: ['./welcome-section.component.scss']
})
export class WeclomeSectionComponent {
  constructor(private elementRef: ElementRef) { }
}
