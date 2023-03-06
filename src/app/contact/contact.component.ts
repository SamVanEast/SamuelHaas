import { ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { HostListener } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { height, offsetTop, width } from './../../ts/gobalInformation';

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
  emailHasBeenSent: boolean = false;
  public showContent: boolean = false;

  constructor(private elementRef: ElementRef) { }
  @HostListener('window:scroll', ['$event'])
  @HostListener('window:load', ['$event'])

  /**
   * wenn der Inhalt geladen ist , führt er eine Funktion aus
   */
  onLoad() {
    this.onWindowScroll(event);
  }

  /**
   * start the animation when the user scrolls to the component and is not in responsive mode
   * @param event 
   */
  onWindowScroll(event) {
    if (width[0] > 770) {
      let scrollPositionTop = window.pageYOffset;
      let scrollPoitionBottom = scrollPositionTop + window.innerHeight;
      if (offsetTop.contact + (height.contact / 3) < scrollPoitionBottom && offsetTop.contact > 100) {
        this.showContent = true;
        this.myForm.nativeElement.classList.add('introAnimationFromLeft')
      };
    } else {
      this.showContent = true;
    }
  };

  /**
   * starts sending the email
   */
  async sendMail() {
    let name = this.nameField.nativeElement
    let email = this.emailField.nativeElement
    let message = this.messageField.nativeElement
    let sendButton = this.sendButton.nativeElement
    let fd = new FormData();
    this.disableForm(name, email, message, sendButton);
    this.formData(fd, name, email, message);
    this.animationStart = true;
    await this.sendEmail(fd);
    this.showEmailHasBeenSentSrceen();
    this.deleteInputContent(name, email, message);
    this.enableForm(name, email, message, sendButton);
  }

  /**
   * disables the input fields and buttons
   * @param name name input field
   * @param email email input field
   * @param message textarea field
   * @param sendButton sending button
   */
  disableForm(name, email, message, sendButton) {
    name.disabled = true;
    email.disabled = true;
    message.disabled = true;
    sendButton.disabled = true;
  }

  /**
   * gathers all the information for sending the email
   * @param fd formData
   * @param name name input field
   * @param email email input field
   * @param message textarea field
   */
  formData(fd, name, email, message) {
    let joinTogether = [name.value, email.value, message.value]
    fd.append('name', name.value);
    fd.append('email', email.value);
    fd.append('message', joinTogether);
  }

  /**
   * sends the e-mail
   * @param fd formData
   */
  async sendEmail(fd) {
    await fetch('https://samuel-haas.developerakademie.net/send_mail/send_mail.php',
      {
        method: 'POST',
        body: fd
      });
  }

  /**
   * displays a message to confirm successful sending
   */
  showEmailHasBeenSentSrceen() {
    this.animationStart = false;
    this.emailHasBeenSent = true;
    setTimeout(() => {
      this.emailHasBeenSent = false;
    }, 2000);
  }


  /**
   * delete content form Input fields
   * @param name name input field
   * @param email email input field
   * @param message textarea field
   */
  deleteInputContent(name, email, message) {
    name.value = '';
    email.value = '';
    message.value = '';
  }

  /**
   * enable the input fields and buttons
   * @param name name input field
   * @param email email input field
   * @param message textarea field
   */
  enableForm(name, email, message, sendButton) {
    name.disabled = false;
    email.disabled = false;
    message.disabled = false;
    sendButton.disabled = false;
  }
}

