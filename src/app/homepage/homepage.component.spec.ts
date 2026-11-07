import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { SectionNavigationService } from '../core/section-navigation.service';

describe('HomepageComponent', () => {
  let fixture: ComponentFixture<HomepageComponent>;
  let nav: SectionNavigationService;
  let observeSections: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    nav = TestBed.inject(SectionNavigationService);
    observeSections = vi.spyOn(nav, 'observeSections');
    fixture = TestBed.createComponent(HomepageComponent);
    await fixture.whenStable();
  });

  it('should render header, all sections with their anchor ids and the footer', () => {
    expect(fixture.nativeElement.querySelector('app-header')).not.toBeNull();
    const ids = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('main > .section')).map(s => s.id);
    expect(ids).toEqual(['welcome', 'about-me', 'portfolio', 'contact']);
    expect(fixture.nativeElement.querySelector('app-footer')).not.toBeNull();
  });

  it('should have exactly one main heading', () => {
    expect(fixture.nativeElement.querySelectorAll('h1').length).toBe(1);
  });

  it('should let the navigation track the sections and stop when the page is left', () => {
    const observed = observeSections.mock.calls[0][0] as HTMLElement[];
    expect(observed.map(section => section.id)).toEqual(['welcome', 'about-me', 'portfolio', 'contact']);

    const disconnect = vi.spyOn(nav, 'disconnect');
    fixture.destroy();
    expect(disconnect).toHaveBeenCalled();
  });
});
