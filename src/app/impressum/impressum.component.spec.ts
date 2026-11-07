import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImpressumComponent } from './impressum.component';

describe('ImpressumComponent', () => {
  let fixture: ComponentFixture<ImpressumComponent>;
  let text: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpressumComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImpressumComponent);
    fixture.detectChanges();
    text = fixture.nativeElement.textContent;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should cite the current legal basis § 5 DDG instead of the repealed TMG', () => {
    expect(fixture.nativeElement.querySelector('h1').textContent).toBe('Impressum');
    expect(text).toContain('§ 5 DDG');
    expect(text).not.toContain('TMG');
  });

  it('should contain name, address and VAT ID', () => {
    expect(text).toContain('Samuel Haas');
    expect(text).toContain('Owinger Str. 8');
    expect(text).toContain('72336 Balingen');
    expect(text).toContain('DE365950601');
  });

  it('should only list the mobile number and the e-mail address as contact', () => {
    const phone: HTMLAnchorElement = fixture.nativeElement.querySelector('a[href^="tel:"]');
    const mail: HTMLAnchorElement = fixture.nativeElement.querySelector('a[href^="mailto:"]');
    expect(phone.getAttribute('href')).toBe('tel:+4915756775354');
    expect(mail.getAttribute('href')).toBe('mailto:info@samuel-haas.com');
    expect(mail.textContent).toBe('info@samuel-haas.com');
    expect(text).not.toContain('07433');
    expect(text).not.toMatch(/Telefax/i);
  });

  it('should not contain company-only details that do not apply to a freelancer', () => {
    expect(text).not.toMatch(/Handelsregister|Registergericht|Vertreten durch|GmbH|UG/);
  });

  it('should not link to the discontinued EU online dispute resolution platform', () => {
    expect(fixture.nativeElement.querySelector('a[href*="ec.europa.eu/consumers/odr"]')).toBeNull();
  });

  it('should not contain leftover template placeholders', () => {
    expect(text).not.toMatch(/\[[^\]]+\]/);
  });
});
