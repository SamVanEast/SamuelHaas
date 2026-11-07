import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HomepageComponent } from './homepage/homepage.component';
import { ImpressumComponent } from './impressum/impressum.component';

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
  });

  it('should show the imprint on /impressum', async () => {
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl('/impressum', ImpressumComponent);
    expect(component).toBeInstanceOf(ImpressumComponent);
  });
});
