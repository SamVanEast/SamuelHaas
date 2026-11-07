import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

/**
 * Shared frame (header, footer) for the pages besides the homepage: Impressum, Datenschutz and the not-found page.
 */
@Component({
  selector: 'app-legal-layout',
  templateUrl: './legal-layout.component.html',
  styleUrls: ['./legal-layout.component.scss'],
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
})
export class LegalLayoutComponent {}
