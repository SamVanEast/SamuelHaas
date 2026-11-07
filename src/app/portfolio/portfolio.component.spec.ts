import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioComponent } from './portfolio.component';
import { height, offsetTop, width } from '../../ts/globalInformation';
import { resetGlobalInformation } from '../../testing/global-information';

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;

  beforeEach(async () => {
    resetGlobalInformation();
    await TestBed.configureTestingModule({
      imports: [PortfolioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => resetGlobalInformation());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the same number of entries for every project field', () => {
    const count = component.imgs.length;
    expect(component.headline.length).toBe(count);
    expect(component.languages.length).toBe(count);
    expect(component.description.length).toBe(count);
    expect(component.links.length).toBe(count);
  });

  it('should render one external link per project', () => {
    const projects = Array.from<HTMLAnchorElement>(fixture.nativeElement.querySelectorAll('a.project'));
    expect(projects.length).toBe(component.imgs.length);
    projects.forEach((project, i) => {
      expect(project.getAttribute('href')).toBe(component.links[i]);
      expect(project.getAttribute('target')).toBe('_blank');
      expect(project.getAttribute('rel')).toBe('noopener noreferrer');
      expect(project.textContent).toContain(component.headline[i]);
    });
  });

  it('should show everything immediately on small screens', () => {
    width[0] = 400;

    component.onLoad();

    expect(component.showHeader).toBe(true);
    expect(component.showContent).toBe(true);
  });

  it('should animate the projects in alternating directions once they are in view on desktop', () => {
    width[0] = 1200;
    offsetTop.portfolio = 200;
    height.portfolio = 400;

    component.onLoad();

    expect(component.showHeader).toBe(true);
    expect(component.showContent).toBe(true);
    const projects = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('a.project'));
    expect(projects[0].classList).toContain('introAnimationFromLeft');
    expect(projects[1].classList).toContain('introAnimationFromRight');
  });
});
