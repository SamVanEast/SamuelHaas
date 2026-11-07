import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LegalLayoutComponent } from './legal-layout.component';

describe('LegalLayoutComponent', () => {
  let component: LegalLayoutComponent;
  let fixture: ComponentFixture<LegalLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalLayoutComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LegalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should frame the page content with header and footer', () => {
    expect(fixture.nativeElement.querySelector('app-header')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('main router-outlet')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('app-footer')).not.toBeNull();
  });

  it('should ignore a click that arrives before the header is rendered', () => {
    const freshFixture = TestBed.createComponent(LegalLayoutComponent);
    expect(() => freshFixture.componentInstance.onClick()).not.toThrow();
    expect(freshFixture.componentInstance.showMenu).toBe(false);
  });

  it('should open and close the mobile menu', async () => {
    fixture.nativeElement.querySelector('.open_menu img').click();
    fixture.detectChanges();
    await new Promise(resolve => setTimeout(resolve));
    expect(fixture.nativeElement.querySelector('app-menu-mobile')).not.toBeNull();
    expect(document.body.style.overflow).toBe('hidden');

    fixture.nativeElement.querySelector('app-menu-mobile').click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-menu-mobile')).toBeNull();
    expect(component.showMenu).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });
});
