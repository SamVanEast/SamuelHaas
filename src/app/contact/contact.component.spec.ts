import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ContactComponent] }).compileComponents();
    fixture = TestBed.createComponent(ContactComponent);
    await fixture.whenStable();
  });

  it('should show the contact details', () => {
    const text: string = fixture.nativeElement.querySelector('address').textContent;
    expect(text).toContain('Samuel Haas');
    expect(text).toContain('info@samuel-haas.com');
  });

  it('should make e-mail address and phone number clickable', () => {
    expect(fixture.nativeElement.querySelector('a[href="mailto:info@samuel-haas.com"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('a[href="tel:+4915756775354"]').textContent).toBe('+49 1575 677 53 54');
  });
});
