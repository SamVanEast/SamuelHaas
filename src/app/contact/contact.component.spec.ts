import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    fixture = TestBed.createComponent(ContactComponent);
    await fixture.whenStable();
  });

  it('should show the contact details', () => {
    const text: string = fixture.nativeElement.querySelector('address').textContent;
    expect(text).toContain('Samuel Haas');
    expect(text).toContain('info@samuel-haas.com');
  });

  it('should make e-mail address and phone number clickable', () => {
    expect(fixture.nativeElement.querySelector('address a[href="mailto:info@samuel-haas.com"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('a[href="tel:+4915756775354"]').textContent).toBe('+49 1575 677 53 54');
  });

  it('should offer the contact form next to the text', () => {
    expect(fixture.nativeElement.querySelector('app-contact-form form')).not.toBeNull();
  });
});
