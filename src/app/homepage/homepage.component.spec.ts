import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { width } from '../../ts/globalInformation';
import { resetGlobalInformation } from '../../testing/global-information';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async () => {
    resetGlobalInformation();
    await TestBed.configureTestingModule({
      imports: [HomepageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    resetGlobalInformation();
    document.body.style.overflow = '';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ignore a click that arrives before the header is rendered', () => {
    const freshFixture = TestBed.createComponent(HomepageComponent);
    expect(() => freshFixture.componentInstance.onClick()).not.toThrow();
    expect(freshFixture.componentInstance.showMenu).toBe(false);
  });

  it('should render every section with its anchor id', () => {
    const ids = ['header', 'welcome', 'about-me', 'portfolio', 'contact', 'footer'];
    ids.forEach(id => expect(fixture.nativeElement.querySelector(`#${id}`)).not.toBeNull());
  });

  it('should measure the page width and the sections on load', () => {
    component.onLoad();
    expect(width[0]).toBeTypeOf('number');
    expect(component.viewChilds.length).toBe(5);
  });

  it('should open the mobile menu and lock scrolling when the menu icon is clicked', async () => {
    fixture.nativeElement.querySelector('.open_menu img').click();
    fixture.detectChanges();
    await new Promise(resolve => setTimeout(resolve));

    expect(component.showMenu).toBe(true);
    expect(fixture.nativeElement.querySelector('app-menu-mobile')).not.toBeNull();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should close the mobile menu and unlock scrolling', async () => {
    fixture.nativeElement.querySelector('.open_menu img').click();
    fixture.detectChanges();
    await new Promise(resolve => setTimeout(resolve));

    fixture.nativeElement.querySelector('app-menu-mobile').click();
    fixture.detectChanges();

    expect(component.showMenu).toBe(false);
    expect(component.header.showMenu).toBe(false);
    expect(fixture.nativeElement.querySelector('app-menu-mobile')).toBeNull();
    expect(document.body.style.overflow).toBe('');
  });
});
