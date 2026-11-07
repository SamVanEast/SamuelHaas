import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken, inject } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { Language } from '../i18n/translations';

/** Endpoint of Web3Forms, which forwards the messages to info@samuel-haas.com (free plan: 250 messages a month). */
export const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

/**
 * Access key of the Web3Forms form. Web3Forms designs it as a public key that only stands for the target address,
 * so it may be part of the frontend code. A new key is created on web3forms.com with the target e-mail address.
 * As long as it is empty, the form shows its error message with the e-mail address instead of sending.
 */
const ACCESS_KEY = '';

export const WEB3FORMS_ACCESS_KEY = new InjectionToken<string>('WEB3FORMS_ACCESS_KEY', {
  providedIn: 'root',
  factory: () => ACCESS_KEY,
});

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  /** hidden honeypot field: only bots tick it, Web3Forms then rejects the message */
  botcheck: boolean;
}

interface Web3FormsResponse {
  success: boolean;
  message?: string;
}

/**
 * Sends the messages of the contact form via Web3Forms.
 */
@Injectable({ providedIn: 'root' })
export class ContactMessageService {
  private readonly http = inject(HttpClient);
  private readonly accessKey = inject(WEB3FORMS_ACCESS_KEY);

  /**
   * sends the message; the observable fails when it could not be delivered
   * @param language language of the visitor, so the answer can be written in it
   */
  send(message: ContactMessage, language: Language): Observable<void> {
    if (!this.accessKey) {
      return throwError(() => new Error('The Web3Forms access key is missing.'));
    }
    const body = {
      access_key: this.accessKey,
      subject: `Neue Anfrage über samuel-haas.com von ${message.name}`,
      name: message.name,
      email: message.email,
      message: message.message,
      language: language === 'de' ? 'Deutsch' : 'Englisch',
      botcheck: message.botcheck,
    };
    return this.http
      .post<Web3FormsResponse>(WEB3FORMS_URL, body, { headers: { Accept: 'application/json' } })
      .pipe(
        map(response => {
          if (!response.success) {
            throw new Error(response.message ?? 'Web3Forms did not accept the message.');
          }
        }),
      );
  }
}
