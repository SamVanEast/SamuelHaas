import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutMeComponent } from './about-me.component';
import { height, offsetTop, width } from '../../ts/globalInformation';
import { resetGlobalInformation } from '../../testing/global-information';

describe('AboutMeComponent', () => {
  let component: AboutMeComponent;
  let fixture: ComponentFixture<AboutMeComponent>;

  beforeEach(async () => {
    resetGlobalInformation();
    await TestBed.configureTestingModule({
      imports: [AboutMeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => resetGlobalInformation());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should keep the content hidden until it is scrolled into view on desktop', () => {
    width[0] = 1200;
    offsetTop.aboutMe = 5000;
    height.aboutMe = 800;

    component.onWindowScroll(undefined);

    expect(component.showContent).toBe(false);
  });

  it('should show the content with an animation once it is scrolled into view on desktop', async () => {
    width[0] = 1200;
    offsetTop.aboutMe = 200;
    height.aboutMe = 400;

    window.dispatchEvent(new Event('scroll'));
    await fixture.whenStable();

    expect(component.showContent).toBe(true);
    const headline: HTMLElement = fixture.nativeElement.querySelector('.about_me_headline');
    expect(headline.style.visibility).toBe('visible');
    const description: HTMLElement = fixture.nativeElement.querySelector('.about_me_description');
    expect(description.classList).toContain('introAnimationFromRight');
  });

  it('should show the content immediately on small screens', () => {
    width[0] = 400;

    component.onWindowScroll(undefined);

    expect(component.showContent).toBe(true);
  });
});
