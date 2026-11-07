import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { TitleStrategy, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HomepageComponent } from './homepage/homepage.component';
import { LegalLayoutComponent } from './legal-layout/legal-layout.component';
import { TranslatedTitleStrategy } from './i18n/translated-title.strategy';
import { useLanguage } from '../testing/language';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes), { provide: TitleStrategy, useClass: TranslatedTitleStrategy }],
    }).compileComponents();
    useLanguage('de');
  });

  afterEach(() => localStorage.clear());

  function title(): string {
    return TestBed.inject(Title).getTitle();
  }

  it('should render a router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('router-outlet')).not.toBeNull();
  });

  it('should let keyboard users skip the navigation and jump to the main content', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    document.body.appendChild(fixture.nativeElement);
    const main = document.body.appendChild(document.createElement('main'));
    await fixture.whenStable();

    const skipLink: HTMLAnchorElement = fixture.nativeElement.querySelector('.skip_link');
    expect(skipLink.textContent).toBe('Zum Inhalt springen');
    skipLink.click();

    expect(document.activeElement).toBe(main);
    main.remove();
    fixture.nativeElement.remove();
  });

  it('should show the homepage on the root route', async () => {
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl('/', HomepageComponent);
    expect(component).toBeInstanceOf(HomepageComponent);
    expect(title()).toBe('Samuel Haas');
  });

  it('should show the imprint inside the legal layout on /impressum', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/impressum', LegalLayoutComponent);
    expect(harness.routeNativeElement.querySelector('main app-impressum')).not.toBeNull();
    expect(title()).toBe('Impressum – Samuel Haas');
  });

  it('should show the privacy policy inside the legal layout on /datenschutz', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/datenschutz', LegalLayoutComponent);
    expect(harness.routeNativeElement.querySelector('main app-datenschutz')).not.toBeNull();
    expect(title()).toBe('Datenschutzerklärung – Samuel Haas');
  });

  it('should show a not-found page for unknown URLs', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/gibt-es-nicht', LegalLayoutComponent);
    expect(harness.routeNativeElement.querySelector('main app-not-found')).not.toBeNull();
    expect(title()).toBe('Seite nicht gefunden – Samuel Haas');
  });

  it('should translate the tab title as soon as the language changes', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/datenschutz', LegalLayoutComponent);

    useLanguage('en');
    TestBed.tick();

    expect(title()).toBe('Privacy policy – Samuel Haas');
  });
});
