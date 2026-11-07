import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HomepageComponent } from './homepage/homepage.component';
import { LegalLayoutComponent } from './legal-layout/legal-layout.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('router-outlet')).not.toBeNull();
  });

  it('should show the homepage on the root route', async () => {
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl('/', HomepageComponent);
    expect(component).toBeInstanceOf(HomepageComponent);
    expect(TestBed.inject(Title).getTitle()).toBe('Samuel Haas');
  });

  it('should show the imprint inside the legal layout on /impressum', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/impressum', LegalLayoutComponent);
    expect(harness.routeNativeElement.querySelector('main app-impressum')).not.toBeNull();
    expect(TestBed.inject(Title).getTitle()).toBe('Impressum – Samuel Haas');
  });

  it('should show a not-found page for unknown URLs', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/gibt-es-nicht', LegalLayoutComponent);
    expect(harness.routeNativeElement.querySelector('main app-not-found')).not.toBeNull();
    expect(TestBed.inject(Title).getTitle()).toBe('Seite nicht gefunden – Samuel Haas');
  });

  it('should show the privacy policy inside the legal layout on /datenschutz', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/datenschutz', LegalLayoutComponent);
    expect(harness.routeNativeElement.querySelector('main app-datenschutz')).not.toBeNull();
    expect(TestBed.inject(Title).getTitle()).toBe('Datenschutzerklärung – Samuel Haas');
  });
});
