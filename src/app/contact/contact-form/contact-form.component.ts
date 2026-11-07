import { Component, ElementRef, Injector, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LanguageService } from '../../i18n/language.service';
import { ContactMessageService } from '../contact-message.service';

type Status = 'idle' | 'sending' | 'sent' | 'failed';
type Field = 'name' | 'email' | 'message';
const FIELDS: Field[] = ['name', 'email', 'message'];

/** rejects fields that only contain spaces */
function filled(control: AbstractControl<string>): ValidationErrors | null {
  return control.value.trim() ? null : { required: true };
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  imports: [ReactiveFormsModule, RouterLink],
})
export class ContactFormComponent {
  protected readonly i18n = inject(LanguageService);
  private readonly messages = inject(ContactMessageService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  private readonly successMessage = viewChild<ElementRef<HTMLElement>>('successMessage');

  protected readonly status = signal<Status>('idle');
  /** errors are shown once a field was left or the form was submitted */
  protected readonly submitted = signal(false);

  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [filled, Validators.maxLength(200)]],
    email: ['', [filled, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), Validators.maxLength(200)]],
    message: ['', [filled, Validators.maxLength(5000)]],
    botcheck: [false],
  });

  protected showError(field: Field): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || this.submitted());
  }

  /**
   * checks the input and sends the message; on errors the focus moves to the first invalid field
   */
  async submit(): Promise<void> {
    if (this.status() === 'sending') {
      return;
    }
    this.submitted.set(true);
    const firstInvalid = FIELDS.find(field => this.form.controls[field].invalid);
    if (firstInvalid) {
      this.focusField(firstInvalid);
      return;
    }
    const { name, email, message, botcheck } = this.form.getRawValue();
    this.status.set('sending');
    this.form.disable();
    try {
      await firstValueFrom(
        this.messages.send({ name: name.trim(), email: email.trim(), message: message.trim(), botcheck }, this.i18n.language()),
      );
      this.form.reset();
      this.submitted.set(false);
      this.status.set('sent');
      // the confirmation replaces the form, so screen readers and keyboard users continue there
      afterNextRender(() => this.successMessage()?.nativeElement.focus(), { injector: this.injector });
    } catch {
      this.status.set('failed');
    } finally {
      this.form.enable();
    }
  }

  /**
   * shows the empty form again after a message was sent
   */
  writeAnother(): void {
    this.status.set('idle');
    this.focusField('name');
  }

  private focusField(field: Field): void {
    afterNextRender(() => this.host.nativeElement.querySelector<HTMLElement>(`#contact-${field}`)?.focus(), {
      injector: this.injector,
    });
  }

  /**
   * the privacy policy opens at the top; instant, because a smooth scroll is cancelled when the router swaps the page
   */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}
