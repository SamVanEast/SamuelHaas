import { Component, DestroyRef, ElementRef, afterNextRender, inject, viewChildren } from '@angular/core';
import { SectionNavigationService } from '../core/section-navigation.service';
import { HeaderComponent } from '../header/header.component';
import { WelcomeSectionComponent } from '../welcome-section/welcome-section.component';
import { AboutMeComponent } from '../about-me/about-me.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  imports: [HeaderComponent, WelcomeSectionComponent, AboutMeComponent, PortfolioComponent, ContactComponent, FooterComponent],
})
export class HomepageComponent {
  private readonly sections = viewChildren('section', { read: ElementRef });

  constructor() {
    const nav = inject(SectionNavigationService);
    afterNextRender(() => nav.observeSections(this.sections().map(section => section.nativeElement)));
    inject(DestroyRef).onDestroy(() => nav.disconnect());
  }
}
