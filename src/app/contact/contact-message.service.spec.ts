import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { ContactMessage, ContactMessageService, WEB3FORMS_ACCESS_KEY, WEB3FORMS_URL } from './contact-message.service';

describe('ContactMessageService', () => {
  const message: ContactMessage = { name: 'Erika Muster', email: 'erika@example.com', message: 'Hallo', botcheck: false };

  function setup(accessKey: string) {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), { provide: WEB3FORMS_ACCESS_KEY, useValue: accessKey }],
    });
    return { service: TestBed.inject(ContactMessageService), http: TestBed.inject(HttpTestingController) };
  }

  afterEach(() => TestBed.inject(HttpTestingController).verify());

  it('should post the message with access key, subject and language to Web3Forms', async () => {
    const { service, http } = setup('test-key');
    const sent = firstValueFrom(service.send(message, 'en'));

    const request = http.expectOne(WEB3FORMS_URL);
    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('Accept')).toBe('application/json');
    expect(request.request.body).toEqual({
      access_key: 'test-key',
      subject: 'Neue Anfrage über samuel-haas.com von Erika Muster',
      name: 'Erika Muster',
      email: 'erika@example.com',
      message: 'Hallo',
      language: 'Englisch',
      botcheck: false,
    });
    request.flush({ success: true, message: 'Email sent successfully!' });
    await expect(sent).resolves.toBeUndefined();
  });

  it('should fail when Web3Forms does not accept the message', async () => {
    const { service, http } = setup('test-key');
    const sent = firstValueFrom(service.send(message, 'de'));
    http.expectOne(WEB3FORMS_URL).flush({ success: false, message: 'Spam detected' });
    await expect(sent).rejects.toThrow('Spam detected');
  });

  it('should fail on network or server errors', async () => {
    const { service, http } = setup('test-key');
    const sent = firstValueFrom(service.send(message, 'de'));
    http.expectOne(WEB3FORMS_URL).flush({ statusCode: 500 }, { status: 500, statusText: 'Server Error' });
    await expect(sent).rejects.toBeTruthy();
  });

  it('should not send anything without an access key', async () => {
    const { service, http } = setup('');
    await expect(firstValueFrom(service.send(message, 'de'))).rejects.toThrow(/access key/);
    http.expectNone(WEB3FORMS_URL);
  });
});
