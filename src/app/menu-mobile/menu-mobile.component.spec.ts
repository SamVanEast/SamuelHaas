import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MenuMobileComponent } from './menu-mobile.component';
import { SectionNavigationService } from '../core/section-navigation.service';
import { NAV_LINKS } from '../core/nav-links';

describe('MenuMobileComponent', () => {
  let component: MenuMobileComponent;
  let fixture: ComponentFixture<MenuMobileComponent>;
  let nav: SectionNavigationService;
  let closed: ReturnType<typeof vi.fn<() => void>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuMobileComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    nav = TestBed.inject(SectionNavigationService);
    fixture = TestBed.createComponent(MenuMobileComponent);
    fixture.componentRef.setInput('links', NAV_LINKS);
    component = fixture.componentInstance;
    closed = vi.fn<() => void>();
    component.closed.subscribe(() => closed());
    document.body.appendChild(fixture.nativeElement);
    await fixture.whenStable();
  });

  afterEach(() => fixture.nativeElement.remove());

  function links(): HTMLAnchorElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('.menu_tab_mobile'));
  }

  it('should be an accessible dialog with all sections and a close button', () => {
    expect(fixture.nativeElement.getAttribute('role')).toBe('dialog');
    expect(fixture.nativeElement.getAttribute('aria-modal')).toBe('true');
    expect(links().map(link => link.getAttribute('href'))).toEqual(['/#about-me', '/#portfolio', '/#contact']);
    expect(fixture.nativeElement.querySelector('button.close_button').getAttribute('aria-label')).toBe('Close menu');
  });

  it('should move the focus to the first section link when opened', () => {
    expect(document.activeElement).toBe(links()[0]);
  });

  it('should navigate to the chosen section and close', () => {
    const goTo = vi.spyOn(nav, 'goTo').mockImplementation(() => undefined);
    links()[1].click();
    expect(goTo).toHaveBeenCalledWith('portfolio', expect.any(MouseEvent));
    expect(closed).toHaveBeenCalledTimes(1);
  });

  it('should close with the close button, the Escape key and a click on the backdrop', () => {
    fixture.nativeElement.querySelector('.close_button').click();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.nativeElement.querySelector('.mobile_menu').click();
    expect(closed).toHaveBeenCalledTimes(3);
  });

  it('should keep the keyboard focus inside the menu', () => {
    const closeButton: HTMLButtonElement = fixture.nativeElement.querySelector('.close_button');
    const lastLink = links()[links().length - 1];

    lastLink.focus();
    lastLink.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
    expect(document.activeElement).toBe(closeButton);

    closeButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true }));
    expect(document.activeElement).toBe(lastLink);
  });

  it('should highlight the section that is currently in view', async () => {
    nav.activeSection.set('portfolio');
    await fixture.whenStable();
    expect(links()[1].classList).toContain('active');
    expect(links()[1].getAttribute('aria-current')).toBe('true');
  });
});
