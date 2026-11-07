import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toggle.component';
import { ThemeService } from './theme.service';
import { useLanguage } from '../../testing/language';

describe('ThemeToggleComponent', () => {
  let fixture: ComponentFixture<ThemeToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ThemeToggleComponent] }).compileComponents();
    useLanguage('de');
    fixture = TestBed.createComponent(ThemeToggleComponent);
    await fixture.whenStable();
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  function button(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('button');
  }

  it('should be a labelled toggle button that shows a moon in light mode', () => {
    expect(button().type).toBe('button');
    expect(button().getAttribute('aria-label')).toBe('Dunkles Design');
    expect(button().getAttribute('aria-pressed')).toBe('false');
    expect(fixture.nativeElement.querySelector('.icon_moon')).not.toBeNull();
  });

  it('should switch to dark mode and show a sun', async () => {
    button().click();
    await fixture.whenStable();

    expect(TestBed.inject(ThemeService).theme()).toBe('dark');
    expect(button().getAttribute('aria-pressed')).toBe('true');
    expect(fixture.nativeElement.querySelector('.icon_sun')).not.toBeNull();
  });

  it('should translate its label', async () => {
    useLanguage('en');
    await fixture.whenStable();
    expect(button().getAttribute('aria-label')).toBe('Dark mode');
  });
});
