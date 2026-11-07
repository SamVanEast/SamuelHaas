import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { MenuMobileComponent } from './menu-mobile.component';
import { offsetTop } from '../../ts/globalInformation';
import { resetGlobalInformation } from '../../testing/global-information';

describe('MenuMobileComponent', () => {
  let component: MenuMobileComponent;
  let fixture: ComponentFixture<MenuMobileComponent>;
  let router: Router;

  beforeEach(async () => {
    resetGlobalInformation();
    await TestBed.configureTestingModule({
      imports: [MenuMobileComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuMobileComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    resetGlobalInformation();
    vi.restoreAllMocks();
  });

  function link(name: string): HTMLAnchorElement {
    return fixture.nativeElement.querySelector(`a[href="#${name}"]`);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should link to all homepage sections', () => {
    const links = Array.from<HTMLAnchorElement>(fixture.nativeElement.querySelectorAll('.menu_tab_mobile'));
    expect(links.map(l => l.getAttribute('href'))).toEqual(['#about-me', '#portfolio', '#contact']);
  });

  it('should highlight the section the user is currently in', () => {
    const navigate = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    offsetTop.aboutMe = 0;
    offsetTop.portfolio = 100_000;
    offsetTop.contact = 200_000;

    component.checkSection();

    expect(navigate).toHaveBeenCalledWith([], { fragment: 'about-me' });
    expect(link('about-me').style.color).not.toBe('');
    expect(link('portfolio').style.color).toBe('');
    expect(link('contact').style.color).toBe('');
  });

  it('should clear all highlights in the welcome section', () => {
    const navigate = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    offsetTop.aboutMe = 100_000;
    offsetTop.portfolio = 200_000;
    offsetTop.contact = 300_000;
    link('contact').style.color = 'red';

    component.checkSection();

    expect(navigate).toHaveBeenCalledWith([], { fragment: 'welcome' });
    expect(link('contact').style.color).toBe('');
  });
});
