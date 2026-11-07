import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should link to all homepage sections', () => {
    const links = Array.from<HTMLAnchorElement>(fixture.nativeElement.querySelectorAll('.menu_tab'));
    expect(links.map(link => link.getAttribute('href'))).toEqual(['#about-me', '#portfolio', '#contact']);
  });

  it('should link the logo to the welcome section', () => {
    const logo: HTMLAnchorElement = fixture.nativeElement.querySelector('.logo');
    expect(logo.getAttribute('href')).toBe('#welcome');
  });

  it('should open the mobile menu when the menu icon is clicked', () => {
    expect(component.showMenu).toBe(false);
    fixture.nativeElement.querySelector('.open_menu img').click();
    expect(component.showMenu).toBe(true);
  });
});
