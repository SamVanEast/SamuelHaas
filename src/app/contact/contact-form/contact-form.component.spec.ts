import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Subject, of, throwError } from 'rxjs';
import { ContactFormComponent } from './contact-form.component';
import { ContactMessageService } from '../contact-message.service';
import { DE } from '../../i18n/de';
import { useLanguage } from '../../../testing/language';

describe('ContactFormComponent', () => {
  let fixture: ComponentFixture<ContactFormComponent>;
  let send: ReturnType<typeof vi.fn>;
  const texts = DE.contact.form;

  beforeEach(async () => {
    send = vi.fn(() => of(undefined));
    await TestBed.configureTestingModule({
      imports: [ContactFormComponent],
      providers: [provideRouter([]), { provide: ContactMessageService, useValue: { send } }],
    }).compileComponents();
    useLanguage('de');
    fixture = TestBed.createComponent(ContactFormComponent);
    await fixture.whenStable();
  });

  function element<T extends HTMLElement>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }

  function type(selector: string, value: string): void {
    const field = element<HTMLInputElement | HTMLTextAreaElement>(selector);
    field.value = value;
    field.dispatchEvent(new Event('input'));
    field.dispatchEvent(new Event('blur'));
  }

  function fillIn(): void {
    type('#contact-name', '  Erika Muster ');
    type('#contact-email', 'erika@example.com');
    type('#contact-message', 'Ich habe ein Projekt für Sie.');
  }

  async function submit(): Promise<void> {
    element<HTMLFormElement>('form').dispatchEvent(new Event('submit'));
    await fixture.whenStable();
  }

  it('should label every field', () => {
    for (const [id, label] of [['contact-name', texts.name], ['contact-email', texts.email], ['contact-message', texts.message]]) {
      expect(element(`label[for="${id}"]`).textContent).toBe(label);
      expect(element(`#${id}`)).not.toBeNull();
    }
    expect(element('#contact-email').getAttribute('type')).toBe('email');
    expect(element('#contact-email').getAttribute('autocomplete')).toBe('email');
  });

  it('should not send an empty form, show all errors and focus the first field', async () => {
    await submit();
    expect(send).not.toHaveBeenCalled();
    expect(element('#contact-name-error').textContent).toBe(texts.errors.name);
    expect(element('#contact-email-error').textContent).toBe(texts.errors.email);
    expect(element('#contact-message-error').textContent).toBe(texts.errors.message);
    expect(element('#contact-name').getAttribute('aria-invalid')).toBe('true');
    expect(element('#contact-name').getAttribute('aria-describedby')).toBe('contact-name-error');
    expect(document.activeElement).toBe(element('#contact-name'));
  });

  it('should reject e-mail addresses without a domain and fields with only spaces', async () => {
    fillIn();
    type('#contact-email', 'erika@example');
    type('#contact-message', '   ');
    await fixture.whenStable();
    expect(element('#contact-email-error')).not.toBeNull();
    expect(element('#contact-message-error')).not.toBeNull();
    expect(element('#contact-name-error')).toBeNull();
  });

  it('should send the trimmed message in the current language and confirm it', async () => {
    fillIn();
    await submit();
    expect(send).toHaveBeenCalledWith(
      { name: 'Erika Muster', email: 'erika@example.com', message: 'Ich habe ein Projekt für Sie.', botcheck: false },
      'de',
    );
    const success = element('.contact_success');
    expect(success.getAttribute('role')).toBe('status');
    expect(success.textContent).toContain(texts.success);
    expect(element('form')).toBeNull();
    expect(document.activeElement).toBe(success);
  });

  it('should show an empty form again for another message', async () => {
    fillIn();
    await submit();
    element<HTMLButtonElement>('.contact_success button').click();
    await fixture.whenStable();
    expect(element<HTMLInputElement>('#contact-name').value).toBe('');
    expect(element('#contact-name-error')).toBeNull();
    expect(document.activeElement).toBe(element('#contact-name'));
  });

  it('should block the button while sending', async () => {
    const pending = new Subject<void>();
    send.mockReturnValue(pending);
    fillIn();
    await submit();
    const button = element<HTMLButtonElement>('button[type="submit"]');
    expect(button.disabled).toBe(true);
    expect(button.textContent.trim()).toBe(texts.sending);
    expect(element('form').getAttribute('aria-busy')).toBe('true');
    pending.next();
    pending.complete();
    // let submit() continue after the awaited answer
    await new Promise(resolve => setTimeout(resolve));
    await fixture.whenStable();
    expect(element('.contact_success')).not.toBeNull();
  });

  it('should keep the input and offer the e-mail address when sending fails', async () => {
    send.mockReturnValue(throwError(() => new Error('offline')));
    fillIn();
    await submit();
    const failure = element('.form_failure');
    expect(failure.getAttribute('role')).toBe('alert');
    expect(failure.textContent).toContain(texts.failure);
    expect(failure.querySelector('a[href="mailto:info@samuel-haas.com"]')).not.toBeNull();
    expect(element<HTMLInputElement>('#contact-name').value).toBe('  Erika Muster ');
    expect(element<HTMLButtonElement>('button[type="submit"]').disabled).toBe(false);
  });

  it('should hide the spam trap from people and pass it on', async () => {
    const trap = element<HTMLInputElement>('#contact-botcheck');
    expect(trap.closest('[aria-hidden="true"]')).not.toBeNull();
    expect(trap.getAttribute('tabindex')).toBe('-1');
    fillIn();
    trap.click();
    await submit();
    expect(send.mock.calls[0][0].botcheck).toBe(true);
  });

  it('should link to the privacy policy', () => {
    const link = element<HTMLAnchorElement>('.privacy_note a');
    expect(link.getAttribute('href')).toBe('/datenschutz');
    expect(link.textContent).toBe(texts.privacyLink);
  });
});
