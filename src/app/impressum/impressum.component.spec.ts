import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ImpressumComponent } from './impressum.component';

describe('ImpressumComponent', () => {
  let component: ImpressumComponent;
  let fixture: ComponentFixture<ImpressumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpressumComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ImpressumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the imprint with header and footer', () => {
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Impressum');
    expect(fixture.nativeElement.querySelector('app-header')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('app-footer')).not.toBeNull();
  });

  it('should ignore a click that arrives before the header is rendered', () => {
    const freshFixture = TestBed.createComponent(ImpressumComponent);
    expect(() => freshFixture.componentInstance.onClick()).not.toThrow();
    expect(freshFixture.componentInstance.showMenu).toBe(false);
  });

  it('should open and close the mobile menu', async () => {
    fixture.nativeElement.querySelector('.open_menu img').click();
    fixture.detectChanges();
    await new Promise(resolve => setTimeout(resolve));
    expect(fixture.nativeElement.querySelector('app-menu-mobile')).not.toBeNull();

    fixture.nativeElement.querySelector('app-menu-mobile').click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-menu-mobile')).toBeNull();
    expect(component.showMenu).toBe(false);
  });
});
