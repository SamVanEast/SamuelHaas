import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

/** Fake matchMedia whose prefers-color-scheme answer can be changed during a test. */
function mockSystemTheme(dark: boolean) {
  let listener: ((event: MediaQueryListEvent) => void) | undefined;
  const query = {
    matches: dark,
    addEventListener: (_: string, callback: (event: MediaQueryListEvent) => void) => (listener = callback),
    removeEventListener: () => (listener = undefined),
  };
  vi.stubGlobal('matchMedia', (media: string) =>
    media.includes('prefers-color-scheme') ? query : { matches: false, addEventListener() {}, removeEventListener() {} },
  );
  return {
    switchTo(nextDark: boolean) {
      query.matches = nextDark;
      listener?.({ matches: nextDark } as MediaQueryListEvent);
    },
  };
}

describe('ThemeService', () => {
  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('theme-transition');
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('should follow the operating system without storing anything', () => {
    const system = mockSystemTheme(true);
    const service = TestBed.inject(ThemeService);
    TestBed.tick();

    expect(service.theme()).toBe('dark');
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
    expect(localStorage.getItem('theme')).toBeNull();

    system.switchTo(false);
    expect(service.theme()).toBe('light');
  });

  it('should switch on toggle, mark the document and remember the choice', () => {
    mockSystemTheme(false);
    const service = TestBed.inject(ThemeService);

    service.toggle();
    TestBed.tick();

    expect(service.theme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('should keep an explicit choice even when the system setting changes', () => {
    const system = mockSystemTheme(false);
    localStorage.setItem('theme', 'light');
    const service = TestBed.inject(ThemeService);

    system.switchTo(true);

    expect(service.theme()).toBe('light');
  });

  it('should cross-fade the colours briefly while switching', () => {
    vi.useFakeTimers();
    mockSystemTheme(false);
    const service = TestBed.inject(ThemeService);

    service.toggle();
    expect(document.documentElement.classList).toContain('theme-transition');

    vi.advanceTimersByTime(400);
    expect(document.documentElement.classList).not.toContain('theme-transition');
  });

  it('should work in browsers without matchMedia', () => {
    vi.stubGlobal('matchMedia', undefined);
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe('light');
    service.toggle();
    expect(service.theme()).toBe('dark');
  });
});
