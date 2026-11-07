import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSwitchComponent } from './language-switch.component';
import { LanguageService } from '../i18n/language.service';
import { useLanguage } from '../../testing/language';

describe('LanguageSwitchComponent', () => {
  let fixture: ComponentFixture<LanguageSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [LanguageSwitchComponent] }).compileComponents();
    useLanguage('de');
    fixture = TestBed.createComponent(LanguageSwitchComponent);
    await fixture.whenStable();
  });

  afterEach(() => localStorage.clear());

  function buttons(): HTMLButtonElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('button'));
  }

  it('should offer German and English as real toggle buttons', () => {
    expect(buttons().map(b => [b.textContent.trim(), b.getAttribute('aria-label'), b.getAttribute('lang')])).toEqual([
      ['DE', 'Deutsch', 'de'],
      ['EN', 'English', 'en'],
    ]);
    expect(buttons().every(b => b.type === 'button')).toBe(true);
    expect(fixture.nativeElement.querySelector('[role="group"]').getAttribute('aria-label')).toBe('Sprache');
  });

  it('should mark the current language as pressed', () => {
    expect(buttons().map(b => b.getAttribute('aria-pressed'))).toEqual(['true', 'false']);
  });

  it('should switch the language on click', async () => {
    buttons()[1].click();
    await fixture.whenStable();

    expect(TestBed.inject(LanguageService).language()).toBe('en');
    expect(buttons().map(b => b.getAttribute('aria-pressed'))).toEqual(['false', 'true']);
    expect(fixture.nativeElement.querySelector('[role="group"]').getAttribute('aria-label')).toBe('Language');
  });
});
