import { ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  @ViewChild('myForm') myForm: ElementRef;
  @ViewChild('nameField') nameField: ElementRef;
  @ViewChild('emailField') emailField: ElementRef;
  @ViewChild('messageField') messageField: ElementRef;
  @ViewChild('sendButton') sendButton: ElementRef;
  animationStart: boolean = false;
  emailHasBeenSent:boolean = false;


  async sendMail() {
    let name = this.nameField.nativeElement
    let email = this.emailField.nativeElement
    let message = this.messageField.nativeElement
    let sendButton = this.sendButton.nativeElement
    let fd = new FormData();
    this.disableForm(name, email, message, sendButton);
    this.formData(fd, name, email, message);
    this.animationStart = true;
    // await this.sendEmail(fd);
    this.showEmailHasBeenSentSrceen();
    this.deleteInputContent(name, email, message);
    this.enableForm(name, email, message, sendButton);
  }

  disableForm(name, email, message, sendButton) {
    name.disabled = true;
    email.disabled = true;
    message.disabled = true;
    sendButton.disabled = true;
  }

  formData(fd, name, email, message) {
    fd.append('name', name.value);
    fd.append('email', email.value);
    fd.append('message', message.value);
  }

  async sendEmail(fd) {
    await fetch('https://samuel-haas.developerakademie.net/send_mail/send_mail.php',
      {
        method: 'POST',
        body: fd
      });
  }

  showEmailHasBeenSentSrceen(){
    this.animationStart = false;
    this.emailHasBeenSent = true;
    setTimeout(() => {
      this.emailHasBeenSent = false;
    }, 2000);
  }

  deleteInputContent(name, email, message) {
    name.value = '';
    email.value = '';
    message.value = '';
  }

  enableForm(name, email, message, sendButton) {
    name.disabled = false;
    email.disabled = false;
    message.disabled = false;
    sendButton.disabled = false;
  }
}
