import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';
import { SectionNavigationService } from '../core/section-navigation.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let nav: SectionNavigationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    nav = TestBed.inject(SectionNavigationService);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    // attached to the document so that focus changes can be checked
    document.body.appendChild(fixture.nativeElement);
    await fixture.whenStable();
  });

  afterEach(() => {
    fixture.nativeElement.remove();
    document.body.style.overflow = '';
  });

  function menuButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('.menu_button');
  }

  it('should link to all homepage sections with working hrefs', () => {
    const links = Array.from<HTMLAnchorElement>(fixture.nativeElement.querySelectorAll('.menu_tab'));
    expect(links.map(link => link.getAttribute('href'))).toEqual(['/#about-me', '/#portfolio', '/#contact']);
    expect(fixture.nativeElement.querySelector('.logo').getAttribute('href')).toBe('/#welcome');
  });

  it('should navigate to a section without reloading the page', () => {
    const goTo = vi.spyOn(nav, 'goTo').mockImplementation(() => undefined);
    fixture.nativeElement.querySelector('.menu_tab[href="/#portfolio"]').click();
    expect(goTo).toHaveBeenCalledWith('portfolio', expect.any(MouseEvent));
  });

  it('should highlight the section that is currently in view', async () => {
    nav.activeSection.set('contact');
    await fixture.whenStable();
    const active: HTMLAnchorElement = fixture.nativeElement.querySelector('.menu_tab.active');
    expect(active.getAttribute('href')).toBe('/#contact');
    expect(active.getAttribute('aria-current')).toBe('true');
  });

  it('should use a real, labelled button for the mobile menu', () => {
    expect(menuButton().tagName).toBe('BUTTON');
    expect(menuButton().getAttribute('type')).toBe('button');
    expect(menuButton().getAttribute('aria-label')).toBe('Open menu');
    expect(menuButton().getAttribute('aria-expanded')).toBe('false');
  });

  it('should open the mobile menu and lock the page scroll', async () => {
    menuButton().click();
    await fixture.whenStable();

    expect(component.menuOpen()).toBe(true);
    expect(menuButton().getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.querySelector('app-menu-mobile')).not.toBeNull();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should close the mobile menu, unlock the scroll and focus the menu button again', async () => {
    // jsdom renders the desktop layout, in which the menu button is hidden and cannot take the focus
    const mobileLayout = Object.assign(document.createElement('style'), { textContent: '.menu_button { display: flex !important; }' });
    document.head.appendChild(mobileLayout);
    menuButton().click();
    await fixture.whenStable();

    fixture.nativeElement.querySelector('.close_button').click();
    await fixture.whenStable();

    expect(component.menuOpen()).toBe(false);
    expect(fixture.nativeElement.querySelector('app-menu-mobile')).toBeNull();
    expect(document.body.style.overflow).toBe('');
    expect(document.activeElement).toBe(menuButton());
    mobileLayout.remove();
  });
});
